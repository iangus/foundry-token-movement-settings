export function canDragWrapperFactory(movementSettingsMap) {
  return (wrapped, user, event) => {
    const canDrag = wrapped(user, event);
    try {
      if (user.isGM) {
        return canDrag;
      }

      const token = event.interactionData.object;
      const sceneId = token.scene.id;
      const sceneSettings = movementSettingsMap.get(sceneId)?.getSettings();
      if (!sceneSettings?.blockMouseMovement) {
        return canDrag;
      }

      if (
        sceneSettings?.allowCombatDragMovement &&
        token.inCombat &&
        token.combatant.combat.isActive &&
        token.combatant.combat.started
      ) {
        return canDrag;
      }

      ui.notifications.warn(
        "Token drag movement is disabled in this scene. Use the arrow keys to move."
      );
      return false;
    } catch (e) {
      console.error("Error checking token movement settings", e);
    }

    return canDrag;
  };
}
