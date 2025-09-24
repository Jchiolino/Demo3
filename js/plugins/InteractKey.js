/*:
 * @plugindesc Adds an E-key interact from 1 tile away for Action Button events, with a subtle balloon hint. v1.0
 * @author Kitt/rapidrecharge/jchiolino
 * @help Press E near an Action Button event (priority: Same as characters) to start it.
 */

(function() {
  // 1) Map E to our action
  Input.keyMapper[69] = 'interact'; // 69 = 'E'

  // Utility: is event a valid "Action Button" target?
  function isActionEvent(ev) {
    if (!ev) return false;
    const page = ev.page();
    if (!page) return false;
    // Trigger 0 = Action Button
    const trigger = page.trigger;
    return trigger === 0 && ev.isNormalPriority(); // "Same as characters"
  }

  // Get nearest valid event within range (Manhattan distance)
  function nearestEventInRange(range) {
    let best = null, bestDist = 999;
    const px = $gamePlayer.x, py = $gamePlayer.y;
    for (const ev of $gameMap.events()) {
      if (!isActionEvent(ev)) continue;
      const d = $gameMap.distance(px, py, ev.x, ev.y);
      if (d <= range && d < bestDist) { best = ev; bestDist = d; }
    }
    return best;
  }

  // 2) Scene_Map update hook
  const _Scene_Map_update = Scene_Map.prototype.update;
  Scene_Map.prototype.update = function() {
    _Scene_Map_update.call(this);

    // Show hint & handle input
    const ev = nearestEventInRange(1);
    // Optional balloon hint: type 1 (exclamation). Throttle so it doesn't spam.
    if (ev) {
      ev._kmBalloonWait = ev._kmBalloonWait || 0;
      if (ev._kmBalloonWait <= 0 && !ev.isBalloonPlaying()) {
        ev.requestBalloon(1);
        ev._kmBalloonWait = 30; // ~0.5s
      }
      if (ev._kmBalloonWait > 0) ev._kmBalloonWait--;

      // Press E to start the event
      if (Input.isTriggered('interact') && !$gameMap.isEventRunning()) {
        ev.start();
      }
    }
  };
})();
