import { CONSTANTS } from "./constants.js";

export class MovementSettingsData {
  #scene;

  constructor(scene) {
    this.#scene = scene;
    const existingSettings = this.getSettings();
    if (!existingSettings) {
      this.setSettings(MovementSettingsData.defaultSettings);
    } else {
      const missingSettings = Object.keys(MovementSettingsData.defaultSettings)
        .filter((key) => existingSettings[key] === undefined)
        .reduce((obj, key) => {
          obj[key] = MovementSettingsData.defaultSettings[key];
          return obj;
        }, {});

      if (Object.keys(missingSettings).length > 0) {
        this.updateSettings(missingSettings);
      }
    }
  }

  static get defaultSettings() {
    return {
      blockMouseMovement: false,
      gridlessMovementModifier: 1,
    };
  }

  getSettings() {
    return this.#scene.getFlag(CONSTANTS.SCOPE, CONSTANTS.FLAGS.SETTINGS);
  }

  async setSettings(settings) {
    await this.#scene.setFlag(
      CONSTANTS.SCOPE,
      CONSTANTS.FLAGS.SETTINGS,
      settings
    );
  }

  async updateSettings(partialSettings) {
    const settings = this.getSettings();
    await this.#scene.setFlag(CONSTANTS.SCOPE, CONSTANTS.FLAGS.SETTINGS, {
      ...settings,
      ...partialSettings,
    });
  }

  async deleteSettings() {
    await this.#scene.unsetFlag(CONSTANTS.SCOPE, CONSTANTS.FLAGS.SETTINGS);
  }
}
