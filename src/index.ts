import { initControls, Running } from "./controls";
import { GameOfLife, GoLStates } from "./examples/gameoflife";
import { RandomBlinkTest } from "./examples/randomblink";
import { SimulatorCanvas } from "./library/canvas";
import { Neighborhood } from "./library/neighborhood";
import { Simulator } from "./library/simulator";

const canvas = new SimulatorCanvas("canvas", 750, 750, 10);

// var sim = new Simulator<boolean, Neighborhood<boolean>>(canvas.Width, canvas.Height, {
//     NeighborFunction: Neighborhood.GetNeumannNeighborhood,
//     UpdateFunction: RandomBlinkTest.Update,
//     ColorFunction: RandomBlinkTest.Color,
// }).Initialize(RandomBlinkTest.InitFunction);

var sim = new Simulator<GoLStates, Neighborhood<GoLStates>>(canvas.CellsX, canvas.CellsY, {
    NeighborFunction: Neighborhood.GetMooreNeighborhood,
    UpdateFunction: GameOfLife.Update,
    ColorFunction: GameOfLife.Color,
}).Initialize(GameOfLife.InitFunction);

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
            x, y, sim.GetCell(x, y) === GoLStates.Alive ? GoLStates.Dead : GoLStates.Alive
        ),
});
