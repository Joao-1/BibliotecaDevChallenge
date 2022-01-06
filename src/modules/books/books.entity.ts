import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Book {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ nullable: false })
	title: string;

	@Column({ nullable: false })
	publishingCompany: string;

	@Column({ nullable: false })
	imageURL: string;

	@Column({ nullable: false })
	authors: string;
}
