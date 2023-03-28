import hydrate, { defaultBlankState } from '../src/hydrate';

describe('hydrate', () => {
	let latex = 'Hello {{name}}';

	it('should change variable to expected value', () => {
		const hydrated = hydrate(latex, {
			name: 'Bruno',
		});

		expect(hydrated).toBe('Hello Bruno');
	});

	it('should change variable to default blank state (----)', () => {
		const hydrated = hydrate(latex, {
			name: null,
		});

		expect(hydrated).toBe(`Hello ${defaultBlankState}`);
	});
});
