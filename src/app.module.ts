import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import BooksModule from "./modules/books/books.module";

@Module({
	imports: [TypeOrmModule.forRoot(), BooksModule],
	controllers: [],
	providers: [],
})
export default class AppModule {}
