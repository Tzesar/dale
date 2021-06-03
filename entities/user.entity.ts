import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class IncomingEvent {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public rawContent: string;

    @Column()
    public status: string;

    public constructor(id: number, rawContent: string, status: string) {
        this.id = id;
        this.rawContent = rawContent;
        this.status = status;
    }
}
