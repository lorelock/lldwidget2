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
            // Spawn dice from random off-screen positions
            var spawnPosition = {
                x: Math.random() < 0.5 ? -box.w * (Math.random() + 0.5) : box.w * (Math.random() + 0.5),
                y: Math.random() < 0.5 ? -box.h * (Math.random() + 0.5) : box.h * (Math.random() + 0.5)
            };
            var boost = (Math.random() * 2.5 + 1.25) * 0.92; // Reduced boost by 8%
            var velocity = { x: spawnPosition.x * 0.92, y: spawnPosition.y * 0.92, z: -11.5 }; // Reduced velocity by 8%
            var angularVelocity = {
                x: (Math.random() * 1.75 - 0.875) * 0.92, // Reduced angular velocity by 8%
                y: (Math.random() * 1.75 - 0.875) * 0.92,
                z: (Math.random() * 1.75 - 0.875) * 0.92
            };
            return {
                set: type,
                pos: { x: spawnPosition.x, y: spawnPosition.y, z: 200 },
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

//below might be fucked

// Ensure the canvas and body background are transparent
document.body.style.backgroundColor = 'transparent';

const canvas = document.querySelector('#canvas');
if (canvas) {
    canvas.style.backgroundColor = 'transparent';
}
