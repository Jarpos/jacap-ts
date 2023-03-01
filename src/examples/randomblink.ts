import { Neighborhood } from "../library/neighborhood";
import { color, Cell } from "../library/types";

export class CellTest implements Cell<number> {
    public State: number = 0;

    constructor(i: number) { this.State = i; }
    get Color(): color { return this.State % 2 ? "#0f0f0f" : "#717171" };
    public Update(neighbors: Neighborhood<number>) { this.State++; }

    static InitFunction() {
        return [new CellTest(0), new CellTest(1)][Math.floor(Math.random() * 2)]
    }
}
