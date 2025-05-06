export function canDragWrapperFactory(movementSettingsMap) {
  return (wrapped, user, event) => {
    const canDrag = wrapped(user, event);
    try {
      if (user.isGM) {
        return canDrag;
      }

      const sceneId = event.interactionData.object.scene.id;
      const sceneSettings = movementSettingsMap.get(sceneId)?.getSettings();
      if (!sceneSettings?.blockMouseMovement) {
        return canDrag;
      }

      return false;
    } catch (e) {
      console.error("Error checking token movement settings", e);
    }

    return canDrag;
  };
}
