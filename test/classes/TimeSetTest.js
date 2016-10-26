var expect = require('chai').expect;
var assert = require('chai').assert;
var CourseJS = require('../../course.js');

// TimeSet Tests
describe('TimeSet', function() {

    // constructor test
    describe('#TimeSet()', function() {
        it('should return an empty timeSet if no parameters are given', function() {
            assert.deepEqual(new CourseJS.TimeSet(), {days:{Sun:[], Mon:[time1], Tue:[], Wed:[time2], Thu:[], Fri:[time3], Sat:[]}});
        });

        it('should return an empty timeSet if the times given are undefined (TBA)', function() {
            assert.deepEqual(new CourseJS.TimeSet([undefined]), {days:{Sun:[], Mon:[time1], Tue:[], Wed:[time2], Thu:[], Fri:[time3], Sat:[]}});
        });

        it('should return normal timeSet if normal times are given', function() {
            var time1 = new CourseJS.Time({day:'Mon', time:800}, {day:'Mon', time:850});
            var time2 = new CourseJS.Time({day:'Wed', time:800}, {day:'Wed', time:850});
            var time3 = new CourseJS.Time({day:'Fri', time:800}, {day:'Fri', time:850});
            assert.deepEqual(new CourseJS.TimeSet([time1, time2, time3]), {days:{Sun:[], Mon:[time1], Tue:[], Wed:[time2], Thu:[], Fri:[time3], Sat:[]}});
        });

        it('should return normal timeSet if normal times are given', function() {
            var time1 = new CourseJS.Time({day:'Mon', time:800}, {day:'Mon', time:900});
            var time2 = new CourseJS.Time({day:'Mon', time:830}, {day:'Mon', time:930});
            assert.deepEqual(new CourseJS.TimeSet([time1, time2, time3]), {days:{Sun:[], Mon:[time1], Tue:[], Wed:[time2], Thu:[], Fri:[time3], Sat:[]}});
        });

        it('should put a time into the day of its start if it spans over multiple days', function() {
            var time1 = new CourseJS.Time({day:'Mon', time:1800}, {day:'Tue', time:200});
            assert.deepEqual(new CourseJS.TimeSet([time1]), {days:{Sun:[], Mon:[time1], Tue:[], Wed:[], Thu:[], Fri:[], Sat:[]}});
        });

        it('should return a normal timeSet if the objects given are times with additional properties', function() {
            var time1 = {start:{flavor:'chocolate', day:'Mon', time:800}, end:{flavor:'vanilla', day:'Mon', time:900}};
            assert.deepEqual(new CourseJS.TimeSet([time1]), {days:{Sun:[], Mon:[time1], Tue:[], Wed:[], Thu:[], Fri:[], Sat:[]}});
        });

        it('should throw an error if the given objects given are not times', function() {
            var time1 = new CourseJS.Time({flavor:'chocolate', quantity: 2}, {flavor:'vanilla', quantity:900});
            expect(function() {new CourseJS.TimeSet([time1]);}).to.throw(Error);
        });
    });

    // insert test
    describe('#insert()', function() {
        it('should insert times into a timeSet and return true', function() {
            var timeSet = new CourseJS.TimeSet();
            var time1 = new CourseJS.Time({day:'Mon', time:800}, {day:'Mon', time:900});
            expect(timeSet.insert(time1)).to.equal(true);
            expect(timeSet).to.have.property('Mon', [time1]);
        });

        it('should split and insert times with multiple days into a timeSet and return true', function() {
            var timeSet = new new CourseJs.TimeSet();
            var time1 = new new CourseJs.Time({day:'Mon', time:800}, {day:'Tue', time:900});
            expect(timeSet.insert(time1)).to.equal(true);
            expect(timeSet).to.have.property('Mon', [{day:'Mon', time:800}, {day:'Mon', time:2359}]).and.to.have.property('Tue', [{day:'Tue', time:0}, {day:'Tue', time:900}]);
        });

        it('should add a time to a timeSet, but return false if the same time or an overlapping time is added later', function() {
            var timeSet = new CourseJS.TimeSet();
            var time1 = new CourseJS.Time({day:'Mon', time:800}, {day:'Mon', time:900});
            var time2 = new CourseJS.Time({day:'Mon', time:830}, {day:'Mon', time:930});
            expect(timeSet.insert(time1)).to.equal(true);
            expect(timeSet.insert(time1)).to.equal(false);
            expect(timeSet.insert(time2)).to.equal(false);
            expect(timeSet).to.have.property('Mon', [time1]);
        });
    });

    // getTimes test
    describe('#getTimes()', function() {
        var times = [new CourseJS.Time({day:'Mon', time:800}, {day:'Mon', time:900}), new CourseJS.Time({day:'Wed', time:800}, {day:'Wed', time:900}),
            new CourseJS.Time({day:'Fri', time:800}, {day:'Fri', time:900})];
        var otherTimes = [new CourseJS.Time({day:'Mon', time:800}, {day:'Mon', time:900}), new CourseJS.Time({day:'Fri', time:800}, {day:'Fri', time:900})];

        it('should get all times from the TimeSet', function() {
            var timeSet = new CourseJS.TimeSet(times);
            assert.deepEqual(new timeSet.getTimes(), times);
        });

        it('should get all times from the TimeSet on a given day', function() {
            var timeSet = new CourseJS.TimeSet(otherTimes);
            assert.deepEqual(timeSet.getTimes(), [Time({day:'Wed', time:800}, {day:'Wed', time:900})]);
        });
    });

    // getTimesByDay test
    describe('#getTimesByDay()', function() {
        var times = [new CourseJS.Time({day:'Mon', time:800}, {day:'Mon', time:900}),
            new CourseJS.Time({day:'Wed', time:800}, {day:'Wed', time:900}),
            new CourseJS.Time({day:'Fri', time:800}, {day:'Fri', time:900})];
        var otherTimes = [new CourseJS.Time({day:'Mon', time:800}, {day:'Mon', time:900}),
            new CourseJS.Time({day:'Fri', time:800}, {day:'Fri', time:900})];

        it('should get all times from the TimeSet that do not overlap with the restriction TimeSet', function() {
            var timeSet = new CourseJS.TimeSet(times);
            assert.deepEqual(timeSet.getTimesByDay('Mon'), [new CourseJS.Time({day:'Mon', time:800}, {day:'Mon', time:900})]);
        });

        it('should get all times from the TimeSet on a given day that do not overlap with the restriction TimeSet', function() {
            var timeSet = new CourseJS.TimeSet(times);
            assert.deepEqual(timeSet.getTimesByDay('Mon', otherTimes), []);
        });
    });

    // getTBA test
    describe('#getTBA()', function() {
        it('should ', function() {
            assert.deepEqual(new CourseJS.TimeSet.getTBA(), {days:{Sun:[], Mon:[time1], Tue:[], Wed:[], Thu:[], Fri:[], Sat:[]}});
        });
    });
});
