export function canDragWrapperFactory(movementSettingsMap) {
  return (wrapped, user, event) => {
    const canDrag = wrapped(user, event);
    try {
      if (game.user.isGM) {
        return canDrag;
      }

      console.log(event);
    } catch (e) {
      console.error("Error checking token movement settings", e);
    }

    return canDrag;
  };
}
