import { initControls, Running } from "./controls";
import { BriansBrain } from "./examples/BriansBrain";
import { DayAndNight } from "./examples/DayAndNight";
import { GameOfLife } from "./examples/GameOfLife";
import { RandomBlinkTest } from "./examples/RandomBlink";
import { Utility } from "./helpers/utility";
import { AutomatonCanvas } from "./library/canvas";
import { AutomatonDefinition } from "./library/types";


const Automatons = [
    BriansBrain.AutomatonDefinition,
    DayAndNight.AutomatonDefinition,
    GameOfLife.AutomatonDefinition,
    RandomBlinkTest.AutomatonDefinition,
];

let chosen = Automatons[3] as AutomatonDefinition<any, any>;
const canvas = new AutomatonCanvas("canvas", 800, 800, 10);
const automaton = Utility.createSimulation(canvas, chosen)
const settings = initControls({
    Resolution: canvas.Resolution,
    Timeout: 50,
    SingleStep: () => automaton.AdvanceGeneration(),
    OnClickCell: (x: number, y: number) =>
        automaton.SetCell(x, y, chosen.OnClickFunction(automaton.GetCell(x, y))),
});

function Loop() {
    setTimeout(() => {
        if (Running)
            automaton.AdvanceGeneration();
        automaton.Render(canvas.Context, canvas.Resolution);
        Loop();
    }, settings.Timeout);
}
Loop();
