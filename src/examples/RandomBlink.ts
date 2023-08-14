import { Neighborhood } from "../library/neighborhood";
import { Utility } from "../helpers/utility";
import { AutomatonDefinition, Color, AutomatonFunctions } from "../library/types";

export namespace RandomBlinkTest {
    export const Update = (current: boolean, _: Neighborhood<boolean>) => !current;
    export const Color = (state: boolean): Color => state ? "#0f0f0f" : "#717171";

    export const RandomInitialization = () => Utility.chooseRandom([true, false]);

    export const AutomatonDefinition: AutomatonDefinition<boolean, Neighborhood<boolean>> = {
        AutomatonFunctions: {
            NeighborFunction: Neighborhood.GetNeumannNeighborhood,
            UpdateFunction: RandomBlinkTest.Update,
            ColorFunction: RandomBlinkTest.Color,
        },
        InitializationFunctions: [
            { Name: "Random", Function: RandomInitialization },
        ],
        OnClickFunction: (value) =>
            Utility.getNext(value, [true, false]),
    };
}
