import { Neighborhood } from "../library/neighborhood";
import { SimulatorSettings } from "../library/simulator";
import { Color } from "../library/types";

export namespace RandomBlinkTest {
    export const Update = (current: boolean, _: Neighborhood<boolean>) => !current;
    export const Color = (state: boolean): Color => state ? "#0f0f0f" : "#717171";

    export const InitFunction = () => [true, false][Math.floor(Math.random() * 2)];

    export const Functions: SimulatorSettings<boolean, Neighborhood<boolean>> = {
        NeighborFunction: Neighborhood.GetNeumannNeighborhood,
        UpdateFunction: RandomBlinkTest.Update,
        ColorFunction: RandomBlinkTest.Color,
    };
}
