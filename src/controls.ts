import { Utility } from "./helpers/utility";

const PauseButton = document.getElementById("StartStopButton") as HTMLButtonElement;
const StepButton = document.getElementById("SingleStepButton") as HTMLButtonElement;
const TimeoutInput = document.getElementById("TimeoutInput") as HTMLInputElement;
const Canvas = document.getElementById("canvas") as HTMLCanvasElement;
const AutomatonSelection = document.getElementById("AutomatonSelection") as HTMLSelectElement;

export var Running = false;

export interface ControlSettings {
    Resolution: number;
    Timeout: number;
    SingleStep: () => void;
    OnClickCell: (x: number, y: number) => void;

    StartAutomaton: string;
    Automatons: string[];
    OnAutomatonSelect: (name: string) => void;
}

export function initControls(settings: ControlSettings) {
    PauseButton.addEventListener("click", () => Running = !Running);

    StepButton.addEventListener("click", settings.SingleStep);

    TimeoutInput.value = settings.Timeout.toString();
    TimeoutInput.addEventListener("change", () => {
        settings.Timeout = Utility.minMax(-1, Number(TimeoutInput.value), 1000);
        TimeoutInput.value = settings.Timeout.toString();
    });

    Canvas.addEventListener("click", (ev) => {
        settings.OnClickCell(
            Math.floor(ev.offsetX / settings.Resolution),
            Math.floor(ev.offsetY / settings.Resolution)
        );
    });

    AutomatonSelection.addEventListener("change",
        () => settings.OnAutomatonSelect(AutomatonSelection.value));
    for (const automaton of settings.Automatons) {
        const opt = document.createElement("option");
        opt.innerText = automaton;
        opt.value = automaton;
        AutomatonSelection.add(opt);
    }
    AutomatonSelection.value = settings.StartAutomaton;

    return settings;
}
