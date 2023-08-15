import { Board } from "./board";

export class Neighborhood<T> {
    /** Northern Cell */ public readonly N: T;
    /** Southern Cell */ public readonly S: T;
    /** Eastern Cell  */ public readonly E: T;
    /** Western Cell  */ public readonly W: T;

    /** North Western Cell */ public readonly NW: T;
    /** North Eastern Cell */ public readonly NE: T;
    /** South Western Cell */ public readonly SW: T;
    /** South Eastern Cell */ public readonly SE: T;

    /**
     * @param n northern cell
     * @param s southern cell
     * @param w western cell
     * @param e eastern cell
     *
     * @param nw north-western cell
     * @param ne north-eastern cell
     * @param sw south-western cell
     * @param se south-eastern cell
     */
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

    /**
     * @param board board to get neighborhood from
     * @param x x-coordinate of central cell
     * @param y y-coordinate of central cell
     * @returns Moore Neighborhood (all 8 surrounding cells)
     */
    static GetMooreNeighborhood<T>(board: Board<T>, x: number, y: number) {
        return new Neighborhood<T>(
            board.Get(x, y - 1), board.Get(x, y + 1),
            board.Get(x - 1, y), board.Get(x + 1, y),

            board.Get(x - 1, y - 1), board.Get(x + 1, y - 1),
            board.Get(x - 1, y + 1), board.Get(x + 1, y + 1)
        );
    }

    /**
     * @param board board to get neighborhood from
     * @param x x-coordinate of central cell
     * @param y y-coordinate of central cell
     * @returns Neumann Neighborhood (n, s, e, w cells)
     */
    static GetNeumannNeighborhood<T>(board: Board<T>, x: number, y: number) {
        return new Neighborhood<T>(
            board.Get(x, y - 1), board.Get(x, y + 1),
            board.Get(x - 1, y), board.Get(x + 1, y)
        );
    }

    /**
     * @param comparator function to decide if cell should be included in the count
     * @returns Moore count as decided by `comparator`
     */
    public GetMooreCount(comparator: (value: T) => boolean) {
        let count = this.GetNeumannCount(comparator);

        if (comparator(this.NW)) count++;
        if (comparator(this.NE)) count++;
        if (comparator(this.SW)) count++;
        if (comparator(this.SE)) count++;

        return count;
    }

    /**
     * @param accumulator acc function
     * @param initialValue init value
     * @returns left folded moore neighborhood
     */
    public MooreReduce(accumulator: (acc: T, cur: T) => T, initialValue: T) {
        let retv = this.NeumannReduce(accumulator, initialValue);

        retv = accumulator(retv, this.NW);
        retv = accumulator(retv, this.NE);
        retv = accumulator(retv, this.SW);
        retv = accumulator(retv, this.SE);

        return retv;
    }

    /**
     * @param comparator function to decide if cell should be included in the count
     * @returns Neumann count as decided by `comparator`
     */
    public GetNeumannCount(comparator: (value: T) => boolean) {
        let count = 0;

        if (comparator(this.N)) count++;
        if (comparator(this.S)) count++;
        if (comparator(this.W)) count++;
        if (comparator(this.E)) count++;

        return count;
    }

    /**
     * @param accumulator acc function
     * @param initialValue init value
     * @returns left folded neumann neighborhood
     */
    public NeumannReduce(accumulator: (acc: T, cur: T) => T, initialValue: T) {
        let retv = initialValue;

        retv = accumulator(retv, this.N)
        retv = accumulator(retv, this.S)
        retv = accumulator(retv, this.W)
        retv = accumulator(retv, this.E)

        return retv;
    }
}
