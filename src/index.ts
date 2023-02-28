import { CellTest } from "./examples/randomblink";
import { Simulator } from "./library/simulator";

const RESOLUTION = 25;
const WIDTH = 750;
const HEIGHT = 750;

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
canvas.width = WIDTH;
canvas.height = HEIGHT;
const context = canvas.getContext("2d", { alpha: false, });

var sim = new Simulator(WIDTH / RESOLUTION, HEIGHT / RESOLUTION)
    .Initialize(CellTest.InitFunction);

function Loop() {
    setTimeout(() => {
        sim.Render(context, RESOLUTION);
        sim.AdvanceGeneration();
        Loop();
    }, 500);
}
sim.Render(context, RESOLUTION);
Loop();
