var expect = require('chai').expect;
var assert = require('chai').assert;
var CourseJS = require('../../course.js');

// TimeSet Tests
describe('TimeSet', function() {

    // constructor test
    describe('#TimeSet()', function() {
        it('should create an empty timeSet if no parameters are given', function() {
            assert.deepEqual(new CourseJS.TimeSet(), {days:{Sun:[], Mon:[], Tue:[], Wed:[], Thu:[], Fri:[], Sat:[]}});
        });

        it('should create an empty timeSet if the times given are undefined (TBA)', function() {
            assert.deepEqual(new CourseJS.TimeSet([undefined, undefined]), {days:{Sun:[], Mon:[], Tue:[], Wed:[], Thu:[], Fri:[], Sat:[]}});
        });

        it('should create a timeSet if valid times are given', function() {
            var time1 = new CourseJS.Time({day:'Mon', time:800}, {day:'Mon', time:850});
            var time2 = new CourseJS.Time({day:'Wed', time:800}, {day:'Wed', time:850});
            var time3 = new CourseJS.Time({day:'Fri', time:800}, {day:'Fri', time:850});
            assert.deepEqual(new CourseJS.TimeSet([time1, time2, time3]), {days:{Sun:[], Mon:[time1], Tue:[], Wed:[time2], Thu:[], Fri:[time3], Sat:[]}});
        });

        it('should only allow nonoverlapping times in the TimeSet', function() {
            var time1 = new CourseJS.Time({day:'Mon', time:800}, {day:'Mon', time:900});
            var time2 = new CourseJS.Time({day:'Mon', time:830}, {day:'Mon', time:930});
            expect(function() {new CourseJS.TimeSet([time1, time2]);}).to.throw(Error);
        });

        it('should put a time into the day of its start if it spans over multiple days', function() {
            var time1 = new CourseJS.Time({day:'Mon', time:1800}, {day:'Tue', time:200});
            assert.deepEqual(new CourseJS.TimeSet([time1]), {days:{Sun:[], Mon:[new CourseJS.Time({day:'Mon', time:1800}, {day:'Mon', time:2359})],
                    Tue:[new CourseJS.Time({day:'Tue', time:0}, {day:'Tue', time:200})], Wed:[], Thu:[], Fri:[], Sat:[]}});
        });

        it('should throw an error if the objects given are not times', function() {
            expect(function() {new CourseJS.TimeSet([{flavor:'chocolate', quantity: 2}, {flavor:'vanilla', quantity:900}]);}).to.throw(Error);
        });
    });

    // insert test
    describe('#insert()', function() {
        it('should insert times into a timeSet and return true', function() {
            var timeSet = new CourseJS.TimeSet();
            var time1 = new CourseJS.Time({day:'Mon', time:800}, {day:'Mon', time:900});
            expect(timeSet.insert(time1)).to.equal(true);
            assert.deepEqual(timeSet, {days: {Sun:[], Mon:[time1], Tue:[], Wed:[], Thu:[], Fri:[], Sat:[]}});
        });

        it('should split and insert times with multiple days into a timeSet and return true', function() {
            var timeSet = new CourseJS.TimeSet();
            var time1 = new CourseJS.Time({day:'Mon', time:800}, {day:'Tue', time:900});
            expect(timeSet.insert(time1)).to.equal(true);
            assert.deepEqual(timeSet, {days: {Sun:[], Mon:[new CourseJS.Time({day:'Mon', time:800}, {day:'Mon', time:2359})],
                    Tue:[new CourseJS.Time({day:'Tue', time:0}, {day:'Tue', time:900})], Wed:[], Thu:[], Fri:[], Sat:[]}});
        });

        it('should add a time to a timeSet, but return false if the same time or an overlapping time is added later', function() {
            var timeSet = new CourseJS.TimeSet();
            var time1 = new CourseJS.Time({day:'Mon', time:800}, {day:'Mon', time:900});
            var time2 = new CourseJS.Time({day:'Mon', time:830}, {day:'Mon', time:930});
            expect(timeSet.insert(time1)).to.equal(true);
            expect(timeSet.insert(time1)).to.equal(false);
            expect(timeSet.insert(time2)).to.equal(false);
            assert.deepEqual(timeSet, {days: {Sun:[], Mon:[time1], Tue:[], Wed:[], Thu:[], Fri:[], Sat:[]}});
        });

        it('should not throw an error if a TBA time object is given, and should return true', function() {
            var timeSet = new CourseJS.TimeSet();
            var time1 = CourseJS.Time.TBA;
            expect(function() {timeSet.insert(time1);}).to.not.throw(Error).and.to.equal(true);
            assert.deepEqual(timeSet, new CourseJS.TimeSet());
        });

        it('should throw an error if the parameter given is not a Time object', function() {
            var timeSet = new CourseJS.TimeSet();
            var time1 = {mood:"happy", face:"smile"};
            expect(function() {timeSet.insert(time1);}).to.throw(Error);
        });
    });

    // getTimes test
    describe('#getTimes()', function() {
        var time1 = new CourseJS.Time({day:'Mon', time:800}, {day:'Mon', time:900});
        var time2 = new CourseJS.Time({day:'Wed', time:800}, {day:'Wed', time:900});
        var time3 = new CourseJS.Time({day:'Fri', time:800}, {day:'Fri', time:900});
        var times = [time1, time2, time3];
        var otherTimes = [time1, time3];

        it('should get all times from the TimeSet', function() {
            var timeSet = new CourseJS.TimeSet(times);
            assert.deepEqual(timeSet.getTimes(), times);
        });

        it('should get all times from the TimeSet that do not overlap with the parameter timeSet', function() {
            var timeSet1 = new CourseJS.TimeSet(times);
            var timeSet2 = new CourseJS.TimeSet(otherTimes);
            assert.deepEqual(timeSet1.getTimes(timeSet2), [time2]);
        });
    });

    // getTimesByDay test
    describe('#getTimesByDay()', function() {
        var time1 = new CourseJS.Time({day:'Mon', time:800}, {day:'Mon', time:900});
        var time2 = new CourseJS.Time({day:'Wed', time:800}, {day:'Wed', time:900});
        var time3 = new CourseJS.Time({day:'Fri', time:800}, {day:'Fri', time:900});
        var times = [time1, time2, time3];
        var timeSet = new CourseJS.TimeSet(times);
        var otherTimes = [time1, time3];
        var otherTimeSet = new CourseJS.TimeSet(otherTimes);


        it('should get all times from the TimeSet that do not overlap with the restriction TimeSet', function() {
            assert.deepEqual(timeSet.getTimesByDay('Mon'), [time1]);
        });

        it('should get all times from the TimeSet on a given day that do not overlap with the restriction TimeSet', function() {
            assert.deepEqual(timeSet.getTimesByDay('Mon', otherTimeSet), []);
        });
    });
});
