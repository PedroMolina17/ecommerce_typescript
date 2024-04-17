/*
  Warnings:

  - A unique constraint covering the columns `[productId]` on the table `ProductCoverImage` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `ProductCoverImage_productId_key` ON `ProductCoverImage`(`productId`);
