import { Funcs } from "../helpers/funcs";
import { Utility } from "../helpers/utility";
import { Neighborhood } from "../library/neighborhood";
import { AutomatonDefinition, Color } from "../library/types";

export namespace PlayingAround {
    // TODO: Rework this function... maybe add multiple update funcs to choose from?
    const Update = (current: number, neighbors: Neighborhood<number>) => {
        const n: number = 7;
        switch (n) {
            case 0:
                return neighbors.E * 0.25
                    + neighbors.W * 1.75
                    - neighbors.S * 0.25
                    - neighbors.N * 1.75;
            case 1:
                return Math.tanh(current
                    + neighbors.E * 0.25
                    + neighbors.W * 1.75
                    - neighbors.S * 0.25
                    - neighbors.N * 1.75);
            case 2:
                return current
                    + neighbors.E * 0.25
                    + neighbors.W * 1.75
                    - neighbors.S * 0.25
                    - neighbors.N * 1.75;
            case 3:
                return current
                    + neighbors.E / 0.25
                    + neighbors.W / 1.75
                    - neighbors.S / 0.25
                    - neighbors.N / 1.75
                    + neighbors.NE / 0.25
                    + neighbors.NW / 1.75
                    - neighbors.SE / 0.25
                    - neighbors.NW / 1.75;
            case 4:
                return current
                    + neighbors.E * 0.25
                    + neighbors.W * 1.75
                    - neighbors.S * 0.25
                    - neighbors.N * 1.75
                    + neighbors.NE * 0.25
                    + neighbors.NW * 1.75
                    - neighbors.SE * 0.25
                    - neighbors.NW * 1.75;
            case 5:
                return Math.sin(current * neighbors.E)
                    + Math.cos(current * neighbors.W);
            case 6:
                return Math.tan(current * neighbors.E)
                    + Math.atan(current * neighbors.W);
            case 7:
                return Funcs.relu(
                    current
                    + neighbors.E * 0.25
                    + neighbors.W * 1.75
                    - neighbors.S * 0.25
                    - neighbors.N * 1.75
                    + neighbors.NE * 0.25
                    + neighbors.NW * 1.75
                    - neighbors.SE * 0.25
                    - neighbors.NW * 1.75
                );
        }
        throw new RangeError(`Value ${n} not in case range`);
    }

    const Color = (state: number): Color =>
        `rgb(${0}, ${state * 50 + 50}, ${state * 50 + 50})`;

    const RandomInitialization = () => Utility.random_f(1, -1);

    export const AutomatonDefinition: AutomatonDefinition<number, Neighborhood<number>> = {
        AutomatonFunctions: {
            NeighborFunction: Neighborhood.GetMooreNeighborhood,
            UpdateFunction: Update,
            ColorFunction: Color,
        },
        InitializationFunctions: [
            { Name: "Random", Function: RandomInitialization },
        ],
        OnClickFunction: (value) => 0,
    };
}
