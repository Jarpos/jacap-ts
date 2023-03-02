import { Neighborhood } from "../library/neighborhood";
import { Color } from "../library/types";

export enum GoLStates {
    Dead = "#0f0f0f",
    Alive = "#717171",
}

export namespace GameOfLife {
    export const Color = (state: GoLStates) => state as Color;

    export const Update = (current: GoLStates, neighbors: Neighborhood<GoLStates>) => {
        let count = 0;

        if (neighbors.N === GoLStates.Alive) count++;
        if (neighbors.S === GoLStates.Alive) count++;
        if (neighbors.W === GoLStates.Alive) count++;
        if (neighbors.E === GoLStates.Alive) count++;
        if (neighbors.NW === GoLStates.Alive) count++;
        if (neighbors.NE === GoLStates.Alive) count++;
        if (neighbors.SW === GoLStates.Alive) count++;
        if (neighbors.SE === GoLStates.Alive) count++;

        if (current === GoLStates.Alive && count < 2) {
            return GoLStates.Dead;
        } else if (current === GoLStates.Alive && count > 3) {
            return GoLStates.Dead;
        } else if (current === GoLStates.Dead && count === 3) {
            return GoLStates.Alive;
        }
        return current;
    }

    export const InitFunction = () =>
        [GoLStates.Alive, GoLStates.Dead][Math.floor(Math.random() * 2)];
}
