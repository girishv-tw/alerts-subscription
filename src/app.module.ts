import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { SchedulerService } from './scheduler.service';

@Module({
  providers: [PrismaService, SchedulerService],
})
export class AppModule {}
