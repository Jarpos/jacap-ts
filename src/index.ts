import { initControls, Running } from "./controls";
import { GameOfLife, GoLStates } from "./examples/gameoflife";
import { RandomBlinkTest } from "./examples/randomblink";
import { Neighborhood } from "./library/neighborhood";
import { Simulator } from "./library/simulator";

const RESOLUTION = 50;
const WIDTH = 600;
const HEIGHT = 600;

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
canvas.width = WIDTH;
canvas.height = HEIGHT;
const context = canvas.getContext("2d", { alpha: false, });

// var sim = new Simulator<boolean, Neighborhood<boolean>>(WIDTH / RESOLUTION, HEIGHT / RESOLUTION, {
//     NeighborFunction: Neighborhood.GetNeumannNeighborhood,
//     UpdateFunction: RandomBlinkTest.Update,
//     ColorFunction: RandomBlinkTest.Color,
// }).Initialize(RandomBlinkTest.InitFunction);

var sim = new Simulator<GoLStates, Neighborhood<GoLStates>>(WIDTH / RESOLUTION, HEIGHT / RESOLUTION, {
    NeighborFunction: Neighborhood.GetMooreNeighborhood,
    UpdateFunction: GameOfLife.Update,
    ColorFunction: GameOfLife.Color,
}).Initialize(GameOfLife.InitFunction);

function Loop() {
    setTimeout(() => {
        if (Running)
            sim.AdvanceGeneration();
        sim.Render(context, RESOLUTION);
        Loop();
    }, 100);
}
Loop();

initControls({
    Resolution: RESOLUTION,
    SingleStep: () => sim.AdvanceGeneration(),
    OnClickCell: (x: number, y: number) => sim.SetCell(x, y, GoLStates.Alive),
    LogFunction: () => {
        // sim.PreviousBoard.Log()
        // sim.CurrentBoard.Log()
    },
});
