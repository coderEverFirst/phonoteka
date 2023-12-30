/*
  Warnings:

  - You are about to drop the column `description` on the `Tracks` table. All the data in the column will be lost.
  - You are about to drop the column `releaseDate` on the `Tracks` table. All the data in the column will be lost.
  - You are about to drop the column `videoUrl` on the `Tracks` table. All the data in the column will be lost.
  - Added the required column `year` to the `Tracks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tracks" DROP COLUMN "description",
DROP COLUMN "releaseDate",
DROP COLUMN "videoUrl",
ADD COLUMN     "url" TEXT,
ADD COLUMN     "year" TIMESTAMP(3) NOT NULL;
