import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import axios from "axios";
import { readFile } from "fs";
import { promisify } from "util";
import { Book } from "./books.entity";
import { BookRepository } from "./books.repository";
import { IBook } from "./interfaces/book.interface";

require("dotenv").config();

@Injectable()
export class BooksService {
	constructor(
		@InjectRepository(Book)
		private BooksRepository: BookRepository
	) {}

	async uploadImage(imagePath: string) {
		const { data } = (await axios.post(
			"https://api.imgur.com/3/image",
			{
				image: await promisify(readFile)(imagePath, { encoding: "base64" }),
			},
			{
				headers: {
					Authorization: `Client-ID ${process.env.CLIENT_ID}`,
				},
			}
		)) as { data: { data: { link: string } } };
		return data.data.link;
	}

	async registerBook(book: IBook) {
		if (await this.BooksRepository.checkIfBookAlreadyExists(book.title)) {
			return;
		}
	}
}
