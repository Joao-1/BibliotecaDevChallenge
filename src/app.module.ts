import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { BooksModule } from "./modules/books/books.module";

@Module({
	imports: [TypeOrmModule.forRoot(), BooksModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
