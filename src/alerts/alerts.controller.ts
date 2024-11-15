import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { AlertsService } from './alerts.service';
import { Prisma } from '@prisma/client';
import { ApiBody, ApiQuery } from '@nestjs/swagger';

@Controller('alerts')
export class AlertsController {
  constructor(private readonly alertsService: AlertsService) {}

  @Post()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'MacBook Alert' },
        description: { type: 'string', example: 'Device is 3 years old' },
        entityType: { type: 'string', example: 'DEVICE' },
        frequency: { type: 'string', example: 'daily' },
      },
    },
  })
  create(@Body() createAlertDto: Prisma.AlertsMasterCreateInput) {
    return this.alertsService.create(createAlertDto);
  }

  @Get()
  @ApiQuery({
    name: 'entityType',
    type: String,
    description: 'entityType',
    required: false,
  })
  findAll(@Query('entityType') entityType?: 'DEVICE' | 'APP') {
    return this.alertsService.findAll(entityType);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.alertsService.findOne(id);
  }

  @Patch(':id')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Google workspace', nullable: true },
        description: {
          type: 'string',
          example: 'License expires in 10 days',
          nullable: true,
        },
        entityType: { type: 'string', example: 'APP', nullable: true },
        frequency: { type: 'string', example: 'weekly', nullable: true },
      },
    },
  })
  update(
    @Param('id') id: string,
    @Body() updateAlertDto: Prisma.AlertsMasterUpdateInput,
  ) {
    return this.alertsService.update(id, updateAlertDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.alertsService.remove(id);
  }
}
