import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entities";

@Entity('microcredits')
export class Microcredit{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    amount: number;

    @Column()
    interestRate: number;

    @Column()
    status: string;

    @ManyToOne(() => User)
    @JoinColumn({name: 'userId'})
    user: User;
}