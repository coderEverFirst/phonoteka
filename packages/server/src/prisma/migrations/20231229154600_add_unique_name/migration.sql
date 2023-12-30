/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Bands` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Tracks` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Bands_name_key" ON "Bands"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Tracks_name_key" ON "Tracks"("name");
