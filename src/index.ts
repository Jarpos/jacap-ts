import { initControls, Running } from "./controls";
import { GameOfLife } from "./examples/gameoflife";
import { Simulator } from "./library/simulator";

const RESOLUTION = 50;
const WIDTH = 750;
const HEIGHT = 750;

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
canvas.width = WIDTH;
canvas.height = HEIGHT;
const context = canvas.getContext("2d", { alpha: false, });

var sim = new Simulator(WIDTH / RESOLUTION, HEIGHT / RESOLUTION)
    .Initialize(GameOfLife.InitFunction);

function Loop() {
    setTimeout(() => {
        if (Running)
            sim.AdvanceGeneration();
        sim.Render(context, RESOLUTION);
        Loop();
    }, 100);
}
Loop();

initControls(
    () => sim.AdvanceGeneration(),
    RESOLUTION,
    (x, y) => sim.SetCell(x, y, new GameOfLife(1))
);
