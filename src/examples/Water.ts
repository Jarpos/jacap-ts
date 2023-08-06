import { Neighborhood } from "../helpers/neighborhood";
import { Utility } from "../helpers/utility";
import { AutomatonDefinition, Color, AutomatonFunctions } from "../library/types";

export namespace Water {
    export enum States {
        Air = "#0f0f0f",
        Water = "#0066ff",
        Concrete = "#717171",
    }

    export const Update = (current: States, neighbors: Neighborhood<States>) => {
        switch (current) {
            case States.Air:
                if (neighbors.N === States.Water)
                    return States.Water;
                return States.Air;

            case States.Water:
                if (neighbors.S === States.Air)
                    return States.Air;
                if (neighbors.S === States.Concrete)
                    return States.Water;
                return States.Water;

            case States.Concrete: return States.Concrete

            default:
                throw new Error("Invalid state in Water");
        }
    }

    export const Color = (state: States) => state as Color;

    export const RandomInitialization = (x: number, y: number) =>
        Utility.chooseRandom([
            States.Air, States.Air, States.Air, States.Air,
            States.Air, States.Air, States.Air, States.Air,
            States.Water, States.Concrete
        ]);

    export const Settings: AutomatonFunctions<States, Neighborhood<States>> = {
        NeighborFunction: Neighborhood.GetMooreNeighborhood,
        UpdateFunction: Water.Update,
        ColorFunction: Water.Color,
    };

    export const AutomatonDefinition: AutomatonDefinition<States, Neighborhood<States>> = {
        AutomatonFunctions: Settings,
        InitializationFunctions: [
            { Name: "Random", Function: RandomInitialization },
        ],
        OnClickFunction: (value) =>
            Utility.getNext(value, [/*States.Water*/, States.Air, States.Concrete]),
    };
}
