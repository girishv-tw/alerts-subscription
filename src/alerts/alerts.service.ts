import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AlertsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAlertDto: Prisma.AlertsMasterCreateInput) {
    return this.prisma.alertsMaster.create({ data: createAlertDto });
  }
  
  async findAll() {
    return this.prisma.alertsMaster.findMany();
  }

  async findOne(id: string) {
    return this.prisma.alertsMaster.findUnique({ where: { id } });
  }

  async update(id: string, updateAlertDto: Prisma.AlertsMasterUpdateInput) {
    return this.prisma.alertsMaster.update({
      where: { id },
      data: updateAlertDto,
    });
  }

  async remove(id: string) {
    return this.prisma.alertsMaster.delete({ where: { id } });
  }
}
