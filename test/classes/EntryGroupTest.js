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
    var timeSet3 = new CourseJS.TimeSet();
    var entry1 = new CourseJS.Entry('43245', timeSet1, new CourseJS.Info({}, {}, {}));
    var entry2 = new CourseJS.Entry('40067', timeSet2, new CourseJS.Info({}, {}, {}));

    // constructor Test
    describe('#EntryGroup()', function() {
        it('should create an empty entryGroup if an empty array is given', function () {
            assert.deepEqual(new CourseJS.EntryGroup([], 'Title'),
                {entries:[], title:'Title', selected:-1, active:[]});
        });

        it('should create an entryGroup with the given entries and title', function () {
            assert.deepEqual(new CourseJS.EntryGroup([entry1, entry2], 'Title'),
                {entries:[entry1, entry2], title:'Title', selected:-1, active:[]});
        });

        it('should throw an error if any of the entries are not entry Objects', function () {
            expect(new CourseJS.EntryGroup([timeSet1, timeSet2], 'Title')).to.throw(Error);
        });

        it('should throw an error if incorrect or no parameters are given', function () {
            // expect(function() {new CourseJS.EntryGroup(null, 'Title')}).to.throw(Error);
            // expect(function() {new CourseJS.EntryGroup([entry1], {})}).to.throw(Error);
            // expect(function() {new CourseJS.EntryGroup().to.throw(Error);
        });
    });

    // insert test
    describe('#insert()', function() {
        var entryGroup = new CourseJS.EntryGroup([], 'Title');
        it('should insert an entry and return true', function() {
            expect(entryGroup.insert(entry1)).to.equal(true);
            expect(entryGroup.insert(entry2)).to.equal(true);
            assert.deepEqual(entryGroup.entries, [entry1, entry2]);
        });

        it('should return false and do nothing if anything other than an entry is inserted', function() {
            expect(entryGroup.insert(time1)).to.equal(false);
            expect(entryGroup.insert('Yellow')).to.equal(false);
            assert.deepEqual(entryGroup.entries, []);
        });

        it('should return false and do nothing if a repeat of an entry is added', function() {
            expect(entryGroup.insert(entry1)).to.equal(true);
            expect(entryGroup.insert(entry1)).to.equal(false);
            assert.deepEqual(entryGroup.entries, [entry1]);
        });
    });

    // select test
    describe('#select()', function() {
        // var entryGroup = new CourseJS.EntryGroup([entry1, entry2], 'Title');
        // it('should return the index of a selected entry', function() {
        //     expect(entryGroup.select(entry2)).to.equal(true);
        //     expect(entryGroup.selected).to.equal(1);
        // });
        //
        // it('should do nothin and return false if the parameter is not an entry in the entryGroup', function() {
        //     // entryGroup.select(entry2);
        //     // expect(entryGroup.select(new CourseJS.Entry('43245', timeSet3, new CourseJS.Info({}, {}, {}))).to.equal(false);
        //     // expect(entryGroup.select(new CourseJS.Time()).to.equal(false);
        //     // expect(entryGroup.select().to.equal(false);
        //     // expect(entryGroup.selected).to.equal(1);
        // });
    });

    // activate test
    describe('#activate()', function() {
        // var entryGroup = new CourseJS.EntryGroup([entry1, entry2], 'Title');
        // it('should activate entries by adding their index to the active array', function() {
        //     entryGroup.activate([entry2, entry1]);
        //     assert.deepEqual(entryGroup.getActivatedEntries(), [1, 0]);
        // });
        //
        // it('should only activate an entry once if it is duplicated in the parameters', function() {
        //     entryGroup.activate([entry2, entry2]);
        //     assert.deepEqual(entryGroup.getActivatedEntries(), [1]);
        // });
    });

    // deactivate test
    describe('#deactivate()', function() {
        // var entryGroup = new CourseJS.EntryGroup([entry1, entry2], 'Title');
        // it('should deactivate entries by removing their index to the active array', function() {
        //     entryGroup.activate([entry2, entry1]);
        //     EntryGroup.deactivate([entry1, entry2]);
        //     assert.deepEqual(entryGroup.getActivatedEntries(), []);
        // });
    });

    // getSelectedEntry test
    describe('#getSelectedEntry()', function() {
        // var entryGroup = new CourseJS.EntryGroup([entry1, entry2], 'Title');
        // it('should return the selected entry, or undefined if none are selected', function() {
        //     expect(entryGroup.getSelectedEntry()).to.equal(undefined);
        //     entryGroup.select(entry2);
        //     expect(entryGroup.getSelectedEntry()).to.equal(entry2);
        // });
    });

    // getActivatedEntries test
    describe('#getActivatedEntries()', function() {
        // var entryGroup = new CourseJS.EntryGroup([entry1, entry2], 'Title');
        // it('should return the activated entries', function() {
        //     assert.deepEqual(entryGroup.getActivatedEntries(), []);
        //     entryGroup.activate(entry1);
        //     assert.deepEqual(entryGroup.getActivatedEntries(), [entry1]);
        // });
    });

    // getOverlappingTimeSets test
    describe('#getOverlappingTimeSets()', function() {
        //TODO: Imlement Test
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
