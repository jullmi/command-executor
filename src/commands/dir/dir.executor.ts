import { PromptService } from "../../core/prompt/prompt.service";
import { IStreamLogger } from "../../core/handlers/stream-logger.types";
import { CommandExecutor } from "../../core/executor/command.executor";
import { DirBuilder } from "./dir.builder";
import { ICommandExec } from "../../core/executor/command.types";
import { StreamHandler } from "../../core/handlers/stream.handler";
import { ChildProcessWithoutNullStreams, spawn } from "child_process";
import { IDirInput } from "./dir.types";

export class DirExecutor extends CommandExecutor<IDirInput>{
	private promptService = new PromptService();
	constructor(logger: IStreamLogger) {
		super(logger)
	}

	protected async prompt(): Promise<IDirInput> {
		const path: string = await this.promptService.input('Path', 'input');
		return {path}
	}

	protected build ({path}: IDirInput): ICommandExec {
		const args = (new DirBuilder()).detailedOutput().output()
		return {command: 'ls', args: args.concat(path)}
	}

	protected spawn({command, args}: ICommandExec): ChildProcessWithoutNullStreams {
		return spawn(command as string, args);
	}

	protected processStream(stream: ChildProcessWithoutNullStreams, logger: IStreamLogger) {
		const handler = new StreamHandler(logger)
		handler.processOutput(stream)
	}

}