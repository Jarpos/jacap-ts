import { Board } from "./board";
import { Neighborhood } from "./neighborhood";

export type color = `rgb(${number}, ${number}, ${number})` | `#${string}`;

export interface Cell {
    get Color(): color;
    Update(neighbors: Neighborhood): void;
}
