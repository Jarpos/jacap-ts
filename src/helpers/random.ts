export namespace Helpers {
    export function random(max: number, min: number = 0) {
        return Math.floor(Math.random() * max) + min;
    }

    export function chooseRandom<T>(array: T[]) {
        return array[random(array.length)]
    }
}
