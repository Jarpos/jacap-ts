import { Board } from "../library/board";

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

    public GetMooreCount(comparator: (value: T) => boolean) {
        let count = this.GetNeumannCount(comparator);

        if (comparator(this.NW)) count++;
        if (comparator(this.NE)) count++;
        if (comparator(this.SW)) count++;
        if (comparator(this.SE)) count++;

        return count;
    }

    public GetNeumannCount(comparator: (value: T) => boolean) {
        let count = 0;

        if (comparator(this.N)) count++;
        if (comparator(this.S)) count++;
        if (comparator(this.W)) count++;
        if (comparator(this.E)) count++;

        return count;
    }
}
