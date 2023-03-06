export class AutomatonCanvas {
    private Canvas: HTMLCanvasElement;

    public readonly Resolution: number;
    public readonly Context: CanvasRenderingContext2D;

    public get PixelWidth() { return this.Canvas.width; }
    public get PixelHeight() { return this.Canvas.height; }

    public get BoardWidth() { return this.PixelWidth / this.Resolution; }
    public get BoardHeight() { return this.PixelHeight / this.Resolution; }

    constructor(id: string, width: number, height: number, resolution: number) {
        this.Canvas = document.getElementById(id) as HTMLCanvasElement;
        this.Canvas.width = width;
        this.Canvas.height = height;

        this.Context = this.Canvas.getContext("2d", { alpha: false, });
        this.Resolution = resolution;
    }
}
