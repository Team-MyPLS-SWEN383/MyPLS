-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema MyPLS
-- -----------------------------------------------------

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
-- Table `MyPLS`.`Courses`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `MyPLS`.`Courses` ;

CREATE TABLE IF NOT EXISTS `MyPLS`.`Courses` (
  `idCourse` INT NOT NULL AUTO_INCREMENT,
  `coursename` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idCourse`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `MyPLS`.`Lecture`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `MyPLS`.`Lecture` ;

CREATE TABLE IF NOT EXISTS `MyPLS`.`Lecture` (
  `idLecture` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NOT NULL,
  `content` VARCHAR(500) NOT NULL,
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
-- Table `MyPLS`.`User`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `MyPLS`.`User` ;

CREATE TABLE IF NOT EXISTS `MyPLS`.`User` (
  `idUser` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `Roles_idRoles` INT NOT NULL,
  PRIMARY KEY (`idUser`),
  INDEX `fk_User_Roles1_idx` (`Roles_idRoles` ASC),
  CONSTRAINT `fk_User_Roles1`
    FOREIGN KEY (`Roles_idRoles`)
    REFERENCES `MyPLS`.`Roles` (`idRoles`)
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
  PRIMARY KEY (`idPost`),
  INDEX `fk_Post_Discussions1_idx` (`Discussions_idDiscussions` ASC),
  CONSTRAINT `fk_Post_Discussions1`
    FOREIGN KEY (`Discussions_idDiscussions`)
    REFERENCES `MyPLS`.`Discussions` (`idDiscussions`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
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
INSERT INTO `MyPLS`.`User` (`idUser`, `username`, `password`, `Roles_idRoles`) VALUES (1, 'prof123', 'pass', 2);
INSERT INTO `MyPLS`.`User` (`idUser`, `username`, `password`, `Roles_idRoles`) VALUES (2, 'stu123', 'stu', 3);
INSERT INTO `MyPLS`.`User` (`idUser`, `username`, `password`, `Roles_idRoles`) VALUES (3, 'manager', 'admin', 1);

COMMIT;

