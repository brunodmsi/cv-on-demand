import path from 'node:path';
import { writeFile } from 'node:fs/promises';
import { execSync } from 'node:child_process';
import hydrate from './hydrate';

type Template = {
	latex: string;
	data: Record<string, any>;
};

const firstTemplate: Template = {
	latex: `
		Hello {{name}}
	`,
	data: {
		name: 'Bruno De Masi',
		currentJob: 'Fullstack Developer',
	},
};

const templates = [firstTemplate, { latex: '', data: {} }];

const document = `
	\\documentclass{article}
	\\usepackage{graphicx} % Required for inserting images

	\\begin{document}

	{{children}}

	\\end{document}
`;

let body = '';

for (let i = 0; i < templates.length; i++) {
	const hydrated = hydrate(templates[i].latex, templates[i].data);

	body = `
		${body}
		${hydrated}
	`;
}

const documentHydrated = hydrate(document, {
	children: body,
});

async function processOutput(document: string) {
	const outputPath = `${path.resolve('tmp')}/texFile.tex`;
	const outputDirname = path.dirname(outputPath);

	await writeFile(outputPath, document);

	execSync(
		`pdflatex -synctex=1 -interaction=nonstopmode -output-format=pdf -output-directory=${outputDirname} ${outputPath}`
	);
}

processOutput(documentHydrated);
