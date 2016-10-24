var expect = require('chai').expect;
var assert = require('chai').assert;
var CourseJS = require('../../course.js');

// Info test
describe('Info', function() {

    // constructor test
    describe('#Info()', function() {
        it('should create an Info object with the given properties', function() {
            var searchable = {};
            var regular = {};
            var hidden = {};
            assert.deepEqual(new CourseJS.Info(searchabe, regular, hidden), {searcable:searchable, regular:regular, hidden:hidden});
        });

        it('should throw an error if the searchable, regular, or hidden properties are not objects', function() {
            var searchable = '';
            var regular = 6;
            var hidden;
            expect(function() {new CourseJS.Info(searchabe, regular, hidden);}).to.throw(Error);
        });
    });
});
