import { MovementSettingsData } from "./data-store.js";

const dataStoresMap = new Map();

Hooks.on("ready", function () {
  game.scenes.forEach((scene) =>
    dataStoresMap.set(scene.id, new MovementSettingsData(scene))
  );
  console.log(dataStoresMap);
});

// TODO Inject html to open movement settings config. In scene context menu or scene config dialog?
// TODO Create FormApplication for filling out settings
// TODO Use libWrapper to override Token._canDrag based on configured scene setting
// TODO figure out how to modify how much a token moves when using arrow keys
// TODO override grid.getShiftedPoint to calculate the movement relative to grid size
// TODO allow movement outside grid-snapping? is this how gridless works already? Look into why gridless can sometimes move the player into wierd positions
