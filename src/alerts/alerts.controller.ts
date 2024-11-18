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
        default_parameters: {
          type: 'object',
          properties: {
            entity_type: { type: 'string', example: 'DEVICE' },
            frequency: { type: 'string', example: 'DAILY' },
          },
        },
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
  findAll() {
    return this.alertsService.findAll();
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
        name: { type: 'string', example: 'MacBook Alert' },
        description: { type: 'string', example: 'Device is 3 years old' },
        default_parameters: {
          type: 'object',
          properties: {
            entity_type: { type: 'string', example: 'DEVICE' },
            frequency: { type: 'string', example: 'DAILY' },
          },
        },
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
