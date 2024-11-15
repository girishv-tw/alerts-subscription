import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SubscriptionService {
  constructor(private readonly prisma: PrismaService) {}

  async createSubscription(createAlertSubscriptionDto: Prisma.AlertsSubscriptionCreateInput) {
    return this.prisma.alertsSubscription.create({ data: createAlertSubscriptionDto });
  }

  async findSubscribedAlertsForUserAndOrg(orgId?: string | undefined, userId?: string | undefined) {
    console.log(`ORG ID : ${orgId}, USERID : ${userId}`)
    const whereClause: { orgId?: string; userId?: string } = {};
    if (orgId) {
      whereClause.orgId = orgId;
    }
    if (userId) {
      whereClause.userId = userId;
    }
  
    return this.prisma.alertsSubscription.findMany({
      where: Object.keys(whereClause).length ? whereClause : undefined,
    });
  }

  async findAllSubscriptions() {
    return this.prisma.alertsSubscription.findMany();
  }
}
