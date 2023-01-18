import { PromptService } from "./core/prompt/prompt.service";
import { FfmpegExecutor } from "./commands/ffmpeg/ffmpeg.executor";
import { ConsoleLogger } from "./out/console-logger/console-logger";
import { DirExecutor } from "./commands/dir/dir.executor";

export class App {
	async run() {
		await new DirExecutor(ConsoleLogger.getInstance()).execute();
	}
}

const app = new App()
app.run()