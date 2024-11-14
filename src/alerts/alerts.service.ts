import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AlertsService {
  constructor(private readonly databaseService: PrismaService) {}

  async create(createAlertDto: Prisma.AlertsMasterCreateInput) {
    return this.databaseService.alertsMaster.create({ data: createAlertDto });
  }

  async createSubscription(createAlertSubscriptionDto: Prisma.AlertsSubscriptionCreateInput) {
    return this.databaseService.alertsSubscription.create({ data: createAlertSubscriptionDto });
  }

  async findAll(entityType?: 'DEVICE' | 'APP') {
    if (entityType)
      return this.databaseService.alertsMaster.findMany({ where: { entityType } });
    return this.databaseService.alertsMaster.findMany();
  }

  async findOne(id: string) {
    return this.databaseService.alertsMaster.findUnique({ where: { id } });
  }

  async update(id: string, updateAlertDto: Prisma.AlertsMasterUpdateInput) {
    return this.databaseService.alertsMaster.update({
      where: { id },
      data: updateAlertDto,
    });
  }

  async remove(id: string) {
    return this.databaseService.alertsMaster.delete({ where: { id } });
  }
}
