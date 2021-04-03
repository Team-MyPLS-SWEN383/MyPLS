-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema MyPLS
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `MyPLS` ;

-- -----------------------------------------------------
-- Schema MyPLS
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `MyPLS` DEFAULT CHARACTER SET utf8 ;
USE `MyPLS` ;

-- -----------------------------------------------------
-- Table `MyPLS`.`Roles`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `MyPLS`.`Roles` ;

CREATE TABLE IF NOT EXISTS `MyPLS`.`Roles` (
  `idRoles` INT NOT NULL,
  `role_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idRoles`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `MyPLS`.`User`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `MyPLS`.`User` ;

CREATE TABLE IF NOT EXISTS `MyPLS`.`User` (
  `idUser` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `Roles_idRoles` INT NOT NULL,
  `FirstName` VARCHAR(45) NOT NULL,
  `LastName` VARCHAR(45) NOT NULL,
  `Email` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idUser`),
  INDEX `fk_User_Roles1_idx` (`Roles_idRoles` ASC),
  CONSTRAINT `fk_User_Roles1`
    FOREIGN KEY (`Roles_idRoles`)
    REFERENCES `MyPLS`.`Roles` (`idRoles`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `MyPLS`.`Courses`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `MyPLS`.`Courses` ;

CREATE TABLE IF NOT EXISTS `MyPLS`.`Courses` (
  `idCourse` INT NOT NULL AUTO_INCREMENT,
  `coursename` VARCHAR(45) NOT NULL,
  `courseCode` VARCHAR(25) NOT NULL,
  `User_idUser` INT NOT NULL,
  PRIMARY KEY (`idCourse`),
  INDEX `fk_Courses_User1_idx` (`User_idUser` ASC),
  CONSTRAINT `fk_Courses_User1`
    FOREIGN KEY (`User_idUser`)
    REFERENCES `MyPLS`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `MyPLS`.`Lecture`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `MyPLS`.`Lecture` ;

CREATE TABLE IF NOT EXISTS `MyPLS`.`Lecture` (
  `idLecture` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NOT NULL,
  `summary` VARCHAR(500) NOT NULL,
  `UnlockDate` DATETIME NOT NULL,
  `Courses_idCourse` INT NOT NULL,
  PRIMARY KEY (`idLecture`),
  INDEX `fk_Lecture_Courses1_idx` (`Courses_idCourse` ASC),
  CONSTRAINT `fk_Lecture_Courses1`
    FOREIGN KEY (`Courses_idCourse`)
    REFERENCES `MyPLS`.`Courses` (`idCourse`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `MyPLS`.`Grades`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `MyPLS`.`Grades` ;

CREATE TABLE IF NOT EXISTS `MyPLS`.`Grades` (
  `idGrades` INT NOT NULL AUTO_INCREMENT,
  `Class_idClass` INT NOT NULL,
  `User_idUser` INT NOT NULL,
  `Average` DECIMAL NOT NULL,
  PRIMARY KEY (`idGrades`),
  INDEX `fk_Grades_Class1_idx` (`Class_idClass` ASC),
  INDEX `fk_Grades_User1_idx` (`User_idUser` ASC),
  CONSTRAINT `fk_Grades_Class1`
    FOREIGN KEY (`Class_idClass`)
    REFERENCES `MyPLS`.`Courses` (`idCourse`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Grades_User1`
    FOREIGN KEY (`User_idUser`)
    REFERENCES `MyPLS`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `MyPLS`.`Ratings`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `MyPLS`.`Ratings` ;

CREATE TABLE IF NOT EXISTS `MyPLS`.`Ratings` (
  `idRatings` INT NOT NULL AUTO_INCREMENT,
  `User_idUser` INT NOT NULL,
  `ratingNumber` INT NOT NULL,
  `Comment` VARCHAR(250) NULL,
  PRIMARY KEY (`idRatings`),
  INDEX `fk_Ratings_User1_idx` (`User_idUser` ASC),
  CONSTRAINT `fk_Ratings_User1`
    FOREIGN KEY (`User_idUser`)
    REFERENCES `MyPLS`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `MyPLS`.`Group`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `MyPLS`.`Group` ;

CREATE TABLE IF NOT EXISTS `MyPLS`.`Group` (
  `idGroup` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(45) NOT NULL,
  `Description` VARCHAR(45) NULL,
  PRIMARY KEY (`idGroup`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `MyPLS`.`Discussions`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `MyPLS`.`Discussions` ;

CREATE TABLE IF NOT EXISTS `MyPLS`.`Discussions` (
  `idDiscussions` INT NOT NULL AUTO_INCREMENT,
  `Discussion_Title` VARCHAR(45) NOT NULL,
  `Summary` VARCHAR(45) NOT NULL,
  `Group_idGroup` INT NOT NULL,
  PRIMARY KEY (`idDiscussions`),
  INDEX `fk_Discussions_Group1_idx` (`Group_idGroup` ASC),
  CONSTRAINT `fk_Discussions_Group1`
    FOREIGN KEY (`Group_idGroup`)
    REFERENCES `MyPLS`.`Group` (`idGroup`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `MyPLS`.`Classlist`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `MyPLS`.`Classlist` ;

CREATE TABLE IF NOT EXISTS `MyPLS`.`Classlist` (
  `idClasslist` INT NOT NULL AUTO_INCREMENT,
  `User_idUser` INT NOT NULL,
  `Class_idClass` INT NOT NULL,
  PRIMARY KEY (`idClasslist`),
  INDEX `fk_Classlist_User1_idx` (`User_idUser` ASC),
  INDEX `fk_Classlist_Class1_idx` (`Class_idClass` ASC),
  CONSTRAINT `fk_Classlist_User1`
    FOREIGN KEY (`User_idUser`)
    REFERENCES `MyPLS`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Classlist_Class1`
    FOREIGN KEY (`Class_idClass`)
    REFERENCES `MyPLS`.`Courses` (`idCourse`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `MyPLS`.`Post`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `MyPLS`.`Post` ;

CREATE TABLE IF NOT EXISTS `MyPLS`.`Post` (
  `idPost` INT NOT NULL AUTO_INCREMENT,
  `Title` VARCHAR(45) NOT NULL,
  `Content` VARCHAR(500) NOT NULL,
  `Discussions_idDiscussions` INT NOT NULL,
  `User_idUser` INT NOT NULL,
  PRIMARY KEY (`idPost`),
  INDEX `fk_Post_Discussions1_idx` (`Discussions_idDiscussions` ASC),
  INDEX `fk_Post_User1_idx` (`User_idUser` ASC),
  CONSTRAINT `fk_Post_Discussions1`
    FOREIGN KEY (`Discussions_idDiscussions`)
    REFERENCES `MyPLS`.`Discussions` (`idDiscussions`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Post_User1`
    FOREIGN KEY (`User_idUser`)
    REFERENCES `MyPLS`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `MyPLS`.`MemberList`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `MyPLS`.`MemberList` ;

CREATE TABLE IF NOT EXISTS `MyPLS`.`MemberList` (
  `idMemberList` INT NOT NULL AUTO_INCREMENT,
  `Group_idGroup` INT NOT NULL,
  `User_idUser` INT NOT NULL,
  PRIMARY KEY (`idMemberList`),
  INDEX `fk_MemberList_Group1_idx` (`Group_idGroup` ASC),
  INDEX `fk_MemberList_User1_idx` (`User_idUser` ASC),
  CONSTRAINT `fk_MemberList_Group1`
    FOREIGN KEY (`Group_idGroup`)
    REFERENCES `MyPLS`.`Group` (`idGroup`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `fk_MemberList_User1`
    FOREIGN KEY (`User_idUser`)
    REFERENCES `MyPLS`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `MyPLS`.`Content`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `MyPLS`.`Content` ;

CREATE TABLE IF NOT EXISTS `MyPLS`.`Content` (
  `idContent` INT NOT NULL AUTO_INCREMENT,
  `ContentLink` VARCHAR(100) NOT NULL,
  `Lecture_idLecture` INT NOT NULL,
  PRIMARY KEY (`idContent`),
  INDEX `fk_Content_Lecture1_idx` (`Lecture_idLecture` ASC),
  CONSTRAINT `fk_Content_Lecture1`
    FOREIGN KEY (`Lecture_idLecture`)
    REFERENCES `MyPLS`.`Lecture` (`idLecture`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `MyPLS`.`Quiz`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `MyPLS`.`Quiz` ;

CREATE TABLE IF NOT EXISTS `MyPLS`.`Quiz` (
  `idQuiz` INT NOT NULL AUTO_INCREMENT,
  `Title` VARCHAR(45) NOT NULL,
  `StartTime` DATETIME NOT NULL,
  `EndTime` DATETIME NOT NULL,
  `Lecture_idLecture` INT NOT NULL,
  PRIMARY KEY (`idQuiz`),
  INDEX `fk_Quiz_Lecture1_idx` (`Lecture_idLecture` ASC),
  CONSTRAINT `fk_Quiz_Lecture1`
    FOREIGN KEY (`Lecture_idLecture`)
    REFERENCES `MyPLS`.`Lecture` (`idLecture`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `MyPLS`.`Question`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `MyPLS`.`Question` ;

CREATE TABLE IF NOT EXISTS `MyPLS`.`Question` (
  `idQuestions` INT NOT NULL,
  `Question` VARCHAR(45) NOT NULL,
  `Quiz_idQuiz` INT NOT NULL,
  PRIMARY KEY (`idQuestions`),
  INDEX `fk_Question_Quiz1_idx` (`Quiz_idQuiz` ASC),
  CONSTRAINT `fk_Question_Quiz1`
    FOREIGN KEY (`Quiz_idQuiz`)
    REFERENCES `MyPLS`.`Quiz` (`idQuiz`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `MyPLS`.`QuizChoice`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `MyPLS`.`QuizChoice` ;

CREATE TABLE IF NOT EXISTS `MyPLS`.`QuizChoice` (
  `idQuizChoice` INT NOT NULL AUTO_INCREMENT,
  `Text` VARCHAR(100) NOT NULL,
  `Answer` INT NOT NULL,
  `Question_idQuestions` INT NOT NULL,
  PRIMARY KEY (`idQuizChoice`),
  INDEX `fk_QuizChoice_Question1_idx` (`Question_idQuestions` ASC),
  CONSTRAINT `fk_QuizChoice_Question1`
    FOREIGN KEY (`Question_idQuestions`)
    REFERENCES `MyPLS`.`Question` (`idQuestions`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `MyPLS`.`Roles`
-- -----------------------------------------------------
START TRANSACTION;
USE `MyPLS`;
INSERT INTO `MyPLS`.`Roles` (`idRoles`, `role_name`) VALUES (1, 'admin');
INSERT INTO `MyPLS`.`Roles` (`idRoles`, `role_name`) VALUES (2, 'professor');
INSERT INTO `MyPLS`.`Roles` (`idRoles`, `role_name`) VALUES (3, 'student');

COMMIT;


-- -----------------------------------------------------
-- Data for table `MyPLS`.`User`
-- -----------------------------------------------------
START TRANSACTION;
USE `MyPLS`;
INSERT INTO `MyPLS`.`User` (`idUser`, `username`, `password`, `Roles_idRoles`, `FirstName`, `LastName`, `Email`) VALUES (1, 'prof123', 'pass', 2, 'test', 'prof', 'testprof123@rit.edu');
INSERT INTO `MyPLS`.`User` (`idUser`, `username`, `password`, `Roles_idRoles`, `FirstName`, `LastName`, `Email`) VALUES (2, 'stu123', 'stu', 3, 'test', 'stu', 'teststu123@rit.edu');
INSERT INTO `MyPLS`.`User` (`idUser`, `username`, `password`, `Roles_idRoles`, `FirstName`, `LastName`, `Email`) VALUES (3, 'manager', 'admin', 1, 'admin', 'test', 'admintest@rit.edu');

COMMIT;


-- -----------------------------------------------------
-- Data for table `MyPLS`.`Courses`
-- -----------------------------------------------------
START TRANSACTION;
USE `MyPLS`;
INSERT INTO `MyPLS`.`Courses` (`idCourse`, `coursename`, `courseCode`, `User_idUser`) VALUES (1, 'Software Design Principles', 'SWEN-383', 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `MyPLS`.`Lecture`
-- -----------------------------------------------------
START TRANSACTION;
USE `MyPLS`;
INSERT INTO `MyPLS`.`Lecture` (`idLecture`, `title`, `summary`, `UnlockDate`, `Courses_idCourse`) VALUES (1, 'Syllabus Review', 'In this lecture we will be going over the syllabus and what is expected from students', '2021-04-06 12:40', 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `MyPLS`.`Ratings`
-- -----------------------------------------------------
START TRANSACTION;
USE `MyPLS`;
INSERT INTO `MyPLS`.`Ratings` (`idRatings`, `User_idUser`, `ratingNumber`, `Comment`) VALUES (1, 1, 10, 'Best professor at RIT');

COMMIT;


-- -----------------------------------------------------
-- Data for table `MyPLS`.`Group`
-- -----------------------------------------------------
START TRANSACTION;
USE `MyPLS`;
INSERT INTO `MyPLS`.`Group` (`idGroup`, `Name`, `Description`) VALUES (1, 'SWEN Group Project', 'Discussion board for SWEN project');

COMMIT;


-- -----------------------------------------------------
-- Data for table `MyPLS`.`Discussions`
-- -----------------------------------------------------
START TRANSACTION;
USE `MyPLS`;
INSERT INTO `MyPLS`.`Discussions` (`idDiscussions`, `Discussion_Title`, `Summary`, `Group_idGroup`) VALUES (1, 'Sprint Assistance', 'Need help with your sprint? Ask here!', 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `MyPLS`.`Classlist`
-- -----------------------------------------------------
START TRANSACTION;
USE `MyPLS`;
INSERT INTO `MyPLS`.`Classlist` (`idClasslist`, `User_idUser`, `Class_idClass`) VALUES (1, 1, 1);
INSERT INTO `MyPLS`.`Classlist` (`idClasslist`, `User_idUser`, `Class_idClass`) VALUES (2, 2, 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `MyPLS`.`Post`
-- -----------------------------------------------------
START TRANSACTION;
USE `MyPLS`;
INSERT INTO `MyPLS`.`Post` (`idPost`, `Title`, `Content`, `Discussions_idDiscussions`, `User_idUser`) VALUES (1, 'Course Creation Help', 'Need help with creating courses. Any one able to help?', 1, 2);

COMMIT;


-- -----------------------------------------------------
-- Data for table `MyPLS`.`MemberList`
-- -----------------------------------------------------
START TRANSACTION;
USE `MyPLS`;
INSERT INTO `MyPLS`.`MemberList` (`idMemberList`, `Group_idGroup`, `User_idUser`) VALUES (1, 1, 2);
INSERT INTO `MyPLS`.`MemberList` (`idMemberList`, `Group_idGroup`, `User_idUser`) VALUES (2, 1, 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `MyPLS`.`Content`
-- -----------------------------------------------------
START TRANSACTION;
USE `MyPLS`;
INSERT INTO `MyPLS`.`Content` (`idContent`, `ContentLink`, `Lecture_idLecture`) VALUES (1, 'https://www.youtube.com/watch?v=gbQS1ExSeBQ', 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `MyPLS`.`Quiz`
-- -----------------------------------------------------
START TRANSACTION;
USE `MyPLS`;
INSERT INTO `MyPLS`.`Quiz` (`idQuiz`, `Title`, `StartTime`, `EndTime`, `Lecture_idLecture`) VALUES (1, 'Syllabus Check', '2021-04-06 12:40', '2021-04-08 23:59', 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `MyPLS`.`Question`
-- -----------------------------------------------------
START TRANSACTION;
USE `MyPLS`;
INSERT INTO `MyPLS`.`Question` (`idQuestions`, `Question`, `Quiz_idQuiz`) VALUES (1, 'Is plagarism bad?', 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `MyPLS`.`QuizChoice`
-- -----------------------------------------------------
START TRANSACTION;
USE `MyPLS`;
INSERT INTO `MyPLS`.`QuizChoice` (`idQuizChoice`, `Text`, `Answer`, `Question_idQuestions`) VALUES (1, 'Yes', 1, 1);
INSERT INTO `MyPLS`.`QuizChoice` (`idQuizChoice`, `Text`, `Answer`, `Question_idQuestions`) VALUES (2, 'Of course not', 0, 1);

COMMIT;

