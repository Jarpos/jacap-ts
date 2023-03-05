export class Board<CellType> {
    private Board: CellType[][];
    public readonly Width: number;
    public readonly Height: number;

    constructor(width: number, height: number, defaultValue: CellType = null) {
        this.Width = width
        this.Height = height;
        this.Board = Array.from(
            Array(height), () => new Array(width).fill(defaultValue)
        );
    }

    public Get(x: number, y: number) {
        return this.Board[(y + this.Height) % this.Height][(x + this.Height) % this.Width];
    }

    public Set(x: number, y: number, value: CellType) {
        this.Board[(y + this.Height) % this.Height][(x + this.Height) % this.Width] = value;
    }
}
