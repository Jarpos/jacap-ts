import { AutomatonCanvas } from "../library/canvas";
import { Automaton } from "../library/simulator";
import { AutomatonDefinition } from "../library/types";

export namespace Helpers {
    export function createSimulation<CellType, NeighborType>(
        canvas: AutomatonCanvas, automaton: AutomatonDefinition<CellType, NeighborType>
    ) {
        return new Automaton(
            canvas.BoardWidth,
            canvas.BoardHeight,
            automaton.AutomatonFunctions
        ).Initialize(automaton.InitializationFunctions[0].Function);
    }
}
