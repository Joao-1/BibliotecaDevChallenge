import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Book {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@Column()
	publishingCompany: string;

	@Column()
	imgURL: string;

	@Column()
	authors: string;
}
