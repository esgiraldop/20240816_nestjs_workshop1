import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entities";

@Entity('financialRecords')
export class FinancialRecord{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;

    @Column()
    amount: number;
    
    @Column()
    userId: number;

    @ManyToOne(() => User)
    @JoinColumn({name: 'userId'})
    user: User;
}