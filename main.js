"use strict";

function dice_initialize(container) {
    $t.remove($t.id('loading_text'));

    var canvas = $t.id('canvas');
    canvas.style.width = window.innerWidth - 1 + 'px';
    canvas.style.height = window.innerHeight - 1 + 'px';
    var label = $t.id('label');
    var selector_div = $t.id('selector_div');
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
        selector_div.style.display = 'none';
        callback();
    }

    function notation_getter() {
        return $t.dice.parse_notation("4d6");
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
        selector_div.style.display = 'inline-block';
    }

    box.bind_throw(rollButton, notation_getter, before_roll, after_roll);

    if (params.notation) {
        set.value = params.notation;
    }
    if (params.roll) {
        $t.raise_event(rollButton, 'mouseup');
    } else {
        selector_div.style.display = 'inline-block';
    }
}
