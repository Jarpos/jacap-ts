import { Utility } from "../helpers/utility";
import { Neighborhood } from "../library/neighborhood";
import { AutomatonDefinition, Color } from "../library/types";

export namespace Movers {
    enum States {
        None = "#717171",
        Up = "#330000",
        Down = "#006600",
        Left = "#000066",
        Right = "#990000",
    };

    const Update = (current: States, neighbors: Neighborhood<States>) => {
        if (neighbors.N === States.Down) {
            return Math.random() > .5 ? States.Down : States.Left;
        }
        if (neighbors.S === States.Up) {
            return Math.random() > .5 ? States.Up : States.Right;
        }

        if (neighbors.E === States.Left) {
            return Math.random() > .5 ? States.Left : States.Up;
        }
        if (neighbors.W === States.Right) {
            return Math.random() > .5 ? States.Right : States.Down;
        }

        return Math.random() > .01 ? States.None
            : Utility.chooseRandom([States.Up, States.Down, States.Left, States.Right]);
    }

    const Color = (state: States): Color => state as Color;

    const RandomInitialization = (x: number, y: number) =>
        Utility.chooseRandom([
            States.None, States.None, States.None, States.None, States.None, States.None,
            States.None, States.None, States.None, States.None, States.None, States.None,
            States.Up, States.Down, States.Left, States.Right,
        ]);

    export const AutomatonDefinition: AutomatonDefinition<States, Neighborhood<States>> = {
        AutomatonFunctions: {
            NeighborFunction: Neighborhood.GetNeumannNeighborhood,
            UpdateFunction: Update,
            ColorFunction: Color,
        },
        InitializationFunctions: [
            { Name: "Random", Function: RandomInitialization },
        ],
        OnClickFunction: (value) =>
            Utility.chooseRandom([States.Up, States.Down, States.Left, States.Right]),
    };
}
