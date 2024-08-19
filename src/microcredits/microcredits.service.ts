import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createMicrocreditDto } from 'src/dtos/createMicrocredit.dto';
import { Microcredit } from 'src/entities/microcredit.entity';
import { User } from 'src/entities/user.entities';
import { Repository } from 'typeorm';

// Utility functions for calculating the interest
// export interface InterestRateStrategy{
//     calculate(user: User): number;
// }

// @Injectable()
// export class StandardInterestRateStrategy implements InterestRateStrategy{
//     calculate(user: User): number{
//         return user.creditScore > 700 ? 5 : 15;
//     }
// }

// @Injectable()
// export class PremiumInterestRateStrategy implements InterestRateStrategy{
//     calculate(user: User):number{
//         return user.creditScore > 700 ? 3 : 10;
//     }
// }

// @Injectable()
// export class CreditCalculationService{
//     constructor(private strategy:InterestRateStrategy){}

//     calculateInterestRate(user: User):number{
//         return this.strategy.calculate(user);
//     }
// }

@Injectable()
export class CreditCalculationService{
    calculateInterestRate(user: User):number{
        return user.creditScore > 700 ? 5 : 15;
    }
}

// Main services
@Injectable()
export class getMicrocreditsService {
    private readonly microcreditRepository: Repository<Microcredit>
    constructor(
        @InjectRepository(Microcredit) microcreditRepository:Repository<Microcredit>
    ){
        this.microcreditRepository = microcreditRepository;
    }

    async getMicroCredits():Promise<Microcredit[]>{
        return await this.microcreditRepository.find()
    }
}

@Injectable()
export class MicrocreditRegistryService{

    constructor(@InjectRepository(Microcredit) private readonly microcreditRepository:Repository<Microcredit>){}

    saveMicrocredit(microcreditData: createMicrocreditDto):Promise<Microcredit>{
        const newMicrocredit = this.microcreditRepository.create(microcreditData)
        return this.microcreditRepository.save(newMicrocredit)
    }
}

@Injectable()
export class MicrocreditsService{
    constructor(
        private getMicrocreditsService:getMicrocreditsService,
        private microcreditRegistryService:MicrocreditRegistryService,
        private creditCalculationService:CreditCalculationService,
        private readonly userRepository:Repository<User>
    ){
        console.log('UserRepository injected:', this.userRepository)
    }

    async getMicrocredits():Promise<Microcredit[]>{
        return await this.getMicrocreditsService.getMicroCredits()
    }

    async createMicrocredit(microcreditData:createMicrocreditDto):Promise<Microcredit>{
        return await this.microcreditRegistryService.saveMicrocredit(microcreditData)
    }

    async applyForMicrocredit(userId: number, amount:number):Promise<Microcredit>{
        const user = await this.userRepository.findOneBy({
            id:userId
        })
        const interestRate = this.creditCalculationService.calculateInterestRate(user)
        return await this.createMicrocredit({
            userId,
            amount,
            interestRate,
            status: 'PENDING',
        })
    }
}