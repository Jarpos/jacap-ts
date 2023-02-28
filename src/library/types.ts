import { Board } from "./board";
import { Neighborhood } from "./neighborhood";

export type color = `rgb(${number}, ${number}, ${number})` | `#${string}`;

export interface Cell<T> {
    State: T;
    get Color(): color;
    Update(neighbors: Neighborhood<T>): void;
}
