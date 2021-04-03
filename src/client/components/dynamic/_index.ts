import * as usersOfRole from './usersOfRole';
import * as courseOrGroupAddForm from './courseOrGroupAdd';
import * as courseOrGroupModify from './courseOrGroupModify';
import * as userOrCourseDelete from './UCDDelete';

export default {
  ...usersOfRole,
  ...courseOrGroupAddForm,
  ...courseOrGroupModify,
  ...userOrCourseDelete
}