import { IStreamLogger } from "../../core/handlers/stream-logger.types";

export class ConsoleLogger implements IStreamLogger {
	private static logger: ConsoleLogger;

	public static getInstance() {
		if (!ConsoleLogger.logger) {
			ConsoleLogger.logger = new ConsoleLogger();
		}
		return ConsoleLogger.logger
	}

	log(args: any[]) {
		console.log(...args)
	}

	error(args: any[]) {
		console.log(...args)
	}

	end() {
		console.log('End')
	}
}