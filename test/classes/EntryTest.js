var expect = require('chai').expect;
var assert = require('chai').assert;
var CourseJS = require('../../course.js');

// Entry Tests
describe('Entry', function() {

    // constructor test
    describe('#Entry()', function() {
        var time1 = new CourseJS.Time({day:'Mon', time:800}, {day:'Mon', time:850});
        var time2 = new CourseJS.Time({day:'Wed', time:800}, {day:'Wed', time:850});
        var time3 = new CourseJS.Time({day:'Fri', time:800}, {day:'Fri', time:850});
        var times = new CourseJS.TimeSet([time1, time2, time3]);
        var info = new CourseJS.Info({}, {}, {});

        it('should create an entry with the given alias, timeSet, and info', function() {
            assert.deepEqual(new CourseJS.Entry('43245', times, info), {alias:'43245', times:times, info:info});
        });

        it('should throw an error if the arguments are not string, timeSet, and info', function() {
            expect(function() {new CourseJS.Entry({}, times, info);}).to.throw(Error);
            expect(function() {new CourseJS.Entry('Alias', 5, info);}).to.throw(Error);
            expect(function() {new CourseJS.Entry('Alias', times, 'info');}).to.throw(Error);
        });
    });

    // getOverlappingTimeSet test
    describe('#getOverlappingTimeSet()', function() {
        //TODO: Implement Test
    });

    // getInfo test
    describe('#getInfo()', function() {
        //TODO: Implement Test
    });
});
