/* eslint-disable no-undef */
import ImgurService from "../../../src/helpers/APIs/imgurApi";

require("dotenv").config({ path: ".env.test" });

describe("ImgurAPI", () => {
	it("should return a link to a valid image by Imgur", async () => {
		const imgurResponse = await new ImgurService().uploadImage(`${__dirname}/../../testHelpers/testeImage.png`);

		expect(imgurResponse).toMatch(/^(ftp|http|https):\/\/[^ "]+$/);
	});

	it("should return a link to a valid image by Imgur", async () => {
		try {
			process.env.CLIENT_ID = "invalid";
			await new ImgurService().uploadImage(`${__dirname}/../../testHelpers/testeImage.png`);
		} catch (error) {
			expect(error.message).toBe("An error occurred while consuming the Imgur service.");
		}
	});
});
