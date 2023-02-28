import { Neighborhood } from "../library/neighborhood";
import { color, Cell } from "../library/types";

export class CellTest implements Cell {
    private I: number = 0;

    constructor(i: number) { this.I = i; }
    get Color(): color { return this.I % 2 ? "#0f0f0f" : "#717171" };
    public Update(neighbors: Neighborhood) { this.I++; }

    static InitFunction() {
        return [new CellTest(0), new CellTest(1)][Math.floor(Math.random() * 2)]
    }
}
