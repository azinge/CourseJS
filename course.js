"use strict";
var CourseJS = {};

/**
 * [Entry description]
 */
CourseJS.Entry = class Entry {
    /**
     * [constructor description]
     * @param {String} alias [description]
     * @param {TimeSet} times [description]
     * @param {Info} info [description]
     */
    constructor (alias, times, info) {
        this.alias = alias;
        this.times = times;
        this.info = info;
    }

    /**
     * [checkTimeConflict description]
     * @param {Course} otherCourse [description]
     * @return {boolean} [description]
     */
    checkTimeConflict (otherCourse) {
        //TODO: Implement Function
    }

    /**
     * [getInfo description]
     * @return {Info} [description]
     */
    getInfo () {
        return info;
    }
}

/**
 * [Course description]
 */
CourseJS.Course = class Course extends CourseJS.Entry {
    /**
     * [constructor description]
     * @param {String} alias [description]
     * @param {TimeSet} times [description]
     * @param {Info} info [description]
     * @param {CourseInfo} courseInfo [description]
     */
    constructor (alias, times, info, courseInfo) {
        super(alias, times, info);
        this.courseInfo = courseInfo;
    }

    /**
     * [getCourseInfo description]
     * @return {CourseInfo} [description]
     */
    getCourseInfo () {
        return courseInfo;
    }
}

/**
 * [CourseGroup description]
 */
CourseJS.CourseGroup = class CourseGroup {
    /**
     * [constructor description]
     * @param {Array<Course>} courses [description]
     */
    constructor (courses) {
        this.courses = courses;
        this.number = courses[0].getCourseInfo().number;
        this.subject = courses[0].getCourseInfo().subject;
        //TODO: Implement Sections
        this.selectedSections = [];
        this.activeSections = [];
    }

    /**
     * [checkTimeConflict description]
     * @param {Course} otherCourse [description]
     * @return {boolean} [description]
     */
    checkTimeConflict (otherCourse) {
        //TODO: Implement Function
    }

    /**
     * [getCourseInfo description]
     * @return {CourseInfo} [description]
     */
    getCourseInfo () {

    }
}

/**
 * [Schedule description]
 */
CourseJS.Schedule = class Schedule {
    /**
     * [constructor description]
     * @param {String} owner [description]
     * @param {Array<Entry|CourseGroup>} entries [description]
     */
    constructor (owner, entries) {
        //TODO: Implement Constructor
    }

    /**
     * [checkConflictWithSchedule description]
     * @param {Entry} entry [description]
     * @return {boolean} [description]
     */
    checkConflictWithSchedule (entry) {
        //TODO: Implement Function
    }

    /**
     * [insertEntry description]
     * @param {Entry} entry [description]
     * @return {boolean} [description]
     */
    insertEntry (entry) {
        //TODO: Implement Function
    }

    /**
     * [getEntries description]
     * @return {Array<Entry>} [description]
     */
    getEntries () {
        //TODO: Implement Function
    }

    /**
     * [getEntriesForDay description]
     * @param {String} day [description]
     * @return {Array<Entry>} [description]
     */
    getEntriesForDay (day) {
        //TODO: Implement Function
    }

    /**
     * [getFreeTime description]
     * @param {Object=} restrictions [description]
     * @return {TimeSet} [description]
     */
    getFreeTime (restrictions) {
        //TODO: Implement Function
    }
}

/**
 * [TimeSet description]
 */
CourseJS.TimeSet = class TimeSet {
    /**
     * [constructor description]
     * @param {Array<Time>=} times [description]
     */
    constructor (times) {
        this.days = {Su: [], M: [], T: [], W: [], R: [], F: [], S: []};
        //TODO: Finish Function
        //If no params, TBA
    }

    /**
     * [insertTime description]
     * @param {Time} time [description]
     * @return {boolean} [description]
     */
    function insertTime (time) {

    }

    /**
     * [getTimes description]
     * @return {Array<Time>} [description]
     */
    function getTimes () {

    }

    /**
     * [getTimesByDay description]
     * @param {String} day [description]
     * @return {Array<Time>} [description]
     */
    function getTimesByDay (day) {

    }

    /**
     * [TBA description]
     */
    get TBA () {
        return TimeSet();
    }
}

/**
 * [Time description]
 */
CourseJS.Time = class Time {
    /**
     * [constructor description]
     * @param {String} [name] [description]
     * @param {String} [name] [description]
     */
    constructor (day, startTime, endTime) {
        //TODO: Implement Constructor
    }

    /**
     * [getOverlap description]
     * @param {Time} time [description]
     * @return {boolean} [description]
     */
    checkOverlap (time) {
        //TODO: Implement Function
    }
}

/**
 * [Info description]
 */
CourseJS.Info = class Info {
    /**
     * [constructor description]
     * @param {Object} searchable [description]
     * @param {Object} regular [description]
     * @param {Object} hidden [description]
     */
    constructor (searchable, regular, hidden) {
        this.searchable = searchable;
        this.regular = regular;
        this.hidden = hidden;
    }

    /**
     * [toString description]
     * @return {String} [description]
     */
    toString () {
        //TODO: Implement Function
    }
}

/**
 * [CourseInfo description]
 */
CourseJS.CourseInfo = class CourseInfo {
    /**
     * [constructor description]
     * @param {String} number [description]
     * @param {String} section [description]
     * @param {String} subject [description]
     */
    constructor (number, section, subject) {
        this.number = number;
        this.section = section;
        this.subject = subject;
    }

    /**
     * [toString description]
     * @return {String} [description]
     */
    toString () {
        //TODO: Implement Function
    }
}

/**
 * [CourseLookup description]
 */
CourseJS.CourseLookup = class CourseInfo {
    /**
     * [constructor description]
     */
    constructor () {
        this.aliasMap = {};
        this.dictionary = {};
    }

    /**
     * [insertCourse description]
     * @param {Course} course [description]
     * @return {boolean} [description]
     */
    insertCourse (course) {
        //TODO: Implement Function
    }

    /**
     * [getCourseByAlias description]
     * @param {String} alias [description]
     * @return {Course} [description]
     */
    getCourseByAlias (alias) {
        //TODO: Implement Function
    }

    /**
     * [findCourseGroup description]
     * @param {Course} course [description]
     * @return {CourseGroup} [description]
     */
    findCourseGroup (course) {
        //TODO: Implement Function
    }

    /**
     * [findMatchingCourses description]
     * @param {SearchQuery} searchQuery [description]
     * @return {Array<Course>} [description]
     */
    findMatchingCourses (searchQuery) {
        //TODO: Implement Function
    }
}

/**
 * [SearchQuery description]
 */
CourseJS.SearchQuery = class CourseInfo {
    /**
     * [constructor description]
     * @param {Object} data [description]
     */
    constructor (data) {
        this.data = data;
        this.formatData();
    }

    /**
     * [formatData description]
     */
    formatData () {
        //TODO: Implement Function
    }
}

/**
 * [generateCourseLookup description]
 * @param {Array<String>} parsedData [description]
 * @return {CourseLookup} [description]
 */
CourseJS.generateCourseLookup = function (courses) {
    //TODO: Implement Function
}

/**
 * [generateScheduleListFromEntries description]
 * @param {Array<Entry>} entryArray [description]
 * @return {Array<Schedule>} [description]
 */
CourseJS.generateScheduleListFromEntries = function (entryArray) {
    //TODO: Implement Function
}