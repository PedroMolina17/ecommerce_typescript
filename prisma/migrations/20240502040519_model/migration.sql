/*
  Warnings:

  - You are about to drop the column `price` on the `Products` table. All the data in the column will be lost.
  - Added the required column `purchasePrice` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salePrice` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Products` DROP COLUMN `price`,
    ADD COLUMN `purchasePrice` DOUBLE NOT NULL,
    ADD COLUMN `salePrice` DOUBLE NOT NULL;
