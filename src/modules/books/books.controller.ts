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
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { randomUUID } from "crypto";
import { Response } from "express";
import { diskStorage } from "multer";
import { extname } from "path";
import { BooksService } from "./books.service";
import { CreateBookDto } from "./dto/createBook.dto";

@Controller("books")
export class BooksController {
	constructor(private booksService: BooksService) {}

	@Post("upload")
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
		@Body() createBookdto: CreateBookDto,
		@Res() res: Response
	) {
		const imgUrl = await this.booksService.uploadImage(file.path);
		res.status(HttpStatus.CREATED).json(imgUrl);
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
