import { Neighborhood } from "../helpers/neighborhood";
import { Helpers } from "../helpers/random";
import { AutomatonDefinition, Color, AutomatonFunctions } from "../library/types";

export namespace RandomBlinkTest {
    export const Update = (current: boolean, _: Neighborhood<boolean>) => !current;
    export const Color = (state: boolean): Color => state ? "#0f0f0f" : "#717171";

    export const RandomInitialization = () => Helpers.chooseRandom([true, false]);

    export const Settings: AutomatonFunctions<boolean, Neighborhood<boolean>> = {
        NeighborFunction: Neighborhood.GetNeumannNeighborhood,
        UpdateFunction: RandomBlinkTest.Update,
        ColorFunction: RandomBlinkTest.Color,
    };

    export const AutomatonSettings: AutomatonDefinition<boolean, Neighborhood<boolean>> = {
        AutomatonFunctions: Settings,
        InitializationFunctions: [
            { Name: "Random", Function: RandomInitialization },
        ],
    };
}
