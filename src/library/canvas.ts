export class AutomatonCanvas {
    private Canvas: HTMLCanvasElement;

    public readonly Resolution: number;
    public readonly Context: CanvasRenderingContext2D;

    /**
     * @param id HTML element-id
     * @param width Amount of cells on the x-axis
     * @param height Amount of cells on the y-axis
     * @param resolution Pixel width/height of each cell
     */
    constructor(id: string, width: number, height: number, resolution: number) {
        this.Canvas = document.getElementById(id) as HTMLCanvasElement;
        this.Canvas.width = width;
        this.Canvas.height = height;

        this.Context = this.Canvas.getContext("2d", { alpha: false, });
        this.Resolution = resolution;
    }

    /** Canvas width in pixels */
    public get PixelWidth() { return this.Canvas.width; }
    /** Canvas height in pixels */
    public get PixelHeight() { return this.Canvas.height; }

    /** Amount of cells on x-axis */
    public get BoardWidth() { return this.PixelWidth / this.Resolution; }
    /** Amount of cells on y-axis */
    public get BoardHeight() { return this.PixelHeight / this.Resolution; }
}
