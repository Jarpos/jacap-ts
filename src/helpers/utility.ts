import { AutomatonCanvas } from "../library/canvas";
import { Automaton } from "../library/automaton";
import { AutomatonDefinition } from "../library/types";

export namespace Utility {
    export function createSimulation<CellType, NeighborType>(
        canvas: AutomatonCanvas, automaton: AutomatonDefinition<CellType, NeighborType>
    ) {
        return new Automaton(
            canvas.BoardWidth,
            canvas.BoardHeight,
            automaton.AutomatonFunctions
        ).Initialize(automaton.InitializationFunctions[0].Function);
    }

    // TODO: Think about rework
    export const random = (max: number, min: number = 0) => {
        if (max < min)
            throw new RangeError(`max is smaller than min (max=${max} < min=${min})`)
        return Math.floor(Math.random() * max) + min;
    }

    // TODO: Think about rework
    export const random_f = (max: number, min: number = 0) => {
        if (max < min)
            throw new RangeError(`max is smaller than min (max=${max} < min=${min})`)
        return Math.random() * max + min;
    }

    export const chooseRandom = <T>(array: T[]) =>
        array[random(array.length)]

    export const isAnyOf = <T>(v: T, ...args: T[]) =>
        args.find(arg => arg === v) !== undefined;

    export const areAll = <T>(v: T, ...args: T[]) =>
        args.every(arg => arg === v);

    export const getNext = <T>(v: T, args: T[]) =>
        args[(args.findIndex(a => a === v) + 1) % args.length];

    export const minMax = (min: number, value: number, max: number) =>
        Math.max(min, Math.min(value, max));

    export const call = <T>(f: () => T, x: number) => {
        for (let i = 0; i < x; i++)
            f();
    }
}
