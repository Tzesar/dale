import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    lastName: string;

    constructor(id: number, name: string, lastName: string) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
    }
}
