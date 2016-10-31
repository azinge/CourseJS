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
    var entry1 = new CourseJS.Entry('43245', new CourseJS.TimeSet([time1, time2, time3]), new CourseJS.Info({}, {}, {}));
    var entry2 = new CourseJS.Course('40067', new CourseJS.TimeSet([time4, time5]), new CourseJS.CourseInfo({}, {}, {}, 'number', 'section', 'subject'));
    var entry3 = new CourseJS.Course('35677', new CourseJS.TimeSet(), new CourseJS.CourseInfo({}, {}, {}, 'number', 'section', 'subject'));
    var entry4 = new CourseJS.Entry('43245', new CourseJS.TimeSet([time1, time3, time4]), new CourseJS.Info({}, {}, {}));


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
            expect(function() {new CourseJS.EntryGroup([timeSet1, timeSet2], 'Title');}).to.throw(Error);
        });

        it('should throw an error if incorrect or no parameters are given', function () {
            expect(function() {new CourseJS.EntryGroup(null, 'Title');}).to.throw(Error);
            expect(function() {new CourseJS.EntryGroup([entry1], {});}).to.throw(Error);
            expect(function() {new CourseJS.EntryGroup();}).to.throw(Error);
        });
    });

    // insert test
    describe('#insert()', function() {
        it('should insert an entry and return true', function() {
            var entryGroup = new CourseJS.EntryGroup([], 'Title');
            expect(entryGroup.insert(entry1)).to.equal(true);
            expect(entryGroup.insert(entry2)).to.equal(true);
            assert.deepEqual(entryGroup.entries, [entry1, entry2]);
        });

        it('should return false and do nothing if anything other than an entry is inserted', function() {
            var entryGroup = new CourseJS.EntryGroup([], 'Title');
            expect(entryGroup.insert(time1)).to.equal(false);
            expect(entryGroup.insert('Yellow')).to.equal(false);
            assert.deepEqual(entryGroup.entries, []);
        });

        it('should return false and do nothing if a repeat of an entry is added', function() {
            var entryGroup = new CourseJS.EntryGroup([], 'Title');
            expect(entryGroup.insert(entry1)).to.equal(true);
            expect(entryGroup.insert(entry1)).to.equal(false);
            assert.deepEqual(entryGroup.entries, [entry1]);
        });
    });

    // select test
    describe('#select()', function() {
        var entryGroup = new CourseJS.EntryGroup([entry1, entry2], 'Title');
        it('should return the index of a selected entry', function() {
            expect(entryGroup.select(entry2)).to.equal(true);
            expect(entryGroup.selected).to.equal(1);
        });

        it('should do nothin and return false if the parameter is not an entry in the entryGroup', function() {
            entryGroup.select(entry2);
            expect(entryGroup.select(entry3)).to.equal(false);
            expect(entryGroup.select(new CourseJS.Time())).to.equal(false);
            expect(entryGroup.select()).to.equal(false);
            expect(entryGroup.selected).to.equal(1);
        });
    });

    // activate test
    describe('#activate()', function() {
        it('should activate entries by adding their index to the active array', function() {
            var entryGroup = new CourseJS.EntryGroup([entry1, entry2], 'Title');
            entryGroup.activate([entry1, entry2]);
            assert.deepEqual(entryGroup.getActivatedEntries(), [0, 1]);
        });

        it('should only activate an entry once', function() {
            var entryGroup = new CourseJS.EntryGroup([entry1, entry2], 'Title');
            entryGroup.activate([entry2, entry2]);
            assert.deepEqual(entryGroup.getActivatedEntries(), [1]);
        });

        it('should throw an error if the entries parameter is not an array of entries', function() {
            var entryGroup = new CourseJS.EntryGroup([entry1, entry2], 'Title');
            expect(function() {entryGroup.activate(entry1);}).to.throw(Error);
            expect(function() {entryGroup.activate([time1, time2]);}).to.throw(Error);
        });
    });

    // deactivate test
    describe('#deactivate()', function() {
        it('should deactivate entries by removing their index from the active array', function() {
            var entryGroup = new CourseJS.EntryGroup([entry1, entry2], 'Title');
            entryGroup.activate([entry1, entry2]);
            entryGroup.deactivate([entry1, entry2]);
            assert.deepEqual(entryGroup.getActivatedEntries(), []);
        });

        it('should deactivate entries by removing their index from the active array', function() {
            var entryGroup = new CourseJS.EntryGroup([entry1, entry2], 'Title');
            entryGroup.activate([entry1, entry2]);
            entryGroup.deactivate([entry1]);
            assert.deepEqual(entryGroup.getActivatedEntries(), [1]);
        });

        it('should do nothing if the entry given is not an active entry in the entry group', function() {
            var entryGroup = new CourseJS.EntryGroup([entry1, entry2, entry3], 'Title');
            entryGroup.activate([entry1, entry2]);
            entryGroup.deactivate([entry3]);
            assert.deepEqual(entryGroup.getActivatedEntries(), [0, 1]);
        });

        it('should throw an error if the entries parameter is not an array of entries', function() {
            var entryGroup = new CourseJS.EntryGroup([entry1, entry2], 'Title');
            expect(function() {entryGroup.deactivate(entry1);}).to.throw(Error);
            expect(function() {entryGroup.deactivate([time1, time2]);}).to.throw(Error);
        });
    });

    // getSelectedEntry test
    describe('#getSelectedEntry()', function() {
        var entryGroup = new CourseJS.EntryGroup([entry1, entry2], 'Title');

        it('should return the selected entry, or undefined if none are selected', function() {
            expect(entryGroup.getSelectedEntry()).to.equal(undefined);
            entryGroup.select(entry2);
            expect(entryGroup.getSelectedEntry()).to.equal(entry2);
        });
    });

    // getActivatedEntries test
    describe('#getActivatedEntries()', function() {
        var entryGroup = new CourseJS.EntryGroup([entry1, entry2], 'Title');
        it('should return the activated entries', function() {
            assert.deepEqual(entryGroup.getActivatedEntries(), []);
            entryGroup.activate([entry1, entry2]);
            assert.deepEqual(entryGroup.getActivatedEntries(), [0, 1]);
        });
    });

    // getOverlappingTimeSets test
    describe('#getOverlappingTimeSets()', function() {
        var entryGroup = new CourseJS.EntryGroup([entry1, entry2, entry3], 'Title');
        entryGroup.activate([entry1, entry2, entry3])

        it('should return the overlapping time sets between all of the entry groups active entries with the argument entry', function() {
            assert.deepEqual(entryGroup.getOverlappingTimeSets(entry4), [new CourseJS.TimeSet([time1, time3]), new CourseJS.TimeSet([time4]), new CourseJS.TimeSet()]);
        });

        it('should return empty time sets if there are no overlaps', function() {
            assert.deepEqual(entryGroup.getOverlappingTimeSets(entry3), [new CourseJS.TimeSet(), new CourseJS.TimeSet(), new CourseJS.TimeSet()]);
        });

        it('should throw an error if the argument is not an entry', function() {
            expect(function() {entryGroup.getOverlappingTimeSets(timeSet1);}).to.Throw(Error);
        });
    });

    // isCompatibleWithEntryGroup test
    describe('#isCompatibleWithEntryGroup()', function() {
        it('should return true if the selected entry of the entry group does not conflict with the active entries of the other', function() {
            var entryGroup = new CourseJS.EntryGroup([entry1, entry2, entry3, entry4], 'Title');
            var otherEntryGroup = new CourseJS.EntryGroup([entry1, entry2, entry3, entry4], 'Title');
            entryGroup.select(entry1);
            otherEntryGroup.activate([entry2, entry3])
            expect(entryGroup.isCompatibleWithEntryGroup(otherEntryGroup)).to.equal(true);
        });

        it('should return false if the selected entry of the entry group conflicts with the active entries of the other', function() {
            var entryGroup = new CourseJS.EntryGroup([entry1, entry2, entry3, entry4], 'Title');
            var otherEntryGroup = new CourseJS.EntryGroup([entry1, entry2, entry3, entry4], 'Title');
            entryGroup.select(entry1);
            otherEntryGroup.activate([entry2, entry3, entry4])
            expect(entryGroup.isCompatibleWithEntryGroup(otherEntryGroup)).to.equal(false);
        });

        it('should throw an error if the entryGroup does not have a selected entry', function() {
            var entryGroup = new CourseJS.EntryGroup([entry1, entry2, entry3, entry4], 'Title');
            var otherEntryGroup = new CourseJS.EntryGroup([entry1, entry2, entry3, entry4], 'Title');
            otherEntryGroup.activate([entry2, entry3, entry4])
            expect(function() {entryGroup.isCompatibleWithEntryGroup(timeSet1);}).to.Throw(Error);
        });

        it('should throw an error if the argument is not an entryGroup', function() {
            var entryGroup = new CourseJS.EntryGroup([entry1, entry2, entry3, entry4], 'Title');
            expect(function() {entryGroup.isCompatibleWithEntryGroup(timeSet1);}).to.Throw(Error);
        });
    });

    // getInfo test
    describe('#getInfo()', function() {
        it('should return the info of the selected entry in an entry group', function() {
            var entryGroup = new CourseJS.EntryGroup([entry1, entry2], 'Title');
            entryGroup.select(entry2);
            assert.deepEqual(entryGroup.getInfo(), entry2.getInfo());
        });

        it('should return undefined if no entry is selected', function() {
            var entryGroup = new CourseJS.EntryGroup([entry1, entry2], 'Title');
            expect(entryGroup.getInfo()).to.equal(undefined);
        });
    });
});
