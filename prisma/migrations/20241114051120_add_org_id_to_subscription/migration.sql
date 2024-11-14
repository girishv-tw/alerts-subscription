/*
  Warnings:

  - Added the required column `orgId` to the `AlertsSubscription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AlertsSubscription" ADD COLUMN     "orgId" TEXT NOT NULL;
