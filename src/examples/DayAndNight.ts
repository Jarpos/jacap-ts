import { Neighborhood } from "../library/neighborhood";
import { Utility } from "../helpers/utility";
import { AutomatonDefinition, Color } from "../library/types";

export namespace DayAndNight {
    export enum States {
        Dead = "#0f0f0f",
        Alive = "#717171",
    }

    export const Update = (current: States, neighbors: Neighborhood<States>) => {
        let count = neighbors.GetMooreCount(v => v === States.Alive);

        if (current === States.Dead) {
            if (Utility.isAnyOf(count, 3, 6, 7, 8)) {
                return States.Alive;
            }
        } else /* current === States.Alive */ {
            if (Utility.isAnyOf(count, 3, 4, 6, 7, 8)) {
                return States.Alive;
            }
        }
        return States.Dead;
    }

    export const Color = (state: States) => state as Color;

    export const RandomInitialization = (x: number, y: number) =>
        Utility.chooseRandom([States.Dead, States.Alive]);

    export const AutomatonDefinition: AutomatonDefinition<States, Neighborhood<States>> = {
        AutomatonFunctions: {
            NeighborFunction: Neighborhood.GetMooreNeighborhood,
            UpdateFunction: Update,
            ColorFunction: Color,
        },
        InitializationFunctions: [
            { Name: "Random", Function: RandomInitialization },
        ],
        OnClickFunction: (value) =>
            Utility.getNext(value, [States.Alive, States.Dead]),
    };
}
