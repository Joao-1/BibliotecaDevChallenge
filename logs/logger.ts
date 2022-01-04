import { createLogger, format, transports } from "winston";

const { combine, timestamp, prettyPrint, json, printf } = format;

const errorFormat = printf(({ message, ...data }) => {
	const _data = message as unknown as {
		msg: string;
		error: unknown;
		place: string;
		requestDetails: { path: string; method: string };
	};
	return `{timestamp: ${data.timestamp}, message: ${_data.msg}, local: ${_data.place}, requestDetails: {${_data}} details: {${_data.error}}}`;
});

const debug = createLogger({
	levels: {
		debug: 3,
	},
	transports: [
		new transports.File({ filename: "./logs/debug.log", level: "debug" }),
		new transports.Console({ level: "debug" }),
	],
});

const info = createLogger({
	levels: {
		info: 2,
	},
	format: combine(
		timestamp(),
		prettyPrint(),
		printf(({ message }) => {
			return message;
		})
	),
	transports: [new transports.Console()],
});

const warn = createLogger({
	levels: {
		warn: 1,
	},
	transports: [
		new transports.File({ filename: "./logs/warn.log", level: "warn" }),
		new transports.Console({ level: "warn" }),
	],
});

const error = createLogger({
	levels: {
		error: 0,
	},
	format: combine(timestamp(), prettyPrint(), json(), errorFormat),
	transports: [
		new transports.File({ filename: "./logs/error.log", level: "error" }),
		new transports.Console({ level: "error" }),
	],
});

export default {
	debug,
	info,
	warn,
	error,
};
