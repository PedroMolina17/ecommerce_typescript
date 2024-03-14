-- AlterTable
ALTER TABLE `Admin` ADD COLUMN `publicIdImage` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `image` VARCHAR(191) NULL,
    ADD COLUMN `publicIdImage` VARCHAR(191) NULL;
