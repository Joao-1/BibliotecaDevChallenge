import { NestFactory } from "@nestjs/core";
import logger from "../logs/logger";
import AppModule from "./app.module";
import HttpErrorFilter from "./helpers/nestHelpers/exceptions/errorFilter";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalFilters(new HttpErrorFilter(logger.error));
	await app.listen(3000);
}
bootstrap();
