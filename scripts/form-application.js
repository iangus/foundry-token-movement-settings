import { CONSTANTS } from "./constants.js";

export class MovementSettingsConfig extends FormApplication {
  static get defaultOptions() {
    const overrides = {
      height: "auto",
      id: "token-movement-settings",
      template: CONSTANTS.TEMPLATE,
      title: "Token Movement Settings",
      closeOnSubmit: false,
      settingsData: null,
    };

    const mergedOptions = foundry.utils.mergeObject(
      super.defaultOptions,
      overrides
    );

    return mergedOptions;
  }

  /**
   * @override
   */
  getData(options) {
    return options.settingsData.getSettings();
  }

  /**
   * @override
   */
  async _updateObject(_, formData) {
    await this.options.settingsData.updateSettings(formData);

    this.render();
  }
}
