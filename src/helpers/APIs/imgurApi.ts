import axios from "axios";
import { readFile } from "fs";
import { promisify } from "util";
import { ServicesProvidersError } from "../nestHelpers/exceptions/errorsExceptions";

export default async function uploadImage(imagePath: string) {
	try {
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
	} catch (error) {
		throw new ServicesProvidersError.ImgurError(error.response.data.data, "bookService");
	}
}
