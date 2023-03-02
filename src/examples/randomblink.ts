import { Neighborhood } from "../library/neighborhood";
import { Color } from "../library/types";

export namespace RandomBlinkTest {
    export const Color = (state: boolean): Color => state ? "#0f0f0f" : "#717171";
    export const Update = (current: boolean, _: Neighborhood<boolean>) => !current;
    export const InitFunction = () => [true, false][Math.floor(Math.random() * 2)];
}
