import { Board } from "./board";
import { Cell } from "./types";

export class Neighborhood<T> {
    /** Current Cell  */ C: Cell<T>;
    /** Northern Cell */ N: Cell<T>;
    /** Southern Cell */ S: Cell<T>;
    /** Eastern Cell  */ E: Cell<T>;
    /** Western Cell  */ W: Cell<T>;
    /** North Western Cell */ NW: Cell<T>;
    /** North Eastern Cell */ NE: Cell<T>;
    /** South Western Cell */ SW: Cell<T>;
    /** South Eastern Cell */ SE: Cell<T>;

    constructor(
        c: Cell<T>, n: Cell<T>, s: Cell<T>, w: Cell<T>, e: Cell<T>,
        nw?: Cell<T>, ne?: Cell<T>, sw?: Cell<T>, se?: Cell<T>) {
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

            board.Get(x, y - 1), board.Get(x, y + 1),
            board.Get(x - 1, y), board.Get(x + 1, y),

            board.Get(x - 1, y - 1), board.Get(x + 1, y - 1),
            board.Get(x - 1, y + 1), board.Get(x + 1, y + 1)
        );
    }

    static GetNeumannNeighborhood(board: Board, x: number, y: number) {
        return new Neighborhood(
            board.Get(x, y),
            board.Get(x, y - 1), board.Get(x, y + 1),
            board.Get(x - 1, y), board.Get(x + 1, y)
        );
    }
}
