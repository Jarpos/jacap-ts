const PauseButton = document.getElementById("StartStopButton");
const StepButton = document.getElementById("SingleStepButton");
const LogButton = document.getElementById("LogButton");
const Canvas = document.getElementById("canvas");

export var Running = false;

export interface ControlSettings {
    Resolution: number;
    SingleStep: () => void;
    OnClickCell: (x: number, y: number) => void;
    LogFunction: () => void;
}

export function initControls(settings: ControlSettings) {
    PauseButton.addEventListener("click", () => Running = !Running);

    StepButton.addEventListener("click", settings.SingleStep);

    Canvas.addEventListener("click", (ev) => {
        settings.OnClickCell(
            Math.floor(ev.offsetX / settings.Resolution),
            Math.floor(ev.offsetY / settings.Resolution)
        );
    });

    LogButton.addEventListener("click", settings.LogFunction);
}
