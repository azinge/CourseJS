var expect = require('chai').expect;
var assert = require('chai').assert;
var CourseJS = require('../../course.js');

// EntryGroup Tests
describe('EntryGroup', function() {
    var time1 = new CourseJS.Time({day:'Mon', time:800}, {day:'Mon', time:850});
    var time2 = new CourseJS.Time({day:'Wed', time:800}, {day:'Wed', time:850});
    var time3 = new CourseJS.Time({day:'Fri', time:800}, {day:'Fri', time:850});
    var time4 = new CourseJS.Time({day:'Tue', time:800}, {day:'Tue', time:930});
    var time5 = new CourseJS.Time({day:'Thu', time:800}, {day:'Thu', time:930});
    var timeSet1 = new CourseJS.TimeSet([time1, time2, time3]);
    var timeSet2 = new CourseJS.TimeSet([time4, time5]);
    var timeSet3 = new CourseJS.TimeSet.get TBA();
    var entry1 = new CourseJS.Entry('43245', timeSet1, new CourseJS.Info({}, {}, {}));
    var entry2 = new CourseJS.Entry('40067', timeSet2, new CourseJS.Info({}, {}, {}));

    // constructor Test
    describe('#EntryGroup()', function() {
        it('should create an entryGroup with the given entries and title', function () {
            assert.deepEqual(new CourseJS.EntryGroup([timeSet1, timeSet2], 'Title'),
                {entries:[timeSet1, timeSet2], title:'Title', selected:-1, active:[]});
        });

        it('should create an entryGroup with the given entries and title', function () {
            assert.deepEqual(new CourseJS.EntryGroup([timeSet1, timeSet2], 'Title'),
                {entries:[timeSet1, timeSet2], title:'Title', selected:-1, active:[]});
        });

        it('should throw an error if entries is not an array of entries or if title is not a string', function () {
            var entries = [new CourseJS.Entry('alias', [new CourseJS.Time()], new Info({}, {}, {}))];
            expect(function() {new CourseJS.EntryGroup({}, 'Title')}).to.throw(Error);
            expect(function() {new CourseJS.EntryGroup(entries, {})}).to.throw(Error);
        });
    });

    // insert test
    describe('#insert()', function() {
        it('should insert an entry and return true', function() {

        });
    });

    // select test
    describe('#select()', function() {
        //TODO: Implement Test
    });

    // activate test
    describe('#activate()', function() {
        //TODO: Implement Test
    });

    // deactivate test
    describe('#deactivate()', function() {
        //TODO: Implement Test
    });

    // getSelectedEntry test
    describe('#getSelectedEntry()', function() {
        //TODO: Implement Test
    });

    // getActivatedEntries test
    describe('#getActivatedEntries()', function() {
        //TODO: Implement Test
    });

    // getOverlappingTimeSets test
    describe('#getOverlappingTimeSets()', function() {
        //TODO: Implement Test
    });

    // isCompatibleWithEntryGroup test
    describe('#isCompatibleWithEntryGroup()', function() {
        //TODO: Implement Test
    });

    // getInfo test
    describe('#getInfo()', function() {
        //TODO: Implement Test
    });
});
