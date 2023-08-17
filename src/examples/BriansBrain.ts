import { Neighborhood } from "../library/neighborhood";
import { Utility } from "../helpers/utility";
import { AutomatonDefinition, Color } from "../library/types";

export namespace BriansBrain {
    export enum States {
        On = "#717171",
        Dying = "#414141",
        Off = "#0f0f0f",
    }

    export const Update = (current: States, neighbors: Neighborhood<States>) => {
        let onCount = neighbors.GetMooreCount(v => v === States.On);

        switch (current) {
            case States.On: /*****/ return States.Dying
            case States.Dying: /**/ return States.Off;
            case States.Off:
                if (onCount === 2)
                    return States.On;
        }

        return States.Off;
    }

    export const Color = (state: States) => state as Color;

    export const RandomInitialization = (x: number, y: number) =>
        Utility.chooseRandom([States.On, States.Dying, States.Off]);

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
            Utility.getNext(value, [States.On, States.Dying, States.Off]),
    };
}
