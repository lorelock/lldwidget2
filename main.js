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
                x: (Math.random() * 2 - 1) * box.w,
                y: (Math.random() * 2 - 1) * box.h
            };
            var boost = Math.random() * 5 + 2; // Randomize boost for each die
            return box.generate_vectors({ set: [type] }, vector, boost)[0];
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
