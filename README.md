# jacap-ts - Just Another Cellular Automata Project - TypeScript
This is a very simple project to play around with some simple cellular automatons.

The code is quite messy sadly... But for now I haven't found the muse to rework it, so for now it'll stay like this.


## Table of Contents
- [jacap-ts - Just Another Cellular Automata Project - TypeScript](#jacap-ts---just-another-cellular-automata-project---typescript)
  - [Table of Contents](#table-of-contents)
  - [Todo](#todo)
  - [Automatons](#automatons)
    - [Ideas for others](#ideas-for-others)
  - [Automaton Setup](#automaton-setup)


## Todo
- Rework controls
- Add more controls
- Add support for rulestrings (https://conwaylife.com/wiki/Rulestring)


## Automatons
| Name              | Explanation                                                                        |
| ----------------- | ---------------------------------------------------------------------------------- |
| Brians Brain      | https://conwaylife.com/wiki/OCA:Brian's_Brain                                      |
| Day and Night     | https://conwaylife.com/wiki/OCA:Day_%26_Night                                      |
| Explosions        | Just some walls and a floor, where you can place "explosions" that expand outwards |
| Fire              | A grassy field and some trees, which you can set on fire                           |
| Game of Life      | https://conwaylife.com/wiki/Conway%27s_Game_of_Life                                |
| Random Blink Test | Randomly initialized field, which blinks                                           |
| Water             | Some falling drops of water                                                        |

### Ideas for others
- Seeds (https://conwaylife.com/wiki/OCA:Seeds)


## Automaton Setup
This is the basic "layout"/"setup" for an automaton. (Everything that needs replacing is marked with `__` in front of it)

```ts
import { Utility } from "../helpers/utility";
import { AutomatonDefinition, Color } from "../library/types";

export namespace __AUTOMATON_NAME {
    export const Update = (current: __CELL_TYPE, _: __NEIGHBORHOOD_TYPE) => __NEW_VALUE;
    export const Color = (state: __CELL_TYPE): Color => __COLOR;

    export const RandomInitialization = (x: number, y: number) => Utility.chooseRandom(__VALUES);

    export const AutomatonDefinition: AutomatonDefinition<__CELL_TYPE, __NEIGHBORHOOD_TYPE> = {
        AutomatonFunctions: {
            NeighborFunction: __NEIGHBORHOOD_FUNCTION,
            UpdateFunction: Update,
            ColorFunction: Color,
        },
        InitializationFunctions: [
            { Name: "Random", Function: RandomInitialization },
        ],
        OnClickFunction: (value) => __NEW_VALUE,
    };
}
```
