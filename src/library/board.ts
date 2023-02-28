import { Cell } from "./types";

export class Board {
    private Board: Cell[][];
    public readonly Width: number;
    public readonly Height: number;

    constructor(width: number, height: number) {
        this.Width = width
        this.Height = height;
        this.Board = Array.from(
            Array(height), () => new Array(width).fill(null)
        );
    }

    public Get(x: number, y: number): Cell {
        return this.Board[(y + this.Height) % this.Height][(x + this.Height) % this.Width];
    }

    public Set(x: number, y: number, value: Cell) {
        this.Board[(y + this.Height) % this.Height][(x + this.Height) % this.Width] = value;
    }
}
