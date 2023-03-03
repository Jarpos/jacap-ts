import { initControls, Running } from "./controls";
import { GameOfLife } from "./examples/gameoflife";
import { RandomBlinkTest } from "./examples/randomblink";
import { SimulatorCanvas } from "./library/canvas";
import { Simulator } from "./library/simulator";

const canvas = new SimulatorCanvas("canvas", 750, 750, 10);

// var sim = new Simulator(canvas.CellsX, canvas.CellsY, RandomBlinkTest.Functions)
//     .Initialize(RandomBlinkTest.InitFunction);

var sim = new Simulator(canvas.CellsX, canvas.CellsY, GameOfLife.Functions)
    .Initialize(GameOfLife.InitFunction);

function Loop() {
    setTimeout(() => {
        if (Running)
            sim.AdvanceGeneration();
        sim.Render(canvas.Context, canvas.Resolution);
        Loop();
    }, 100);
}
Loop();

initControls({
    Resolution: canvas.Resolution,
    SingleStep: () => sim.AdvanceGeneration(),
    OnClickCell: (x: number, y: number) =>
        sim.SetCell(
            x, y,
            sim.GetCell(x, y) === GameOfLife.States.Alive
                ? GameOfLife.States.Dead : GameOfLife.States.Alive
        ),
});
