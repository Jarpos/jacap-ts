import { Neighborhood } from "../library/neighborhood";
import { AutomatonDefinition, Color, AutomatonFunctions } from "../library/types";

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
        [States.On, States.Dying, States.Off][Math.floor(Math.random() * 3)];

    export const Settings: AutomatonFunctions<States, Neighborhood<States>> = {
        NeighborFunction: Neighborhood.GetMooreNeighborhood,
        UpdateFunction: BriansBrain.Update,
        ColorFunction: BriansBrain.Color,
    };

    export const AutomatonSettings: AutomatonDefinition<States, Neighborhood<States>> = {
        AutomatonFunctions: Settings,
        InitializationFunctions: [
            { Name: "Random", Function: RandomInitialization },
        ],
    };
}
