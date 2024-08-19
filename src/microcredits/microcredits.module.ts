import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Microcredit } from 'src/entities/microcredit.entity';
// import { CreditCalculationService, getMicrocreditsService, MicrocreditRegistryService, MicrocreditsService, PremiumInterestRateStrategy, StandardInterestRateStrategy 
// } from './microcredits.service';
import { CreditCalculationService, getMicrocreditsService, MicrocreditRegistryService, MicrocreditsService
} from './microcredits.service';
import { MicrocreditsController } from './microcredits.controller';
import { User } from 'src/entities/user.entities';

@Module({
    imports: [TypeOrmModule.forFeature([Microcredit, User])],
    controllers: [MicrocreditsController],
    // providers: [
    //     MicrocreditsService,
    //     getMicrocreditsService, 
    //     MicrocreditRegistryService,
    //     CreditCalculationService,
    //     StandardInterestRateStrategy,
    //     PremiumInterestRateStrategy,
    // ],
    providers: [
        MicrocreditsService,
        getMicrocreditsService, 
        MicrocreditRegistryService,
        CreditCalculationService,
    ]
})
export class MicrocreditsModule {};
