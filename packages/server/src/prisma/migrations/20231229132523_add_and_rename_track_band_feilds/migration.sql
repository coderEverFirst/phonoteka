/*
  Warnings:

  - Added the required column `members` to the `Bands` table without a default value. This is not possible if the table is not empty.
  - Added the required column `album` to the `Tracks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bands" ADD COLUMN     "about" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "members" TEXT NOT NULL,
ALTER COLUMN "genre" SET NOT NULL,
ALTER COLUMN "genre" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Tracks" ADD COLUMN     "album" TEXT NOT NULL;
