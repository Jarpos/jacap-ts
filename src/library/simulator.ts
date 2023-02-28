import { Board } from "./board";
import { Neighborhood, Transform } from "./types";

export class Simulator<T> {
    private Generation: number = 0;
    private EvenBoard: Board<T>;
    private OddBoard: Board<T>;
    private NextFunction: Transform<T>;

    constructor(width: number, height: number, next: Transform<T>) {
        this.EvenBoard = new Board<T>(width, height);
        this.OddBoard = new Board<T>(width, height);
        this.NextFunction = next;
    }

    public AdvanceGeneration() {
        let cb = this.CurrentBoard;
        let pb = this.PreviousBoard;

        for (let y = 0; y < cb.Height; y++) {
            for (let x = 0; x < cb.Width; x++) {
                cb.Set(x, y, this.NextFunction(
                    Neighborhood.GetMooreNeighborhood(pb, x, y))
                );
            }
        }
    }

    public get PreviousBoard() {
        return !(this.Generation % 2) ? this.OddBoard : this.EvenBoard;
    }

    public get CurrentBoard() {
        return this.Generation % 2 ? this.OddBoard : this.EvenBoard;
    }
}
