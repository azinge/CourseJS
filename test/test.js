var expect = require('chai').expect;
// Example test
describe('Array', function() {
    describe('#indexOf()', function() {
        it('should return -1 when the value is not present', function() {
            expect([1,2,3].indexOf(4)).to.equal(-1);
        });
    });
});

// Entry Tests
describe('Entry', function() {

    // constructor test
    describe('#Entry()', function() {
        //TODO: Implement Test
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

// Course Tests
describe('Course', function() {

    // constructor Test
    describe('#Course()', function() {
        //TODO: Implement Test
    });

    // getCourseInfo test
    describe('#getCourseInfo()', function() {
        //TODO: Implement Test
    });
});

// EntryGroup Tests
describe('entryGroup', function() {

    // constructor Test
    describe('#EntryGroup()', function() {
        //TODO: Implement Test
    });

    // insert test
    describe('#insert()', function() {
        //TODO: Implement Test
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

// Schedule Tests
describe('Schedule', function() {

    // constructor test
    describe('#Schedule()', function() {
        //TODO: Implement Test
    });

    // isCompatibleWithSchedule test
    describe('#isCompatibleWithSchedule()', function() {
        //TODO: Implement Test
    });

    // getItems test
    describe('#getItems()', function() {
        //TODO: Implement Test
    });

    // getItemsForDay test
    describe('#getItemsForDay()', function() {
        //TODO: Implement Test
    });

    // getFreeTime test
    describe('#getFreeTime()', function() {
        //TODO: Implement Test
    });
});

// TimeSet Tests
describe('TimeSet', function() {

    // constructor test
    describe('#TimeSet()', function() {
        it('should return an undefined timeSet if no parameters are given', function() {
            expect(TimeSet()).to.equal(undefined);
        });

        it('should return an undefined timeSet if the times given are undefined (TBA)', function() {
            expect(TimeSet([undefined, undefined])).to.equal(undefined);
        });

        it('should return an undefined timeSet if the times given are undefined (TBA)', function() {
            time1 = Time({day:'Mon', time:800}, {day:'Mon', time:850});
            time2 = Time({day:'Wed', time:800}, {day:'Wed', time:850});
            time3 = Time({day:'Fri', time:800}, {day:'Fri', time:850});
            expect(TimeSet(time1, time2, time3)).to.equal({days:{Sun:[], Mon:[time1], Tue:[], Wed:[time2], Thu:[], Fri:[time3], Sat:[]}});
        });

        it('should return a normal timeSet if the objects given are times with additional properties', function() {
            time1 = {start:{flavor:'chocolate', day:'Mon', time:800}, end:{flavor:'vanilla', day:'Mon', time:850}};
            expect(TimeSet(time1)).to.equal({days:[Time({day:'Mon', time:800}, {day:'Mon', time:850})]});
        });

        it('should throw an error if the given objects given are not times', function() {
            time1 = {start:{flavor:'chocolate', quantity: 2}, end:{flavor:'vanilla', quantity:850}};
            expect(TimeSet(time1)).to.equal({days:[Time({day:'Mon', time:800}, {day:'Mon', time:850})]});
        });
    });

    // insert test
    describe('#insert()', function() {
        //TODO: Implement Test
    });

    // getTimesByDay test
    describe('#getTimesByDay()', function() {
        //TODO: Implement Test
    });

    // getTBA test
    describe('#getTBA()', function() {
        //TODO: Implement Test
    });
});

// Time Tests
describe('Time', function() {

    // constructor test
    describe('#Time()', function() {

        it('should instantiate a time with a start property and end property', function() {
            var start = {day:'Mon', time:800};
            var end = {day:'Mon', time:900};
            expect(Time(start, end)).to.deepEqual({start:start, end:end});
        });

        it('should throw an undefined time when the start or end are undefined', function() {
            expect(Time()).equal(undefined);
        });

        it('should throw an error when start and end are the same moment', function() {
            var start = {day:'Mon', time:0};
            var end = {day:'Mon', time:0};
            expect(Time(start, end)).to.throw(Error);
        });

        it('should instantiate a time as normal', function() {
            var start = {name:'walrus', day:'Mon', time:800 , age:7};
            var end = {name:'narwhal', day:'Mon', time:900, age:'infinity'};
            expect(Time(start, end)).to.not.throw(Error);
        });

        it('should throw an error when start and end are not moment objects', function() {
            var start = {name:'walrus', age:7};
            var end = {name:'narwhal', age:'infinity'};
            expect(Time(start, end)).to.throw(Error);
        });

        it('should throw an error when start or end do not have military time numbers', function() {
            var start = {day:'Mon', time:890};
            var end = {day:'Mon', time:900};
            expect(Time(start, end)).to.throw(Error);
        });

        it('should throw an error when start or end do not have military time numbers', function() {
            var start = {day:'Mon', time:800};
            var end = {day:'Mon', time:2400};
            expect(Time(start, end)).to.throw(Error);
        });

        it('should throw an error when start or end are not real days', function() {
            var start = {day:'Man', time:800};
            var end = {day:'Tuo', time:900};
            expect(Time(start, end)).to.throw(Error);
        });
    });

    // getOverlap test
    describe('#getOverlap()', function() {
        it('should return the overlapping time between two times', function() {
            var time1 = Time({day:'Mon', time:0}, {day:'Tue', time:0});
            var time2 = Time({day:'Mon', time:1200}, {day:'Tue', time:1200});
            expect(time1.getOverlap(time2)).deepEqual({start:{day:'Mon', time:1200}, end:{day:'Tue', time:0}});
        });

        it('should return the overlapping time between two times', function() {
            var time1 = Time({day:'Mon', time:0}, {day:'Tue', time:0});
            var time2 = Time({day:'Mon', time:1200}, {day:'Tue', time:1200});
            expect(time1.getOverlap(time2)).deepEqual({start:{day:'Mon', time:1200}, end:{day:'Tue', time:0}});
        });

        it('should return the overlapping time between two times', function() {
            var time1 = Time({day:'Mon', time:0}, {day:'Tue', time:0});
            var time2 = Time({day:'Mon', time:1200}, {day:'Tue', time:1200});
            expect(time1.getOverlap(time2)).deepEqual({start:{day:'Mon', time:1200}, end:{day:'Tue', time:0}});
        });

        it('should return one time if it is between the start and end of the other', function() {
            var time1 = Time({day:'Mon', time:0}, {day:'Fri', time:0});
            var time2 = Time({day:'Tue', time:0}, {day:'Wed', time:0});
            expect(time1.getOverlap(time2)).to.deepEqual(time2);
        });

        it('should return an empty object for times that do no not overlap', function() {
            var time1 = Time({day:'Tue', time:800}, {day:'Tue', time:1000});
            var time2 = Time({day:'Mon', time:900}, {day:'Mon', time:1100});
            expect(time1.getOverlap(time2)).equal({});
        });

        it('should return an empty object for times that do no not overlap', function() {
            var time1 = Time({day:'Sat', time:0}, {day:'Sat', time:1000});
            var time2 = Time({day:'Sat', time:1000}, {day:'Sat', time:2000});
            expect(time1.getOverlap(time2)).equal({});
        });
    });

    // getTBA test
    describe('#getTBA()', function() {
        it('should return an undefined time', function() {
            expect(getTBA()).equal(undefined);
        });
    });
});

// Info test
describe('Info', function() {

    // constructor test
    describe('#Info()', function() {
        //TODO: Implement Test
    });

    // toString test
    describe('#toString()', function() {
        //TODO: Implement Test
    });
});

// CourseInfo test
describe('CourseInfo', function() {

    // constructor test
    describe('#CourseInfo()', function() {
        //TODO: Implement Test
    });

    // getNonCourseInfo test
    describe('#getNonCourseInfo()', function() {
        //TODO: Implement Test
    });

    // toString test
    describe('#toString()', function() {
        //TODO: Implement Test
    });
});

// CourseLookup test
describe('CourseLookup', function() {

    // constructor test
    describe('#CourseLookup()', function() {
        //TODO:
    });

    // insert test
    describe('#insert()', function() {
        //TODO: Implement Test
    });

    // getCourseByAlias test
    describe('#getCourseByAlias()', function() {
        //TODO: Implement Test
    });

    // findOtherSectionsOfCourse test
    describe('#findOtherSectionsOfCourse()', function() {
        //TODO: Implement Test
    });

    // findMatchingCourses test
    describe('#findMatchingCourses()', function() {
        //TODO: Implement Test
    });
});

// SearchQuery test
describe('searchQuery', function() {

    // constructor test
    describe('#searchQuery()', function() {
        //TODO: Implement Test
    });

    // formatData test
    describe('#formatData()', function() {
        //TODO: Implement Test
    });
});
