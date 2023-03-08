import { initControls, Running } from "./controls";
import { BriansBrain } from "./examples/BriansBrain";
import { DayAndNight } from "./examples/DayAndNight";
import { GameOfLife } from "./examples/GameOfLife";
import { RandomBlinkTest } from "./examples/RandomBlink";
import { Utility } from "./helpers/utility";
import { AutomatonCanvas } from "./library/canvas";
import { Automaton } from "./library/automaton";

const Automatons = [
    BriansBrain.AutomatonDefinition,
    DayAndNight.AutomatonDefinition,
    GameOfLife.AutomatonDefinition,
    RandomBlinkTest.AutomatonDefinition,
];

const canvas = new AutomatonCanvas("canvas", 800, 800, 10);
const automaton = Utility.createSimulation(canvas, BriansBrain.AutomatonDefinition)

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
            Utility.getNext(
                automaton.GetCell(x, y),
                [BriansBrain.States.On, BriansBrain.States.Dying, BriansBrain.States.Off],
            )
        ),
});
