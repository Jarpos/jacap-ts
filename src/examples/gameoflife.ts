import { Neighborhood } from "../library/neighborhood";
import { color, Cell } from "../library/types";

export enum GoLStates {
    Dead = "#0f0f0f",
    Alive = "#717171",
}

export class GameOfLife implements Cell<GoLStates> {
    public State: GoLStates;

    constructor(i: number) {
        this.State = i ? GoLStates.Alive : GoLStates.Dead;
    }

    get Color(): color { return this.State; };
    public Update(n: Neighborhood<GoLStates>) {
        let count = 0;
if (n.C.State === GoLStates.Alive) console.log(n)
        if (n.N.State === GoLStates.Alive) count++;
        if (n.S.State === GoLStates.Alive) count++;
        if (n.W.State === GoLStates.Alive) count++;
        if (n.E.State === GoLStates.Alive) count++;
        if (n.NW.State === GoLStates.Alive) count++;
        if (n.NE.State === GoLStates.Alive) count++;
        if (n.SW.State === GoLStates.Alive) count++;
        if (n.SE.State === GoLStates.Alive) count++;

        if (this.State === GoLStates.Alive && count < 2) {
            this.State = GoLStates.Dead;
        } else if (this.State === GoLStates.Alive && count > 3) {
            this.State = GoLStates.Dead;
        } else if (this.State === GoLStates.Dead && count === 3) {
            this.State = GoLStates.Alive;
        }
    }

    static InitFunction() {
        // return [
        //     new GameOfLife(0), new GameOfLife(1)
        // ][Math.floor(Math.random() * 2)]
        return new GameOfLife(0);
    }
}
