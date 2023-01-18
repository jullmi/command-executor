export class DirBuilder {
	private options: Map<string, string> = new Map();

	detailedOutput() {
		this.options.set('-1', '');
		return this
	}

	output() {
		const args: string[] = []
		this.options.forEach((key, value) => {
			args.push(key);
			args.push(value)
		})
		return args
	}
}