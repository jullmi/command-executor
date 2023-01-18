"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirExecutor = void 0;
const prompt_service_1 = require("../../core/prompt/prompt.service");
const command_executor_1 = require("../../core/executor/command.executor");
const dir_builder_1 = require("./dir.builder");
const stream_handler_1 = require("../../core/handlers/stream.handler");
const child_process_1 = require("child_process");
class DirExecutor extends command_executor_1.CommandExecutor {
    constructor(logger) {
        super(logger);
        this.promptService = new prompt_service_1.PromptService();
    }
    prompt() {
        return __awaiter(this, void 0, void 0, function* () {
            const path = yield this.promptService.input('Path', 'input');
            return { path };
        });
    }
    build({ path }) {
        const args = (new dir_builder_1.DirBuilder()).detailedOutput().output();
        return { command: 'ls', args: args.concat(path) };
    }
    spawn({ command, args }) {
        return (0, child_process_1.spawn)(command, args);
    }
    processStream(stream, logger) {
        const handler = new stream_handler_1.StreamHandler(logger);
        handler.processOutput(stream);
    }
}
exports.DirExecutor = DirExecutor;
