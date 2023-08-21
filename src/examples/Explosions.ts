import { Neighborhood } from "../library/neighborhood";
import { Utility } from "../helpers/utility";
import { AutomatonDefinition, Color } from "../library/types";

export namespace Explosions {
    enum States {
        Explosion = "#aa1111",
        Exploded = "#0f0f0f",
        Floor = "#444444",
        Wall = "#888888",
    }

    const Update = (current: States, neighbors: Neighborhood<States>) => {
        switch (current) {
            case States.Explosion: return States.Exploded;
            case States.Exploded: return States.Exploded;
            case States.Wall: return States.Wall;

            case States.Floor:
                if (neighbors.GetNeumannCount(v => v === States.Explosion))
                    return States.Explosion;
                return States.Floor;
        }
    }

    const Color = (state: States) => state as Color;

    const RandomInitialization = (x: number, y: number) =>
        // (Math.sin(y * x) * Math.tan(x * y)) * Math.random() > .0001
        //     ? States.Floor : States.Wall;
        Utility.chooseRandom([
            States.Floor, States.Floor,
            States.Wall
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
            Utility.getNext(value, [States.Explosion]),
    };
}
