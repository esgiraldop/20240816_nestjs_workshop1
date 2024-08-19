import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { FinancialRecord } from "./financialRecord.entity";
import { Microcredit } from "./microcredit.entity";

@Entity('users')
export class User{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    creditScore!: number;

    @OneToMany(() => FinancialRecord, (financialRecord) => financialRecord.user)
    financialRecord: FinancialRecord[];

    @OneToMany(() => Microcredit, (microcredit) => microcredit.user)
    microcredit: Microcredit;
}