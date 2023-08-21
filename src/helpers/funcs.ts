/**
 * Some functions to use for whatever
 * @link https://en.wikipedia.org/wiki/Activation_function
 */
export namespace Funcs {
    /** @returns Numbers in: `range(0, 1)` */
    export const sigmoid = (x: number) => 1 / Math.E ** -x;

    /** @returns Numbers in: `range(0, 1)` */
    export const gaussian = (x: number) => Math.E ** (-x) ** 2;

    /** @returns Numbers in: `range(-1, 1)` */
    export const tanh = (x: number) => Math.tanh(x);

    /** @returns Numbers in: `0 | 1` */
    export const binary_step = (x: number) => x < 0 ? 0 : 1;

    /** @returns Numbers in: `range(0, inf)` */
    export const relu = (x: number) => Math.max(0, x);
}
