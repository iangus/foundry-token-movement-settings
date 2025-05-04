import { MovementSettingsData } from "./data-store.js";
import { MovementSettingsConfig } from "./form-application.js";

const dataStoresMap = new Map();
let settingsConfigForm;

Hooks.on("init", () => {
  settingsConfigForm = new MovementSettingsConfig();
});

Hooks.on("getSceneDirectoryEntryContext", (_, contextOptions) => {
  contextOptions.push({
    name: "Configure Movement",
    icon: "<i class='fas fa-cogs fa-fw'></i>",
    classes: "",
    group: "",
    callback: (target) => {
      const { documentId } = target.data();
      const settingsData = dataStoresMap.get(documentId);

      if (!settingsData) {
        console.error(
          "Failed to find MovementSettingsData for document:",
          documentId
        );
        return;
      }

      settingsConfigForm.render(true, { settingsData });
    },
    condition: game.user.isGM,
  });
});

Hooks.on("ready", () => {
  game.scenes.forEach((scene) =>
    dataStoresMap.set(scene.id, new MovementSettingsData(scene))
  );
});

Hooks.on("createScene", (scene) => {
  dataStoresMap.set(scene.id, new MovementSettingsData(scene));
});

Hooks.on("deleteScene", (scene) => {
  dataStoresMap.delete(scene.id);
});

// TODO Create FormApplication for filling out settings
// TODO Use libWrapper to override Token._canDrag based on configured scene setting
// TODO figure out how to modify how much a token moves when using arrow keys
// TODO override grid.getShiftedPoint to calculate the movement relative to grid size
// TODO allow movement outside grid-snapping? is this how gridless works already? Look into why gridless can sometimes move the player into wierd positions
