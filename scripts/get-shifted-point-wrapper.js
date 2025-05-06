export function getShiftedPointWrapperFactory(movementSettingsMap) {
  return (wrapped, point, direction) => {
    const updatedPoint = wrapped(point, direction);
    try {
      const currentScene = game.canvas.scene;
      const movementSettings = movementSettingsMap
        .get(currentScene?.id)
        ?.getSettings();
      const modifier = movementSettings?.gridlessMovementModifier;

      if (typeof modifier !== "number") {
        return updatedPoint;
      }

      const dX = updatedPoint.x - point.x;
      const dY = updatedPoint.y - point.y;

      return {
        x: point.x + dX * modifier,
        y: point.y + dY * modifier,
      };
    } catch (e) {
      console.error("Error checking token movement settings", e);
    }

    return updatedPoint;
  };
}
