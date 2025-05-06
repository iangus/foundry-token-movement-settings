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
    ui.notifications.info("Token movement settings saved.");

    this.render();
  }

  /**
   * @override
   */
  _render(force, options) {
    if (options.settingsData) {
      // Foundry mergeObject util tries to merge settings data instances
      // Handle the override so we can keep separate instances for each scene intact
      this.options.settingsData = options.settingsData;
      delete options.settingsData;
    }
    return super._render(force, options);
  }
}
