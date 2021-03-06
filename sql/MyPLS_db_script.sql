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
-- Table `MyPLS`.`Class`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `MyPLS`.`Class` ;

CREATE TABLE IF NOT EXISTS `MyPLS`.`Class` (
  `idClass` INT NOT NULL AUTO_INCREMENT,
  `class_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idClass`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `MyPLS`.`Lecture`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `MyPLS`.`Lecture` ;

CREATE TABLE IF NOT EXISTS `MyPLS`.`Lecture` (
  `idLecture` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NOT NULL,
  `content` VARCHAR(500) NOT NULL,
  `Class_idClass` INT NOT NULL,
  PRIMARY KEY (`idLecture`),
  INDEX `fk_Lecture_Class1_idx` (`Class_idClass` ASC),
  CONSTRAINT `fk_Lecture_Class1`
    FOREIGN KEY (`Class_idClass`)
    REFERENCES `MyPLS`.`Class` (`idClass`)
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
    REFERENCES `MyPLS`.`Class` (`idClass`)
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
  `User_Roles_idRoles` INT NOT NULL,
  `ratingNumber` INT NOT NULL,
  PRIMARY KEY (`idRatings`),
  INDEX `fk_Ratings_User1_idx` (`User_idUser` ASC, `User_Roles_idRoles` ASC),
  CONSTRAINT `fk_Ratings_User1`
    FOREIGN KEY (`User_idUser`)
    REFERENCES `MyPLS`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `MyPLS`.`Groups`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `MyPLS`.`Groups` ;

CREATE TABLE IF NOT EXISTS `MyPLS`.`Groups` (
  `idGroups` INT NOT NULL AUTO_INCREMENT,
  `Class_idClass` INT NOT NULL,
  `Name` VARCHAR(45) NOT NULL,
  `Class_idClass1` INT NOT NULL,
  PRIMARY KEY (`idGroups`, `Class_idClass`),
  INDEX `fk_Groups_Class1_idx` (`Class_idClass1` ASC),
  CONSTRAINT `fk_Groups_Class1`
    FOREIGN KEY (`Class_idClass1`)
    REFERENCES `MyPLS`.`Class` (`idClass`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `MyPLS`.`Discussions`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `MyPLS`.`Discussions` ;

CREATE TABLE IF NOT EXISTS `MyPLS`.`Discussions` (
  `idDiscussions` INT NOT NULL AUTO_INCREMENT,
  `Class_idClass` INT NOT NULL,
  PRIMARY KEY (`idDiscussions`, `Class_idClass`),
  INDEX `fk_Discussions_Class1_idx` (`Class_idClass` ASC),
  CONSTRAINT `fk_Discussions_Class1`
    FOREIGN KEY (`Class_idClass`)
    REFERENCES `MyPLS`.`Class` (`idClass`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `MyPLS`.`Posts`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `MyPLS`.`Posts` ;

CREATE TABLE IF NOT EXISTS `MyPLS`.`Posts` (
  `idPosts` INT NOT NULL AUTO_INCREMENT,
  `Discussions_idDiscussions` INT NOT NULL,
  `title` VARCHAR(45) NOT NULL,
  `content` VARCHAR(500) NOT NULL,
  `User_idUser` INT NOT NULL,
  PRIMARY KEY (`idPosts`, `Discussions_idDiscussions`),
  INDEX `fk_Posts_Discussions1_idx` (`Discussions_idDiscussions` ASC),
  INDEX `fk_Posts_User1_idx` (`User_idUser` ASC),
  CONSTRAINT `fk_Posts_Discussions1`
    FOREIGN KEY (`Discussions_idDiscussions`)
    REFERENCES `MyPLS`.`Discussions` (`idDiscussions`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Posts_User1`
    FOREIGN KEY (`User_idUser`)
    REFERENCES `MyPLS`.`User` (`idUser`)
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
    REFERENCES `MyPLS`.`Class` (`idClass`)
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

