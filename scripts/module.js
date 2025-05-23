import { MovementSettingsData } from "./data-store.js";
import { MovementSettingsConfig } from "./form-application.js";
import { canDragWrapperFactory } from "./can-drag-wrapper.js";
import { getShiftedPointWrapperFactory } from "./get-shifted-point-wrapper.js";

const dataStoresMap = new Map();
let settingsConfigForm;

Hooks.on("init", () => {
  settingsConfigForm = new MovementSettingsConfig();

  try {
    libWrapper.register(
      "token-movement-settings",
      "Token.prototype._canDrag",
      canDragWrapperFactory(dataStoresMap),
      "WRAPPER"
    );
    libWrapper.register(
      "token-movement-settings",
      "Token.prototype._canDragLeftStart",
      canDragWrapperFactory(dataStoresMap),
      "WRAPPER"
    );
    libWrapper.register(
      "token-movement-settings",
      "foundry.grid.GridlessGrid.prototype.getShiftedPoint",
      getShiftedPointWrapperFactory(dataStoresMap),
      "WRAPPER"
    );
  } catch (e) {
    console.error("Failed to register function wrappers");
  }
});

Hooks.on("getSceneDirectoryEntryContext", (_, contextOptions) => {
  contextOptions.push({
    name: game.i18n.localize(
      "TOKEN-MOVEMENT-SETTINGS.configureMovementContextLabel"
    ),
    icon: "<i class='fa-solid fa-shoe-prints fa-fw'></i>",
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
    condition: () => game.user.isGM,
  });
});

Hooks.on("ready", () => {
  if (!game.modules.get("lib-wrapper")?.active && game.user.isGM) {
    ui.notifications.error(
      "Module token-movement-settings requires the 'libWrapper' module. Please install and activate it."
    );
  }

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
