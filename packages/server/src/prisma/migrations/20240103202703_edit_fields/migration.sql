/*
  Warnings:

  - Made the column `foundationDate` on table `Bands` required. This step will fail if there are existing NULL values in that column.
  - Made the column `genre` on table `Tracks` required. This step will fail if there are existing NULL values in that column.
  - Made the column `format` on table `Tracks` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Bands" ALTER COLUMN "foundationDate" SET NOT NULL;

-- AlterTable
ALTER TABLE "Tracks" ALTER COLUMN "genre" SET NOT NULL,
ALTER COLUMN "format" SET NOT NULL;
