import { classNames } from './classNames';

describe('classNames', () => {
    test('with only first param', () => {
        expect(classNames('someClass')).toBe('someClass');
    });
    test('with mods', () => {
        expect(classNames('someClass', { hovered: true, static: false })).toBe('someClass hovered');
    });
    test('with additional class', () => {
        expect(classNames('someClass', {}, ['primary'])).toBe('someClass primary');
    });
    test('with mods, additional class', () => {
        expect(classNames('someClass', { hovered: true, static: false }, ['primary'])).toBe(
            'someClass primary hovered',
        );
    });
    test('with undefined', () => {
        expect(classNames('someClass', {}, undefined)).toBe('someClass');
    });
    test('with mods undefined', () => {
        expect(classNames('someClass', { hovered: true, static: undefined }, undefined)).toBe('someClass hovered');
    });
});
