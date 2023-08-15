import { Utility } from "../helpers/utility";
import { AutomatonDefinition, Color } from "../library/types";

export namespace RandomBlinkTest {
    export const Update = (current: boolean, _: null) => !current;
    export const Color = (state: boolean): Color => state ? "#616161" : "#717171";

    export const RandomInitialization = () => Utility.chooseRandom([true, false]);

    export const AutomatonDefinition: AutomatonDefinition<boolean, null> = {
        AutomatonFunctions: {
            NeighborFunction: () => null,
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
