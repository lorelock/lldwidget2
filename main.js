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
            var vector = {
                x: (Math.random() * 0.2 - 0.1) * box.w, // Even smaller random range
                y: (Math.random() * 0.2 - 0.1) * box.h  // Even smaller random range
            };
            var boost = Math.random() * 1.5 + 0.5; // Further reduced boost
            var velocity = { x: vector.x * 0.5, y: vector.y * 0.5, z: -5 }; // Reduced velocity
            var angularVelocity = {
                x: Math.random() * 1 - 0.5, // Reduced angular velocity
                y: Math.random() * 1 - 0.5,
                z: Math.random() * 1 - 0.5
            };
            return {
                set: type,
                pos: { x: vector.x, y: vector.y, z: 100 },
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
