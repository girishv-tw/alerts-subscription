/*
  Warnings:

  - You are about to drop the column `entityType` on the `AlertsMaster` table. All the data in the column will be lost.
  - You are about to drop the column `frequency` on the `AlertsMaster` table. All the data in the column will be lost.
  - The primary key for the `AlertsSubscription` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `AlertsSubscription` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `default_parameters` to the `AlertsMaster` table without a default value. This is not possible if the table is not empty.
  - Added the required column `parameters` to the `AlertsMaster` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AlertsMaster" DROP COLUMN "entityType",
DROP COLUMN "frequency",
ADD COLUMN     "default_parameters" JSONB NOT NULL,
ADD COLUMN     "parameters" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "AlertsSubscription" DROP CONSTRAINT "AlertsSubscription_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "AlertsSubscription_pkey" PRIMARY KEY ("id");
