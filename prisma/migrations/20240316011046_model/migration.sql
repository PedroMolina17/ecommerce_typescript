/*
  Warnings:

  - You are about to drop the column `image` on the `Products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Products` DROP COLUMN `image`,
    ADD COLUMN `active` BOOLEAN NOT NULL DEFAULT true,
    MODIFY `promotion` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `promotionPrice` DOUBLE NULL;

-- CreateTable
CREATE TABLE `ImageProduct` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productId` INTEGER NOT NULL,
    `imageProduct` VARCHAR(191) NOT NULL,
    `publicIdImage` VARCHAR(191) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VariantImageProduct` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `imageProductId` INTEGER NOT NULL,
    `productId` INTEGER NOT NULL,
    `variantImage` VARCHAR(191) NOT NULL,
    `publicIdImage` VARCHAR(191) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ImageProduct` ADD CONSTRAINT `ImageProduct_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
