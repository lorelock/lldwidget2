"use strict";

function dice_initialize(container) {
    $t.remove($t.id('loading_text'));

    var canvas = $t.id('canvas');
    canvas.style.width = window.innerWidth - 1 + 'px';
    canvas.style.height = window.innerHeight - 1 + 'px';

    var rollButton = $t.id('rollButton');

    var box = new $t.dice.dice_box(canvas, { w: 500, h: 300 });

    function rollDice() {
        var diceTypes = ['d4', 'd6', 'd8', 'd10', 'd12', 'd20'];
        var vectors = diceTypes.map(function(type) {
            // Spawn dice from off-screen
            var vector = {
                x: Math.random() < 0.5 ? -box.w * (Math.random() + 0.5) : box.w * (Math.random() + 0.5),
                y: Math.random() < 0.5 ? -box.h * (Math.random() + 0.5) : box.h * (Math.random() + 0.5)
            };
            var boost = Math.random() * 2 + 1; // Increased boost for more bounce
            var velocity = { x: vector.x * 0.75, y: vector.y * 0.75, z: -10 }; // Increased velocity
            var angularVelocity = {
                x: Math.random() * 1.5 - 0.75, // Slightly increased angular velocity
                y: Math.random() * 1.5 - 0.75,
                z: Math.random() * 1.5 - 0.75
            };
            return {
                set: type,
                pos: { x: vector.x, y: vector.y, z: 200 },
                velocity: velocity,
                angle: angularVelocity,
                axis: { x: Math.random(), y: Math.random(), z: Math.random(), a: Math.random() }
            };
        });
        box.clear();
        box.roll(vectors, null, function(result) {
            console.log(result); // Output result or handle it as needed
        });
    }

    rollButton.addEventListener('click', rollDice);

    // Roll the dice once as soon as the page loads
    rollDice();
}
