/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Bands` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Tracks` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Bands` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Tracks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bands" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Tracks" ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Bands_userId_key" ON "Bands"("userId");

-- CreateIndex
CREATE INDEX "idx_userId_band" ON "Bands"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Tracks_userId_key" ON "Tracks"("userId");

-- CreateIndex
CREATE INDEX "idx_userId_track" ON "Tracks"("userId");

-- AddForeignKey
ALTER TABLE "Bands" ADD CONSTRAINT "Bands_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tracks" ADD CONSTRAINT "Tracks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
