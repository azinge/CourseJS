var expect = require('chai').expect;
var assert = require('chai').assert;
var CourseJS = require('../../course.js');

// Course Tests
describe('Course', function() {

    // constructor Test
    describe('#Course()', function() {

        it('should', function() {
            var time1 = new  CourseJS.Time({day:'Mon', time:800}, {day:'Mon', time:850});
            var time2 = new CourseJS.Time({day:'Wed', time:800}, {day:'Wed', time:850});
            time3 = new CourseJS.Time({day:'Fri', time:800}, {day:'Fri', time:850});

            it('should create an entry with the given alias, timeSet, and info', function() {
                var times = new CourseJS.TimeSet([time1, time2, time3]);
                var courseInfo = new  CourseJS.CourseInfo({}, {}, {}, '', '', '');
                assert.deepEqual(new CourseJS.Course('43245', times, courseInfo), {alias:'43245', times:times, courseInfo:courseInfo});
            });

            it('should throw an error if the arguments are not string, timeSet, and courseInfo', function() {
                var times = new CourseJS.TimeSet([time1, time2, time3]);
                var info = new CourseJS.Info();
                expect(function() {new CourseJS.Entry({}, 'times', 'courseInfo');}).to.throw(Error);
            });
        });
    });

    // getInfo test
    describe('#getInfo()', function() {
        //TODO:Implement Test
    });
});
