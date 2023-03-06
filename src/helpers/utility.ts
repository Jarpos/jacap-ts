import { AutomatonCanvas } from "../library/canvas";
import { Automaton } from "../library/simulator";
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

    export function random(max: number, min: number = 0) {
        return Math.floor(Math.random() * max) + min;
    }

    export function chooseRandom<T>(array: T[]) {
        return array[random(array.length)]
    }

    export function isAnyOf<T>(v: T, ...args: T[]) {
        return args.find(arg => arg === v) !== undefined;
    }
}
