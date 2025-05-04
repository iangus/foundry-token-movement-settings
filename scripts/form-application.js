import { CONSTANTS } from "./constants.js";

export class MovementSettingsConfig extends FormApplication {
  static get defaultOptions() {
    const overrides = {
      height: "auto",
      id: "movement-settings",
      template: CONSTANTS.TEMPLATE,
      title: "Scene Movement Settings",
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
    console.log(formData);
  }
}
