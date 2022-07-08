import { formatDate, formatTime, capitalise } from './HelperFunctions';

test('Format date', () => {
    expect(formatDate('2021-12-15T11:06:04.487309+00:00')).toBe('15/12/2021');
});
test('Format time', () => {
    expect(formatTime('2021-12-18T22:19:01.294344Z')).toBe('22:19');
});
test('Capitalise', () => {
    expect(capitalise('capitalised')).toBe('Capitalised');
    expect(capitalise('capitalised sentance')).toBe('Capitalised sentance');
    expect(capitalise('CAPITALISE')).toBe('Capitalise');
});
