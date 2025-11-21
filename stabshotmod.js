// ===== StabShot Mod =====
// When a fishing rod named "stabshot" breaks,
// it fires a TNT projectile straight downward like a javelin.

registerEvent("onItemUse", function (event) {
    const item = player.getHeldItem();

    // Only trigger for our custom rod
    if (!item || item.name.toLowerCase() !== "stabshot") return;

    // Track durability before use so we know when it breaks
    event.itemBefore = item.getDamage();
});

registerEvent("onItemBreak", function (event) {
    const item = event.item;

    // Only trigger for our custom rod
    if (!item || item.name.toLowerCase() !== "stabshot") return;

    // Player position
    const pos = player.getPos();

    // Direction straight down (0, -1, 0)
    const direction = { x: 0, y: -1, z: 0 };

    // Spawn TNT entity acting like a downward javelin
    const tnt = world.spawnEntity("PrimedTnt", {
        x: pos.x,
        y: pos.y - 1,
        z: pos.z
    });

    // Give TNT velocity straight down
    tnt.setVelocity(direction.x * 2, direction.y * 2, direction.z * 2);

    // Optional: sound effect
    world.playSound("random.explode", pos.x, pos.y, pos.z, 1, 1);
});
