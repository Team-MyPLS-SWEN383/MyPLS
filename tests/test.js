const { TestScheduler } = require('jest');
const DBConn = require('../db');

test('check if role of user is student',() => {
    expect(DBConn.displayRole('stu123')).toBe('student');
});
//Tests will go here. Deciding testing framework as of 3/3/21