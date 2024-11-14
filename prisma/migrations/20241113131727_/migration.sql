-- CreateTable
CREATE TABLE "AlertsMaster" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "frequency" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AlertsMaster_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AlertsSubscription" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "alertId" TEXT NOT NULL,
    "lastExecutedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AlertsSubscription_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AlertsSubscription" ADD CONSTRAINT "AlertsSubscription_alertId_fkey" FOREIGN KEY ("alertId") REFERENCES "AlertsMaster"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
