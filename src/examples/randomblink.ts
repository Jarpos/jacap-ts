import { Neighborhood } from "../library/neighborhood";
import { AutomatonSettings, Color, SimulatorSettings } from "../library/types";

export namespace RandomBlinkTest {
    export const Update = (current: boolean, _: Neighborhood<boolean>) => !current;
    export const Color = (state: boolean): Color => state ? "#0f0f0f" : "#717171";

    export const RandomInitialization = () => [true, false][Math.floor(Math.random() * 2)];

    export const Settings: SimulatorSettings<boolean, Neighborhood<boolean>> = {
        NeighborFunction: Neighborhood.GetNeumannNeighborhood,
        UpdateFunction: RandomBlinkTest.Update,
        ColorFunction: RandomBlinkTest.Color,
    };

    export const AutomatonSettings: AutomatonSettings<boolean, Neighborhood<boolean>> = {
        SimulatorSettings: Settings,
        InitializationFunctions: [
            { Name: "Random", Function: RandomInitialization },
        ],
    };
}
