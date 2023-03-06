import { Neighborhood } from "../helpers/neighborhood";
import { Utility } from "../helpers/utility";
import { AutomatonDefinition, Color, AutomatonFunctions } from "../library/types";

export namespace GameOfLife {
    export enum States {
        Dead = "#0f0f0f",
        Alive = "#717171",
    }

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

    export const Color = (state: States) => state as Color;

    export const RandomInitialization = (x: number, y: number) =>
        Utility.chooseRandom([States.Alive, States.Dead]);

    export const Settings: AutomatonFunctions<States, Neighborhood<States>> = {
        NeighborFunction: Neighborhood.GetMooreNeighborhood,
        UpdateFunction: GameOfLife.Update,
        ColorFunction: GameOfLife.Color,
    };

    export const AutomatonSettings: AutomatonDefinition<States, Neighborhood<States>> = {
        AutomatonFunctions: Settings,
        InitializationFunctions: [
            { Name: "Random", Function: RandomInitialization },
        ],
    };
}
