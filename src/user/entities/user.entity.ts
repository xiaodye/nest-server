import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    name: string;

    @Column({
        select: true,
        comment: '用户的密码',
    })
    password: string;

    @Column({ nullable: true })
    age: number;

    @CreateDateColumn({ type: 'timestamp' })
    createTime: Date;

    @Column({
        type: 'enum',
        enum: [1, 2, 3],
        default: 1,
    })
    type: 1 | 2 | 3;

    @Column('simple-array', { nullable: true })
    hobby: string[];

    @Column('simple-json', { nullable: true })
    jsonObj: {
        name: string;
        age: number;
    };
}
