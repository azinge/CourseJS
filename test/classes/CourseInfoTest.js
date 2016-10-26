var expect = require('chai').expect;
var assert = require('chai').assert;
var CourseJS = require('../../course.js');

// CourseInfo test
describe('CourseInfo', function() {

    var searchable = {};
    var regular = {};
    var hidden = {};
    var number = "360";
    var section = '32450';
    var subject = 'math';

    // constructor test
    describe('#CourseInfo()', function() {

        it('should create a CourseInfo object with the given properties', function() {
            var courseInfo = new CourseJS.CourseInfo(searchabe, regular, hidden, number, section, subject);
            assert.deepEqual(courseInfo, {searcable:searchable, regular:regular, hidden:hidden,
                number:number, section:section, subject:subject});
        });

        it('should throw an error if the searchable, regular, or hidden properties are not objects', function() {

            expect(function() {new CourseJS.CourseInfo(searchabe, regular, hidden, number, section, subject));}).to.throw(Error);
        });

        it('should throw an error if the number, section, or subject properties are not strings', function() {
            expect(function() {new CourseJS.CourseInfo(searchabe, regular, hidden, {}, 6, []));}).to.throw(Error);
        });
    });

    // getNonCourseInfo test
    describe('#getNonCourseInfo()', function() {

        it('should create a info object with the non course specific info of a courseInfo object', function() {
            var courseInfo = new CourseJS.CourseInfo(searchabe, regular, hidden, number, section, subject);
            assert.deepEqual(courseInfo.getNonCourseInfo, {searcable:searchable, regular:regular, hidden:hidden});
        });
    });
});
