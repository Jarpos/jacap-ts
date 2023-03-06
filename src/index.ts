import { initControls, Running } from "./controls";
import { BriansBrain } from "./examples/BriansBrain";
import { DayAndNight } from "./examples/DayAndNight";
import { GameOfLife } from "./examples/GameOfLife";
import { RandomBlinkTest } from "./examples/RandomBlink";
import { Helpers } from "./helpers/simulate";
import { AutomatonCanvas } from "./library/canvas";
import { Automaton } from "./library/simulator";

const Automatons = [
    GameOfLife.AutomatonSettings,
    RandomBlinkTest.AutomatonSettings,
    DayAndNight.AutomatonSettings,
    BriansBrain.AutomatonSettings,
];

const canvas = new AutomatonCanvas("canvas", 800, 800, 10);
const automaton = Helpers.createSimulation(canvas, BriansBrain.AutomatonSettings)

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
            automaton.GetCell(x, y) === BriansBrain.States.Off
                ? BriansBrain.States.On : BriansBrain.States.Off
            // automaton.GetCell(x, y) === GameOfLife.States.Alive
            //     ? GameOfLife.States.Dead : GameOfLife.States.Alive
        ),
});
