import { Neighborhood } from "../library/neighborhood";
import { Utility } from "../helpers/utility";
import { AutomatonDefinition, Color, AutomatonFunctions } from "../library/types";

// TODO: Rework/fix
export namespace Explosions {
    export enum BaseStates {
        Wall = -1,
        Floor = 0,
        MaxExplosion = 1,
    }

    export const Update = (current: number, neighbors: Neighborhood<number>) => {
        if (current === BaseStates.Wall) {
            const explosionStrength = neighbors.NeumannReduce(
                (a, c) => a + (c >= 0 ? c : 0), 0);

            if (explosionStrength > 0)
                return explosionStrength * .25;
            return BaseStates.Wall;
        }

        if (current === BaseStates.Floor) {
            const explosionStrength = neighbors.NeumannReduce((a, c) => a + c, 0);
            if (explosionStrength > 0)
                return explosionStrength * .5;
            return BaseStates.Floor;
        }

        if (current === BaseStates.MaxExplosion)
            return current - .9;

        return current - .1;
    }

    export const Color = (state: number) => {
        if (state === BaseStates.Wall)
            return "#717171" as Color;
        if (state === BaseStates.Floor)
            return "#0f0f0f" as Color;
        return `rgb(${256 / state + 128}, 0, 0)` as Color;
    };

    export const RandomInitialization = (x: number, y: number) =>
        Utility.chooseRandom([
            BaseStates.Floor, BaseStates.Floor, BaseStates.Floor, BaseStates.Floor, BaseStates.Floor,
            BaseStates.Floor, BaseStates.Floor, BaseStates.Floor, BaseStates.Floor, BaseStates.Floor,
            BaseStates.Wall,
        ]);

    export const AutomatonDefinition: AutomatonDefinition<BaseStates, Neighborhood<BaseStates>> = {
        AutomatonFunctions: {
            NeighborFunction: Neighborhood.GetNeumannNeighborhood,
            UpdateFunction: Explosions.Update,
            ColorFunction: Explosions.Color,
        },
        InitializationFunctions: [
            { Name: "Random", Function: RandomInitialization },
        ],
        OnClickFunction: (value) =>
            Utility.getNext(value, [BaseStates.MaxExplosion]),
    };
}
