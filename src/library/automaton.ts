import { Board } from "./board";
import { InitializationFunction, AutomatonFunctions } from "./types";

export class Automaton<CellType, NeighborType> {
    private Generation: number = 0;
    private EvenBoard: Board<CellType>;
    private OddBoard: Board<CellType>;

    private Functions: AutomatonFunctions<CellType, NeighborType>;

    constructor(
        width: number, height: number,
        functions: AutomatonFunctions<CellType, NeighborType>
    ) {
        this.EvenBoard = new Board(width, height);
        this.OddBoard = new Board(width, height);
        this.Functions = functions;
    }

    public Initialize(initFunction: InitializationFunction<CellType>) {
        for (let y = 0; y < this.CurrentBoard.Height; y++) {
            for (let x = 0; x < this.CurrentBoard.Width; x++) {
                this.CurrentBoard.Set(x, y, initFunction(x, y));
            }
        }
        return this;
    }

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

    public GetCell(x: number, y: number) {
        return this.CurrentBoard.Get(x, y);
    }

    public SetCell(x: number, y: number, value: CellType) {
        this.CurrentBoard.Set(x, y, value)
    }

    public get PreviousBoard() {
        return this.Generation % 2 ? this.EvenBoard : this.OddBoard;
    }

    public get CurrentBoard() {
        return this.Generation % 2 ? this.OddBoard : this.EvenBoard;
    }
}
