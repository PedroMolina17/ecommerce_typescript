/*
  Warnings:

  - You are about to drop the `Reviews` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Reviews` DROP FOREIGN KEY `Reviews_productId_fkey`;

-- DropForeignKey
ALTER TABLE `Reviews` DROP FOREIGN KEY `Reviews_userId_fkey`;

-- DropTable
DROP TABLE `Reviews`;
