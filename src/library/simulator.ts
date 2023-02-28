import { Board } from "./board";
import { Neighborhood } from "./neighborhood";
import { Cell } from "./types";

export class Simulator {
    private Generation: number = 0;
    private EvenBoard: Board;
    private OddBoard: Board;

    constructor(width: number, height: number) {
        this.EvenBoard = new Board(width, height);
        this.OddBoard = new Board(width, height);
    }

    public Initialize(initFunction: () => Cell) {
        let cb = this.CurrentBoard;

        for (let y = 0; y < cb.Height; y++) {
            for (let x = 0; x < cb.Width; x++) {
                cb.Set(x, y, initFunction());
            }
        }
        return this;
    }

    public AdvanceGeneration() {
        let cb = this.CurrentBoard;
        let pb = this.PreviousBoard;

        for (let y = 0; y < cb.Height; y++) {
            for (let x = 0; x < cb.Width; x++) {
                cb.Get(x, y).Update(Neighborhood.GetMooreNeighborhood(pb, x, y));
            }
        }
    }

    public Render(context: CanvasRenderingContext2D, resolution: number) {
        let cb = this.CurrentBoard;
        for (let y = 0; y < cb.Height; y++) {
            for (let x = 0; x < cb.Width; x++) {
                context.beginPath();
                context.rect(x * resolution, y * resolution, resolution, resolution);
                context.fillStyle = cb.Get(x, y).Color;
                context.fill();
                context.stroke();
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
