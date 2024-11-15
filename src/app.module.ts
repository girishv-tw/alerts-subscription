import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { SchedulerService } from './scheduler.service';
import { AlertsModule } from './alerts/alerts.module';
import { SubscriptionModule } from './subscription/subscription.module';

@Module({
  imports: [AlertsModule,SubscriptionModule],
  providers: [PrismaService, SchedulerService],
})
export class AppModule {}
