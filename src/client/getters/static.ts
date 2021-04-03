let courseCache;
export const getCourses = async () => {
  return courseCache = courseCache || await (await fetch("/courses", {
    method: "GET"
  })).json();
}

let discussionCache;
export const getDiscussions = async () => {
  return discussionCache = discussionCache || await (await fetch("/discussions", {
    method: "GET"
  })).json();
}

let roleCache;
export const getRoles = async () => {
  return roleCache = roleCache || await (await fetch("/roles", {
    method: "GET"
  })).json();
}

let userCache;
export const getUsers = async () => {
  return userCache = userCache || await (await fetch("/users", {
    method: "GET"
  })).json();
}

let groupCache;
export const getGroups = async () => {
  return groupCache = groupCache || await (await fetch("/groups", {
    method: "GET"
  })).json();
}