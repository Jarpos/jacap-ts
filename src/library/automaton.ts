import { Board } from "./board";
import { InitializationFunction, AutomatonFunctions } from "./types";

export class Automaton<CellType, NeighborType> {
    private Generation: number = 0;
    private EvenBoard: Board<CellType>;
    private OddBoard: Board<CellType>;

    private Functions: AutomatonFunctions<CellType, NeighborType>;

    /**
     * @param width Amount of cells on the x-axis
     * @param height Amount of cells on the y-axis
     * @param functions Automaton functions
     */
    constructor(
        width: number, height: number,
        functions: AutomatonFunctions<CellType, NeighborType>
    ) {
        this.EvenBoard = new Board(width, height);
        this.OddBoard = new Board(width, height);
        this.Functions = functions;
    }

    /**
     * Initializes each cell using the `initFunction`
     * @param initFunction Initialization function, called on every cell
     */
    public Initialize(initFunction: InitializationFunction<CellType>) {
        for (let y = 0; y < this.CurrentBoard.Height; y++) {
            for (let x = 0; x < this.CurrentBoard.Width; x++) {
                this.CurrentBoard.Set(x, y, initFunction(x, y));
            }
        }
        return this;
    }

    /** Advances Generation on board, given the previous generation */
    public AdvanceGeneration() {
        this.Generation++;
        let cb = this.CurrentBoard;
        let pb = this.PreviousBoard;

        for (let y = 0; y < cb.Height; y++) {
            for (let x = 0; x < cb.Width; x++) {
                cb.Set(x, y,
                    this.Functions.UpdateFunction(
                        pb.Get(x, y),
                        this.Functions.NeighborFunction(pb, x, y)
                    )
                );
            }
        }
        return this;
    }

    /**
     * Renders `CurrentBoard` to given `context`
     * @param context html `<canvas>`-rendercontext to render automaton on
     * @param resolution resolution of canvas
     */
    public Render(context: CanvasRenderingContext2D, resolution: number) {
        let cb = this.CurrentBoard;
        for (let y = 0; y < cb.Height; y++) {
            for (let x = 0; x < cb.Width; x++) {
                context.beginPath();
                context.rect(x * resolution, y * resolution, resolution, resolution);
                context.fillStyle = this.Functions.ColorFunction(cb.Get(x, y));
                context.fill();
                context.stroke();
            }
        }
        return this;
    }

    /**
     * Get a cell from the automatons current board
     * @param x x coordinate
     * @param y y coordinate
     * @returns `state` of cell
     */
    public GetCell(x: number, y: number) {
        return this.CurrentBoard.Get(x, y);
    }

    /**
     * Set a cell on the automatons current board
     * @param x x coordinate
     * @param y y coordinate
     * @returns `state` of cell
     */
    public SetCell(x: number, y: number, value: CellType) {
        this.CurrentBoard.Set(x, y, value)
    }

    /** Board of previous generation */
    public get PreviousBoard() {
        return this.Generation % 2 ? this.EvenBoard : this.OddBoard;
    }

    /** Board of current generation */
    public get CurrentBoard() {
        return this.Generation % 2 ? this.OddBoard : this.EvenBoard;
    }
}
