import { Neighborhood } from "../helpers/neighborhood";
import { AutomatonDefinition, Color, AutomatonFunctions } from "../library/types";

export namespace DayAndNight {
    export enum States {
        Dead = "#0f0f0f",
        Alive = "#717171",
    }

    function isAnyOf(v, ...args) {
        return args.find(arg => arg === v) !== undefined;
    }

    export const Update = (current: States, neighbors: Neighborhood<States>) => {
        let count = neighbors.GetMooreCount(v => v === States.Alive);

        if (current === States.Dead) {
            if (isAnyOf(count, 3, 6, 7, 8)) {
                return States.Alive;
            }
        } else /* current === States.Alive */ {
            if (isAnyOf(count, 3, 4, 6, 7, 8)) {
                return States.Alive;
            }
        }
        return States.Dead;
    }

    export const Color = (state: States) => state as Color;

    export const RandomInitialization = (x: number, y: number) =>
        [States.Dead, States.Dead][Math.floor(Math.random() * 2)];

    export const Settings: AutomatonFunctions<States, Neighborhood<States>> = {
        NeighborFunction: Neighborhood.GetMooreNeighborhood,
        UpdateFunction: DayAndNight.Update,
        ColorFunction: DayAndNight.Color,
    };

    export const AutomatonSettings: AutomatonDefinition<States, Neighborhood<States>> = {
        AutomatonFunctions: Settings,
        InitializationFunctions: [
            { Name: "Random", Function: RandomInitialization },
        ],
    };
}
