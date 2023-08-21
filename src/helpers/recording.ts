import { AutomatonCanvas } from "../library/canvas";

export namespace Recording {

    /**
     * Get a recorder that, when stopped, saves the file using the `name`
     * @param canvas Canvas to record
     * @param name Name of file (with appended `.webm` file extension)
     * @returns `recorder` with which you can
     *          make a recording using `.start()` and `.stop()`
     */
    export function createRecorder(
        canvas: AutomatonCanvas, name: string = Date.now().toString()
    ) {
        const stream = canvas.Canvas.captureStream(1000 / 50);
        const recorder = new MediaRecorder(stream, { mimeType: "video/webm" });
        recorder.ondataavailable = (ev: BlobEvent) => {
            const blob = new Blob([ev.data], { type: "video/webm", });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${name}.webm`;
            a.click();
            window.URL.revokeObjectURL(url);
        };

        return recorder;
    }

}
