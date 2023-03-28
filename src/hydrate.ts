export const defaultBlankState = '----';

const hydrate = (texTemplate: string, data: Record<string, any>): string => {
	let hydratable = texTemplate;

	const templateVariables = texTemplate.match(/{{[a-zA-Z]\w+(.*?)}}/g) ?? [];

	for (const texVariable of templateVariables) {
		const variable = texVariable.slice(2, texVariable.length - 2); // remove {{}}

		const variableData = data[variable];
		if (!variableData) {
			hydratable = hydratable.replace(texVariable, defaultBlankState);
		} else {
			hydratable = hydratable.replace(texVariable, variableData);
		}
	}

	return hydratable;
};

export default hydrate;
