import { IsArray, IsString } from "class-validator";

export default class CreateBookDtoBody {
	@IsString()
	title: string;

	@IsString()
	publishingCompany: string;

	@IsArray()
	authors: string[];
}
