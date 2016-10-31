var expect = require('chai').expect;
var assert = require('chai').assert;
var CourseJS = require('../../course.js');

// Time Tests
describe('Time', function() {

    // constructor test
    describe('#Time()', function() {

        it('should instantiate a time with a start property and end property', function() {
            var start = {day:'Mon', time:800};
            var end = {day:'Mon', time:900};
            var time = new CourseJS.Time(start, end);
            assert.deepEqual(time, {start:start, end:end});
        });

        it('should create a TBA time if no parameters are given', function() {
            assert.deepEqual(new CourseJS.Time(), {});
        });

        it('should throw an error when start and end are the same moment', function() {
            var start = {day:'Mon', time:0};
            var end = {day:'Mon', time:0};
            expect(function() {new CourseJS.Time(start, end);}).to.throw(Error);
        });

        it('should throw an error when start and end are on different days', function() {
            var start = {day:'Mon', time:0};
            var end = {day:'Tue', time:0};
            expect(function() {new CourseJS.Time(start, end);}).to.throw(Error);
        });

        it('should instantiate a time as normal if additional properties are given', function() {
            var start = {name:'walrus', day:'Mon', time:800 , age:7};
            var end = {name:'narwhal', day:'Mon', time:900, age:'infinity'};
            expect(function() {new CourseJS.Time(start, end);}).to.not.throw(Error);
        });

        it('should throw an error when start and end are not moment objects', function() {
            var start = {name:'walrus', age:7};
            var end = {name:'narwhal', age:'infinity'};
            expect(function() {new CourseJS.Time(start, end);}).to.throw(Error);
        });

        it('should throw an error when start or end do not have military time numbers', function() {
            var start = {day:'Mon', time:890};
            var end = {day:'Mon', time:900};
            expect(function() {new CourseJS.Time(start, end);}).to.throw(Error);
        });

        it('should throw an error when start or end do not have military time numbers', function() {
            var start = {day:'Mon', time:800};
            var end = {day:'Mon', time:2400};
            expect(function() {new CourseJS.Time(start, end);}).to.throw(Error);
        });

        it('should throw an error when start or end are not real days', function() {
            var start = {day:'Man', time:800};
            var end = {day:'Tuo', time:900};
            expect(function() {new CourseJS.Time(start, end);}).to.throw(Error);
        });
    });

    // getOverlap test
    describe('#getOverlap()', function() {
        it('should return the overlapping time between two times', function() {
            var time1 = new CourseJS.Time({day:'Mon', time:1000}, {day:'Mon', time:1200});
            var time2 = new CourseJS.Time({day:'Mon', time:1100}, {day:'Mon', time:1300});
            assert.deepEqual(time1.getOverlap(time2), {start:{day:'Mon', time:1100}, end:{day:'Mon', time:1200}});
        });

        it('should return one time if it is between the start and end of the other', function() {
            var time1 = new CourseJS.Time({day:'Mon', time:0}, {day:'Mon', time:2100});
            var time2 = new CourseJS.Time({day:'Mon', time:700}, {day:'Mon', time:1400});
            assert.deepEqual(time1.getOverlap(time2), time2);
        });

        it('should return TBA for times that do not overlap', function() {
            var time1 = new CourseJS.Time({day:'Sat', time:0}, {day:'Sat', time:1000});
            var time2 = new CourseJS.Time({day:'Sat', time:1000}, {day:'Sat', time:2000});
            assert.deepEqual(time1.getOverlap(time2), new CourseJS.Time());
        });

        it('should return TBA for times that are on different days', function() {
            var time1 = new CourseJS.Time({day:'Tue', time:800}, {day:'Tue', time:1000});
            var time2 = new CourseJS.Time({day:'Mon', time:900}, {day:'Mon', time:1100});
            assert.deepEqual(time1.getOverlap(time2), new CourseJS.Time());
        });
    });

    // get isTBA Test
    describe('#isTBA', function() {
        it('should return true if the time is TBA', function() {
            expect(new CourseJS.Time().isTBA()).to.equal(true);
        });

        it('should return false if the time is TBA', function() {
            expect(new CourseJS.Time({day:'Tue', time:800}, {day:'Tue', time:1000}).isTBA()).to.equal(false);
        });
    });
});
