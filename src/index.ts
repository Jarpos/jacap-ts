import { Board } from "./library/board";
import { Simulator } from "./library/simulator";

let canvas = document.getElementById("canvas") as HTMLCanvasElement;
let context = canvas.getContext("2d", { alpha: false, });

var b = new Simulator(10, 15, );
