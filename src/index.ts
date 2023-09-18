import { initControls, Running } from "./controls";
import { Recording } from "./helpers/recording";
import { Utility } from "./helpers/utility";
import { Automaton } from "./library/automaton";
import { AutomatonCanvas } from "./library/canvas";
import { AutomatonDefinition } from "./library/types";

import { BriansBrain } from "./examples/BriansBrain";
import { DayAndNight } from "./examples/DayAndNight";
import { Explosions } from "./examples/Explosions";
import { Fire } from "./examples/Fire";
import { GameOfLife } from "./examples/GameOfLife";
import { Movers } from "./examples/Movers";
import { PlayingAround } from "./examples/PlayingAround";
import { RandomBlinkTest } from "./examples/RandomBlink";
import { Water } from "./examples/Water";

const Automatons = new Map<string, AutomatonDefinition<any, any>>([
    ["Brians Brain", /*******/ BriansBrain.AutomatonDefinition],
    ["Day and Night", /******/ DayAndNight.AutomatonDefinition],
    ["Explosions", /*********/ Explosions.AutomatonDefinition],
    ["Fire", /***************/ Fire.AutomatonDefinition],
    ["Game of Life", /*******/ GameOfLife.AutomatonDefinition],
    ["Movers", /*************/ Movers.AutomatonDefinition],
    ["Playing Around", /*****/ PlayingAround.AutomatonDefinition],
    ["Random Blink Test", /**/ RandomBlinkTest.AutomatonDefinition],
    ["Water", /**************/ Water.AutomatonDefinition],
]);

const names = Array.from(Automatons.keys());
const query = window.location.search.substring(1).replaceAll("%20", " ");
const startAutomaton = query && Automatons.has(query) ? query : Utility.chooseRandom(names);

const canvas = new AutomatonCanvas("canvas", 1000, 800, 10);
var chosen: AutomatonDefinition<any, any>;
var automaton: Automaton<any, any>;

const settings = initControls({
    Resolution: canvas.Resolution,
    Timeout: 50,
    SingleStep: () => automaton.AdvanceGeneration(),
    OnClickCell: (x: number, y: number) =>
        automaton.SetCell(x, y, chosen.OnClickFunction(automaton.GetCell(x, y))),

    StartAutomaton: startAutomaton,
    Automatons: names,
    OnAutomatonSelect: SelectAutomaton,

    Recorder: Recording.createRecorder(canvas),
});

SelectAutomaton(startAutomaton);
Loop();

function SelectAutomaton(name: string) {
    chosen = Automatons.get(name);
    automaton = Utility.createSimulation(canvas, chosen);
}

function Loop() {
    setTimeout(() => {
        // @TODO: find a way to make it run properly at max speed
        // (no, timeout 0 doesn't seem to do that for some reason)
        if (Running) {
            automaton.AdvanceGeneration();
        }

        automaton.Render(canvas.Context, canvas.Resolution);
        Loop();
    }, settings.Timeout);
}
