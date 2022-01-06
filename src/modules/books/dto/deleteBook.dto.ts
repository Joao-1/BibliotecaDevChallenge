import { IsNumberString } from "class-validator";

export default class DeleteBookDtoParam {
	@IsNumberString()
	id: number;
}
