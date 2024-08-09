"use strict";

function dice_initialize(container) {
    $t.remove($t.id('loading_text'));

    var canvas = $t.id('canvas');
    canvas.style.width = window.innerWidth - 1 + 'px';
    canvas.style.height = window.innerHeight - 1 + 'px';
    var label = $t.id('label');
    var rollButton = $t.id('rollButton');
    on_set_change();

    $t.dice.use_true_random = false;

    function on_set_change(ev) { /* Set change not needed */ }

    var params = $t.get_url_params();

    if (params.chromakey) {
        $t.dice.desk_color = 0xf5f5f7;
        $t.id('control_panel').style.display = 'none';
    }
    if (params.shadows == 0) {
        $t.dice.use_shadows = false;
    }

    var box = new $t.dice.dice_box(canvas, { w: 500, h: 300 });
    box.animate_selector = false;

    $t.bind(window, 'resize', function() {
        canvas.style.width = window.innerWidth - 1 + 'px';
        canvas.style.height = window.innerHeight - 1 + 'px';
        box.reinit(canvas, { w: 500, h: 300 });
    });

    function before_roll(vectors, notation, callback) {
        callback();
    }

    function notation_getter() {
        return $t.dice.parse_notation("1d4 + 1d6 + 1d8 + 1d10 + 1d20");
    }

    function after_roll(notation, result) {
        if (params.chromakey || params.noresult) return;
        var res = result.join(' + ');
        if (notation.constant) {
            res += ' (';
            if (notation.constant > 0) res += '+' + notation.constant;
            else res += '-' + Math.abs(notation.constant);
            res += ')';
        }
        if (result.length > 1) res += ' = ' + 
                (result.reduce(function(s, a) { return s + a; }) + notation.constant);
        label.innerHTML = res;
    }

    function initializeDicePositions() {
        var diceTypes = ['d4', 'd6', 'd8', 'd10', 'd20'];
        var spacing = 80; // Spacing between dice, adjusted for the size of D6
        var startX = -((diceTypes.length - 1) * spacing) / 2; // Center the dice

        for (var i = 0; i < diceTypes.length; i++) {
            var dice = $t.dice['create_' + diceTypes[i]](); // Create the respective dice
            dice.position.set(startX + i * spacing, 0, 0); // Position dice in a line
            box.scene.add(dice); // Add the dice to the scene
        }
    }

    initializeDicePositions();

    box.bind_throw(rollButton, notation_getter, before_roll, after_roll);

    if (params.notation) {
        set.value = params.notation;
    }
    if (params.roll) {
        $t.raise_event(rollButton, 'mouseup');
    }
}
