import {
  Controller,
  Get,
  Post,
  Body,
  Query,
} from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { Prisma } from '@prisma/client';
import { ApiBody, ApiQuery } from '@nestjs/swagger';

@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Get()
  @ApiQuery({
    name: 'orgId',
    type: String,
    description: 'Organisation Id',
    required: false,
  })
  @ApiQuery({
    name: 'userId',
    type: String,
    description: 'User Id',
    required: false,
  })
  findSubscribedAlertsForUserAndOrg(
    @Query('orgId') orgId?: string,
    @Query('userId') userId?: string,
  ) {
    console.log(`ORG ID: ${orgId}, USERID: ${userId}`);
    return this.subscriptionService.findSubscribedAlertsForUserAndOrg(orgId, userId);
  }

  @Post()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        alertId: { type: 'string', example: 'ffd4d227-b4af-4974-bd76-812017d1f77d' },
        userId: { type: 'string', example: 'abcd123' },
        orgId: { type: 'string', example: '123' },
        parameters: {
          type: 'object',
          properties: {
            entity_type: { type: 'string', example: 'DEVICE' },
            frequency: { type: 'string', example: 'DAILY' },
          },
        },
      },
    },
  })
  createSubscription(@Body() createAlertSubscriptionDto: Prisma.AlertsSubscriptionCreateInput) {
    return this.subscriptionService.createSubscription(createAlertSubscriptionDto);
  }

}
