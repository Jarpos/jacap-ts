import { Neighborhood } from "../library/neighborhood";
import { SimulatorSettings } from "../library/simulator";
import { Color } from "../library/types";

export namespace GameOfLife {
    export enum States {
        Dead = "#0f0f0f",
        Alive = "#717171",
    }

    export const Color = (state: States) => state as Color;

    export const Update = (current: States, neighbors: Neighborhood<States>) => {
        let count = neighbors.GetMooreCount(v => v === States.Alive);

        if (current === States.Alive && count < 2) {
            return States.Dead;
        } else if (current === States.Alive && count > 3) {
            return States.Dead;
        } else if (current === States.Dead && count === 3) {
            return States.Alive;
        }
        return current;
    }

    export const InitFunction = (x: number, y: number) =>
        [States.Alive, States.Dead][Math.floor(Math.random() * 2)];

    export const Functions: SimulatorSettings<States, Neighborhood<States>> = {
        NeighborFunction: Neighborhood.GetMooreNeighborhood,
        UpdateFunction: GameOfLife.Update,
        ColorFunction: GameOfLife.Color,
    };
}
