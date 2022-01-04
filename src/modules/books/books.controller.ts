import {
	Body,
	Controller,
	Delete,
	Get,
	HttpStatus,
	Post,
	Put,
	Res,
	UploadedFile,
	UseInterceptors,
	ValidationPipe,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { randomUUID } from "crypto";
import { Response } from "express";
import { diskStorage } from "multer";
import { extname } from "path";
import { BooksService } from "./books.service";
import { CreateBookDto } from "./dto/createBook.dto";
import { IBook } from "./interfaces/book.interface";

@Controller("books")
export class BooksController {
	constructor(private booksService: BooksService) {}

	@Post()
	@UseInterceptors(
		FileInterceptor("file", {
			storage: diskStorage({
				filename: (req, file, cb) => {
					const filename: string = file.originalname.replace(/\s/g, "") + randomUUID();
					const extension: string = extname(file.originalname);
					cb(null, `${filename}${extension}`);
				},
			}),
		})
	)
	async create(
		@UploadedFile() file: Express.Multer.File,
		@Body(new ValidationPipe()) createBookDto: CreateBookDto,
		@Res() res: Response
	) {
		const imgUrl = await this.booksService.uploadImage(file.path);
		const book = createBookDto as IBook;
		book.imageURL = imgUrl;
		const newBook = await this.booksService.registerBook(book);
		res.status(HttpStatus.CREATED).json({ sucess: "true", book: newBook });
	}

	@Get()
	get() {
		return "books";
	}

	@Put(":id")
	update() {
		return "updated book";
	}

	@Delete(":id")
	delete() {
		return "deleted book";
	}
}
