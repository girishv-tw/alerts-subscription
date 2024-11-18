/*
  Warnings:

  - You are about to drop the column `parameters` on the `AlertsMaster` table. All the data in the column will be lost.
  - Added the required column `parameters` to the `AlertsSubscription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AlertsMaster" DROP COLUMN "parameters";

-- AlterTable
ALTER TABLE "AlertsSubscription" ADD COLUMN     "parameters" JSONB NOT NULL;
