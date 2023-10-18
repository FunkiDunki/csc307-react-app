import mut from './module.js';

test('Testing sum -- success', () => {
    const expected = 30;
    const got = mut.sum(12, 18);
    expect(got).toBe(expected);
});

test('Testing div -- success', () => {
    expect(mut.div(1,1)).toBe(1);
    expect(mut.div(1,0)).toBe(Infinity);
});

test('Testing containsNumbers -- success', () => {
    const cn = (text => mut.containsNumbers(text));
    expect(cn("250")).toBe(true);
    expect(cn("twenty-five")).toBe(false);
});