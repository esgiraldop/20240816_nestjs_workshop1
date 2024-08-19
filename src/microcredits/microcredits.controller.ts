import { Body, Controller, Get, Post } from '@nestjs/common';
import { MicrocreditsService } from './microcredits.service';
import { Microcredit } from 'src/entities/microcredit.entity';
import { createMicrocreditDto } from 'src/dtos/createMicrocredit.dto';

@Controller('microcredits')
export class MicrocreditsController {
    private readonly microcreditsService: MicrocreditsService
    
    constructor(microcreditsService: MicrocreditsService){
        this.microcreditsService = microcreditsService;
    }

    @Get()
    async getMicrocredits():Promise<Microcredit[]>{
        return await this.microcreditsService.getMicrocredits()
    }

    @Post()
    async createMicrocredit(@Body() microcreditData:createMicrocreditDto):Promise<Microcredit>{
        return await this.microcreditsService.createMicrocredit(microcreditData)
    }
}
