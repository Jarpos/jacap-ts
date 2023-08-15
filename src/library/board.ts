export class Board<CellType> {
    private Board: CellType[][];
    public readonly Width: number;
    public readonly Height: number;

    /**
     * @param width Amount of cells on the x-axis
     * @param height Amount of cells on the y-axis
     * @param defaultValue Default value for all cells
     */
    constructor(width: number, height: number, defaultValue: CellType = null) {
        this.Width = width
        this.Height = height;
        this.Board = Array.from(
            Array(height), () => new Array(width).fill(defaultValue)
        );
    }

    /**
     * Get a cell from the board (wrap-around, so no errors)
     * @param x x coordinate
     * @param y y coordinate
     * @returns `state` of cell
     */
    public Get(x: number, y: number) {
        return this.Board[(y + this.Height) % this.Height][(x + this.Height) % this.Width];
    }

    /**
     * Set a cell on the board (wrap-around, so no errors)
     * @param x x coordinate
     * @param y y coordinate
     * @returns `state` of cell
     */
    public Set(x: number, y: number, value: CellType) {
        this.Board[(y + this.Height) % this.Height][(x + this.Height) % this.Width] = value;
    }
}
