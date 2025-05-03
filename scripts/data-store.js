import { CONSTANTS } from "./constants.js";

export class MovementSettingsData {
  #scene;

  constructor(scene) {
    this.#scene = scene;
  }

  getSettings() {
    return this.#scene.getFlag(CONSTANTS.SCOPE, CONSTANTS.FLAGS.SETTINGS);
  }

  updateSettings(partialSettings) {
    const settings = this.getSettings();
    this.#scene.setFlag(CONSTANTS.SCOPE, CONSTANTS.FLAGS.SETTINGS, {
      ...settings,
      ...partialSettings,
    });
  }

  deleteSettings() {
    this.#scene.unsetFlag(CONSTANTS.SCOPE, CONSTANTS.FLAGS.SETTINGS);
  }
}
