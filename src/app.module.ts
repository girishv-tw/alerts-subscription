import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { SchedulerService } from './scheduler.service';
import { AlertsModule } from './alerts/alerts.module';

@Module({
  imports: [AlertsModule],
  providers: [PrismaService, SchedulerService],
})
export class AppModule {}
