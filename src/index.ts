import { initControls, Running } from "./controls";
import { BriansBrain } from "./examples/BriansBrain";
import { DayAndNight } from "./examples/DayAndNight";
import { GameOfLife } from "./examples/GameOfLife";
import { RandomBlinkTest } from "./examples/RandomBlink";
import { Water } from "./examples/Water";
import { Utility } from "./helpers/utility";
import { AutomatonCanvas } from "./library/canvas";
import { AutomatonDefinition } from "./library/types";

const Automatons = new Map<String, AutomatonDefinition<any, any>>([
    ["Brians Brain", /*******/ BriansBrain.AutomatonDefinition],
    ["Day and Night", /******/ DayAndNight.AutomatonDefinition],
    ["Game of Life", /*******/ GameOfLife.AutomatonDefinition],
    ["Random Blink Test", /**/ RandomBlinkTest.AutomatonDefinition],
    ["Water", /**************/ Water.AutomatonDefinition],
]);

let chosen = Automatons.get("Water");
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
        // @TODO: find a way to make it run properly at max speed
        // (no, timeout 0 doesn't seem to do that for some reason)
        if (Running)
            automaton.AdvanceGeneration();
        automaton.Render(canvas.Context, canvas.Resolution);
        Loop();
    }, settings.Timeout);
}
Loop();
