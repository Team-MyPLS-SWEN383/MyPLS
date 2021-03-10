import DBManager from "./db";

const main = async () => {
  const DBConn = new DBManager();
  await DBConn.displayRole('stu123');
  console.log(await DBConn.checkNewUser('a'));
}

main();