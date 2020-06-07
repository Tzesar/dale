import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public lastName: string;

    @Column()
    public name: string;

    public constructor(id: number, name: string, lastName: string) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
    }
}
