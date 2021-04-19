import * as courses from './courses';
import * as discussions from './discussions';
import * as role from './role';
import * as users from './users';
import * as groups from './groups';
import * as lectures from './lectures';
import * as quizzes from './quizzes';

export default {
  ...courses,
  ...discussions,
  ...role,
  ...users,
  ...groups,
  ...lectures,
  ...quizzes
}