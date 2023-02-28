import { Board } from "./board";
import { Cell } from "./types";

export class Neighborhood {
    /** Current Cell  */ C: Cell;
    /** Northern Cell */ N: Cell;
    /** Southern Cell */ S: Cell;
    /** Eastern Cell  */ E: Cell;
    /** Western Cell  */ W: Cell;
    /** North Western Cell */ NW: Cell;
    /** North Eastern Cell */ NE: Cell;
    /** South Western Cell */ SW: Cell;
    /** South Eastern Cell */ SE: Cell;

    constructor(
        c: Cell, n: Cell, s: Cell, w: Cell, e: Cell,
        nw?: Cell, ne?: Cell, sw?: Cell, se?: Cell) {
        this.C = c;
        this.N = n;
        this.S = s;
        this.W = w;
        this.E = e;

        this.NW = nw;
        this.NE = ne;
        this.SW = sw;
        this.SE = se;
    }

    static GetMooreNeighborhood(board: Board, x: number, y: number) {
        return new Neighborhood(
            board.Get(x, y),

            board.Get(x, y + 1), board.Get(x, y - 1),
            board.Get(x - 1, y), board.Get(x + 1, y),

            board.Get(x - 1, y + 1), board.Get(x + 1, y + 1),
            board.Get(x - 1, y - 1), board.Get(x + 1, y - 1)
        );
    }

    static GetNeumannNeighborhood(board: Board, x: number, y: number) {
        return new Neighborhood(
            board.Get(x, y),
            board.Get(x, y + 1), board.Get(x, y - 1),
            board.Get(x - 1, y), board.Get(x + 1, y)
        );
    }
}
