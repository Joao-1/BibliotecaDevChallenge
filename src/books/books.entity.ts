import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Book {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	publishingCompany: string;

	@Column()
	imgURL: string;

	@Column()
	authors: string[];
}
