import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createMicrocreditDto } from 'src/dtos/createMicrocredit.dto';
import { Microcredit } from 'src/entities/microcredit.entity';
import { User } from 'src/entities/user.entities';
import { Repository } from 'typeorm';

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
export class CreditCalculationService{
    calculateInterestRate(user: User):number{
        return user.creditScore > 700 ? 5 : 15;
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
        private microcreditRegistryService:MicrocreditRegistryService
    ){}

    async getMicrocredits():Promise<Microcredit[]>{
        return await this.getMicrocreditsService.getMicroCredits()
    }

    async createMicrocredit(microcreditData:createMicrocreditDto):Promise<Microcredit>{
        return await this.microcreditRegistryService.saveMicrocredit(microcreditData)
    }
}