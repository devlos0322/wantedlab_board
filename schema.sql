-- -----------------------------------------------------
-- Schema wanted_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `wanted_db` DEFAULT CHARACTER SET utf8 ;
USE `wanted_db` ;

-- -----------------------------------------------------
-- Table `wanted_db`.`post_tb`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wanted_db`.`post_tb` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(200) NOT NULL,
  `content` TEXT NOT NULL,
  `author` CHAR(20) NOT NULL,
  `password` VARCHAR(20) NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `wanted_db`.`comment_tb`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wanted_db`.`comment_tb` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `post_id` INT NOT NULL,
  `comment_content` TINYTEXT NOT NULL,
  `author` CHAR(20) NOT NULL,
  `parent_id` INT,
  `depth` TINYINT(0) NOT NULL,
  `created_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `post_id_idx` (`post_id` ASC),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  CONSTRAINT `post_id`
    FOREIGN KEY (`post_id`)
    REFERENCES `wanted_db`.`post_tb` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `parent_id`
    FOREIGN KEY (`parent_id`)
    REFERENCES `wanted_db`.`comment_tb` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;