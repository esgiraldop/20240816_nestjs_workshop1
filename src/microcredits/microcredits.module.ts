import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Microcredit } from 'src/entities/microcredit.entity';
import { getMicrocreditsService, MicrocreditRegistryService, MicrocreditsService } from './microcredits.service';
import { MicrocreditsController } from './microcredits.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Microcredit])],
    controllers: [MicrocreditsController],
    providers: [MicrocreditsService, getMicrocreditsService, MicrocreditRegistryService]
})
export class MicrocreditsModule {};
