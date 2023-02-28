const PauseButton = document.getElementById("StartStopButton");
const StepButton = document.getElementById("SingleStepButton");
const Canvas = document.getElementById("canvas");

export var Running = false;

export function initControls(singleStep: () => void, resolution: number, onClickCell: (x, y) => void) {
    PauseButton.addEventListener("click", () => Running = !Running);
    StepButton.addEventListener("click", singleStep);
    Canvas.addEventListener("click", (ev) => {
        onClickCell(
            Math.floor(ev.offsetX / resolution),
            Math.floor(ev.offsetY / resolution)
        );
    });
}
