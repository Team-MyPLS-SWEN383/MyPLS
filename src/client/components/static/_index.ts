import * as courses from './courses';
import * as discussions from './discussions';
import * as role from './role';
import * as users from './users';

export default {
  ...courses,
  ...discussions,
  ...role,
  ...users
}