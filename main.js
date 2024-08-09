"use strict";

function dice_initialize(container) {
    $t.remove($t.id('loading_text'));

    var canvas = $t.id('canvas');
    canvas.style.width = window.innerWidth - 1 + 'px';
    canvas.style.height = window.innerHeight - 1 + 'px';

    var rollButton = $t.id('rollButton');

    var box = new $t.dice.dice_box(canvas, { w: 500, h: 300 });

    function initializeDicePositions() {
        var diceTypes = ['d4', 'd6', 'd8', 'd10', 'd20'];
        var spacing = 80;
        var startX = -((diceTypes.length - 1) * spacing) / 2;

        for (var i = 0; i < diceTypes.length; i++) {
            var dice = $t.dice['create_' + diceTypes[i]]();
            dice.position.set(startX + i * spacing, 0, 0);
            box.scene.add(dice);
        }
    }

    function hideDice() {
        while (box.dices.length > 0) {
            var dice = box.dices.pop();
            box.scene.remove(dice);
        }
        box.renderer.render(box.scene, box.camera);
    }

    rollButton.addEventListener('click', hideDice);

    initializeDicePositions();
}

