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

const hydrate = (texTemplate: string, data: Record<string, any>): string => {
	let hydratable = texTemplate;

	const templateVariables = texTemplate.match(/{{[a-zA-Z]\w+(.*?)}}/g) ?? [];

	for (const texVariable of templateVariables) {
		const variable = texVariable.slice(2, texVariable.length - 2); // remove {{}}

		const variableData = data[variable];
		if (!variableData) {
			hydratable = hydratable.replace(texVariable, '----');
		} else {
			hydratable = hydratable.replace(texVariable, variableData);
		}
	}

	return hydratable;
};

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

console.log(documentHydrated);
