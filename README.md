# Demo 3 – Puzzle & Companion
# By Kitt/rapidrecharge/jchiolino

This demo expands on the basics from Demo 1 and Demo 2 by adding a simple push-block puzzle and a temporary companion system. It also includes a custom plugin for interact hotkeys.

---

## Features

### Puzzle Mechanics
- **Pushable Boulder** – player can push the boulder one tile at a time by walking into it.  
- **Pressure Switch** – activates only when stepped on or when the boulder is pushed onto it.  
- **Lever Reset** – if the boulder is pushed into a corner or inaccessible spot, the lever safely resets it to the starting position.  
- **Door Event** – responds dynamically to the switch being held down; opens/closes in real time.

### Companion System
- **Follower NPC (Sam)** – talk to Sam to recruit him.  
- **Party Swap** – the main party is temporarily dismissed and Sam joins as the sole companion.  
- **Rejoin Party** – talk to the dismissed members on the map to return to the full party.  
- **InfoGuy NPC** – explains the mechanics of the puzzle and follower system with branching dialogue for quick reference.

### Custom Plugin – `KM_InteractKey`
- Adds **E** as a hotkey to interact with nearby events (range = 1 tile).  
- Only works on events that normally use **Action Button**.  
- Shows a small balloon icon when you’re in range to hint interactivity.  
- Useful for puzzles, switches, or talking to NPCs without needing to face them directly.

---

## Demo Flow
1. Enter the house and encounter the **pushable boulder puzzle**.  
2. Use the **pressure switch** + boulder to open the door.  
3. If stuck, flip the **lever reset** to reset the boulder.  
4. Meet **Sam**, who offers to accompany you. Accepting her will **swap the party**.  
5. Rejoin the original party by talking to the group on the map.  
6. NPCs not in the party will have different movement routes.
7. Talk to **InfoGuy** to read explanations about the systems or skip directly to the parts you care about.  
8. Try using the **E key** near events to see the custom plugin in action.

---

## Technical Notes
- Puzzle uses **variables + region IDs** to detect boulder location.  
- Door is controlled by a **switch tied to the pressure plate’s state**.  
- Companion system uses **Change Party Member** commands and switches to swap party states cleanly.  
- Plugin uses **MV’s built-in pathfinding** and input mapper to extend interaction controls.  
- InfoGuy uses **nested choices** with “Back” options for smooth navigation.

---

 
