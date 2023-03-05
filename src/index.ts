import { initControls, Running } from "./controls";
import { GameOfLife } from "./examples/gameoflife";
import { RandomBlinkTest } from "./examples/randomblink";
import { SimulatorCanvas } from "./library/canvas";
import { Automaton } from "./library/simulator";

const canvas = new SimulatorCanvas("canvas", 750, 750, 10);

const Automatons = [
    GameOfLife.AutomatonSettings,
    RandomBlinkTest.AutomatonSettings,
];

const automaton = new Automaton(canvas.CellsX, canvas.CellsY, GameOfLife.AutomatonSettings.AutomatonFunctions)
    .Initialize(GameOfLife.RandomInitialization);

function Loop() {
    setTimeout(() => {
        if (Running)
            automaton.AdvanceGeneration();
        automaton.Render(canvas.Context, canvas.Resolution);
        Loop();
    }, 100);
}
Loop();

initControls({
    Resolution: canvas.Resolution,
    SingleStep: () => automaton.AdvanceGeneration(),
    OnClickCell: (x: number, y: number) =>
        automaton.SetCell(
            x, y,
            automaton.GetCell(x, y) === GameOfLife.States.Alive
                ? GameOfLife.States.Dead : GameOfLife.States.Alive
        ),
});
