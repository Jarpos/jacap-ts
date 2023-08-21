import { Neighborhood } from "../library/neighborhood";
import { Utility } from "../helpers/utility";
import { AutomatonDefinition, Color } from "../library/types";

export namespace Fire {
    const TREE_LIKELIHOOD = .01 as const;
    const GRASS_LIKELIHOOD = .25 as const;

    enum States {
        Tree = "#003300",
        Grass = "#006600",
        GrassFire = "#b30000",
        TreeFire = "#c30000",
        BurnedGrass = "#993300",
        BurnedTree = "#663300",
    }

    const Update = (current: States, neighbors: Neighborhood<States>) => {
        switch (current) {
            case States.Tree:
                return catchesFire(TREE_LIKELIHOOD, neighbors)
                    ? States.TreeFire : States.Tree;
            case States.Grass:
                return catchesFire(GRASS_LIKELIHOOD, neighbors)
                    ? States.GrassFire : States.Grass;

            case States.GrassFire:
                return neighbors.GetMooreCount((v) => isBurningOrBurned(v)) === 8
                    ? States.BurnedGrass : States.GrassFire;

            case States.TreeFire:
                return neighbors.GetMooreCount((v) => isBurningOrBurned(v)) === 8
                    ? States.BurnedTree : States.TreeFire;

            case States.BurnedGrass: return States.BurnedGrass;
            case States.BurnedTree: return States.BurnedTree;
            default:
                throw new Error("Invalid state in Water");
        }
    }

    const Color = (state: States) => state as Color;

    const RandomInitialization = (x: number, y: number) =>
        Utility.chooseRandom([
            States.Grass, States.Grass, States.Grass, States.Grass, States.Grass,
            States.Grass, States.Grass, States.Grass, States.Grass, States.Grass,
            States.Tree,
        ]);

    export const AutomatonDefinition: AutomatonDefinition<States, Neighborhood<States>> = {
        AutomatonFunctions: {
            NeighborFunction: Neighborhood.GetMooreNeighborhood,
            UpdateFunction: Update,
            ColorFunction: Color,
        },
        InitializationFunctions: [
            { Name: "Random", Function: RandomInitialization },
        ],
        OnClickFunction: (value) => {
            switch (value) {
                case States.Tree: return States.TreeFire;
                case States.Grass: return States.GrassFire;

                case States.TreeFire: return States.TreeFire;
                case States.GrassFire: return States.GrassFire;

                case States.BurnedTree: return States.BurnedTree;
                case States.BurnedGrass: return States.BurnedGrass;
            }
        }
    };

    function catchesFire(likelihood: number, neighbors: Neighborhood<States>) {
        const count = neighbors.GetMooreCount(
            (v) => Utility.isAnyOf(v, States.TreeFire, States.GrassFire));
        return ((count / 8) * likelihood) > Math.random();
    }

    function isBurningOrBurned(state: States) {
        return Utility.isAnyOf(state,
            States.TreeFire, States.GrassFire,
            States.BurnedGrass, States.BurnedTree
        );
    }
}
