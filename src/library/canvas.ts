export class SimulatorCanvas {
    private Canvas: HTMLCanvasElement;

    public readonly Context: CanvasRenderingContext2D;
    public readonly Resolution: number;

    public get PixelWidth() { return this.Canvas.width; }
    public get PixelHeight() { return this.Canvas.height; }
    public get CellsX() { return this.PixelWidth / this.Resolution; }
    public get CellsY() { return this.PixelHeight / this.Resolution; }

    constructor(id: string, width: number, height: number, resolution: number) {
        this.Canvas = document.getElementById(id) as HTMLCanvasElement;
        this.Context = this.Canvas.getContext("2d", { alpha: false, });

        this.Canvas.width = width;
        this.Canvas.height = height;
        this.Resolution = resolution;
    }
}
