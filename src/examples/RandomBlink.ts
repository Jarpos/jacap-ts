import { Utility } from "../helpers/utility";
import { AutomatonDefinition, Color } from "../library/types";

export namespace RandomBlinkTest {
    const Update = (current: boolean, _: null) => !current;
    const Color = (state: boolean): Color => state ? "#616161" : "#717171";

    const RandomInitialization = () => Utility.chooseRandom([true, false]);

    export const AutomatonDefinition: AutomatonDefinition<boolean, null> = {
        AutomatonFunctions: {
            NeighborFunction: () => null,
            UpdateFunction: Update,
            ColorFunction: Color,
        },
        InitializationFunctions: [
            { Name: "Random", Function: RandomInitialization },
        ],
        OnClickFunction: (value) =>
            Utility.getNext(value, [true, false]),
    };
}
