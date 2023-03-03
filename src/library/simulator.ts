import { Board } from "./board";
import { ColorFunction, InitializationFunction, NeighborFunction, UpdateFunction } from "./types";

export interface SimulatorSettings<CellType, NeighborType> {
    NeighborFunction: NeighborFunction<CellType, NeighborType>;
    UpdateFunction: UpdateFunction<CellType, NeighborType>;
    ColorFunction: ColorFunction<CellType>;
}

export class Simulator<CellType, NeighborType> {
    private Generation: number = 0;
    private EvenBoard: Board<CellType>;
    private OddBoard: Board<CellType>;

    private Settings: SimulatorSettings<CellType, NeighborType>;

    constructor(
        width: number, height: number,
        settings: SimulatorSettings<CellType, NeighborType>
    ) {
        this.EvenBoard = new Board(width, height);
        this.OddBoard = new Board(width, height);
        this.Settings = settings;
    }

    public Initialize(initFunction: InitializationFunction<CellType>) {
        let pb = this.PreviousBoard;
        let cb = this.CurrentBoard;

        for (let y = 0; y < pb.Height; y++) {
            for (let x = 0; x < pb.Width; x++) {
                const state = initFunction(x, y);
                pb.Set(x, y, state);
                cb.Set(x, y, state);
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
                    this.Settings.UpdateFunction(
                        pb.Get(x, y),
                        this.Settings.NeighborFunction(pb, x, y)
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
                context.fillStyle = this.Settings.ColorFunction(cb.Get(x, y));
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
