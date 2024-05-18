/*
  Warnings:

  - Added the required column `totalItemPrice` to the `CartItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unitPrice` to the `CartItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `CartItem` ADD COLUMN `totalItemPrice` DOUBLE NOT NULL,
    ADD COLUMN `unitPrice` DOUBLE NOT NULL;
