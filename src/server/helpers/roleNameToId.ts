export default (name: string) => {
  switch (name) {
    case "administrator":
      return 1;
    case "instructor":
    case "inst":
    case "professor":
    case "prof":
      return 2;
    case "learner":
    case "student":
    case "stu":
      return 3;
    default:
      return -1;
  }
}