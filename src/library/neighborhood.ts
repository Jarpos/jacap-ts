import { Board } from "./board";

export class Neighborhood<T> {
    /** Northern Cell */ N: T;
    /** Southern Cell */ S: T;
    /** Eastern Cell  */ E: T;
    /** Western Cell  */ W: T;
    /** North Western Cell */ NW: T;
    /** North Eastern Cell */ NE: T;
    /** South Western Cell */ SW: T;
    /** South Eastern Cell */ SE: T;

    constructor(n: T, s: T, w: T, e: T, nw?: T, ne?: T, sw?: T, se?: T) {
        this.N = n;
        this.S = s;
        this.W = w;
        this.E = e;

        this.NW = nw;
        this.NE = ne;
        this.SW = sw;
        this.SE = se;
    }

    static GetMooreNeighborhood<T>(board: Board<T>, x: number, y: number) {
        return new Neighborhood<T>(
            board.Get(x, y - 1), board.Get(x, y + 1),
            board.Get(x - 1, y), board.Get(x + 1, y),

            board.Get(x - 1, y - 1), board.Get(x + 1, y - 1),
            board.Get(x - 1, y + 1), board.Get(x + 1, y + 1)
        );
    }

    static GetNeumannNeighborhood<T>(board: Board<T>, x: number, y: number) {
        return new Neighborhood<T>(
            board.Get(x, y - 1), board.Get(x, y + 1),
            board.Get(x - 1, y), board.Get(x + 1, y)
        );
    }
}
