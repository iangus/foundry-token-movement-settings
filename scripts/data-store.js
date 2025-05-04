import { CONSTANTS } from "./constants.js";

export class MovementSettingsData {
  #scene;

  constructor(scene) {
    this.#scene = scene;
    if (!this.getSettings()) {
      this.setSettings(MovementSettingsData.defaultSettings);
    }
  }

  static get defaultSettings() {
    return {
      blockMouseMovement: false,
    };
  }

  getSettings() {
    return this.#scene.getFlag(CONSTANTS.SCOPE, CONSTANTS.FLAGS.SETTINGS);
  }

  setSettings(settings) {
    this.#scene.setFlag(CONSTANTS.SCOPE, CONSTANTS.FLAGS.SETTINGS, settings);
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
