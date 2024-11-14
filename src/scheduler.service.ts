import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Agenda } from 'agenda';

@Injectable()
export class SchedulerService implements OnModuleInit {
  private agenda: Agenda;

  constructor(private readonly prisma: PrismaService) {
    this.agenda = new Agenda({
      db: {
        address: 'mongodb://localhost:27017/agenda', // MongoDB address for storing agenda jobs
        collection: 'jobs',
      },
    });
  }

  async onModuleInit() {
    this.agenda.define('check frequency condition', async (job) => {
      const subscriptions = await this.prisma.alertsSubscription.findMany({
        include: { alert: true },
      });

      subscriptions.forEach(async (subscription) => {
        const now = new Date();
        const frequencyConditionMet = this.checkFrequencyCondition(subscription, now);
        
        if (frequencyConditionMet) {
          await this.triggerEmptyFunction(subscription);
        }
      });
    });

    await this.agenda.start();

    await this.agenda.every('1 minute', 'check frequency condition');
  }

  private checkFrequencyCondition(subscription, currentTime: Date): boolean {
      if (subscription && !subscription.lastExecutedAt) {
          return true;
    }
    const timeDiff = currentTime.getTime() - new Date(subscription.lastExecutedAt).getTime();
    const frequency = subscription.alert.frequency;
    var frequencyInMins = 1 * 60 * 10000  // 1 min = 1 * 60 * 1000
    if (frequency === 'hourly') {
        frequencyInMins = 2 * 60 * 1000   // 1 hour = 1 * 60 * 60 * 1000 ms
    }
    else if (frequency === 'daily') {
        frequencyInMins = 4 * 60 * 1000  // 1 day = 1 * 24 * 60 * 60 * 1000 ms
    }
    else if (frequency === 'weekly') {
        frequencyInMins = 6 * 60 * 1000 // 1 week = 1 * 7 * 24 * 60 * 60 * 1000 ms
    }
    return timeDiff >= frequencyInMins;
  }

  private async triggerEmptyFunction(subscription) {
    console.log(`Triggered empty function for subscription ${subscription.id}`);
    await this.prisma.alertsSubscription.update({
      where: { id: subscription.id },
      data: { lastExecutedAt: new Date() },
    });
  }
}
