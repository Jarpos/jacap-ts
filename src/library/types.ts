import { Board } from "./board";

export type color = `rgb(${number}, ${number}, ${number})` | `#${string}`;

export type Transform<T> = (currentState: Neighborhood<T>) => T;

export interface ICell<T> {
    readonly Color: color;
    Next(neigbors: Neighborhood<T>): T;
}

export class Neighborhood<T> {
    /** Current Cell  */ C: T;
    /** Northern Cell */ N: T;
    /** Southern Cell */ S: T;
    /** Eastern Cell  */ E: T;
    /** Western Cell  */ W: T;
    /** North Western Cell */ NW: T;
    /** North Eastern Cell */ NE: T;
    /** South Western Cell */ SW: T;
    /** South Eastern Cell */ SE: T;

    constructor(c: T, n: T, s: T, w: T, e: T, nw?: T, ne?: T, sw?: T, se?: T) {
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

    static GetMooreNeighborhood<T>(board: Board<T>, x: number, y: number) {
        return new Neighborhood(
            board.Get(x, y),

            board.Get(x, y + 1), board.Get(x, y - 1),
            board.Get(x - 1, y), board.Get(x + 1, y),

            board.Get(x - 1, y + 1), board.Get(x + 1, y + 1),
            board.Get(x - 1, y - 1), board.Get(x + 1, y - 1)
        );
    }

    static GetNeumannNeighborhood<T>(board: Board<T>, x: number, y: number) {
        return new Neighborhood(
            board.Get(x, y),
            board.Get(x, y + 1), board.Get(x, y - 1),
            board.Get(x - 1, y), board.Get(x + 1, y)
        );
    }
}
