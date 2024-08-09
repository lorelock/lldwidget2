"use strict";

function dice_initialize(container) {
    $t.remove($t.id('loading_text'));

    const canvas = $t.id('canvas');
    const rollButton = $t.id('rollButton');

    function resizeCanvas() {
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();  // Initial call to set the correct size

    const box = new $t.dice.dice_box(canvas, { w: window.innerWidth, h: window.innerHeight });

    function rollDice() {
        const diceTypes = ['d4', 'd6', 'd8', 'd10', 'd12', 'd20'];
        const vectors = diceTypes.map(type => {
            const spawnPosition = {
                x: Math.random() < 0.5 ? -box.w * (Math.random() + 0.5) : box.w * (Math.random() + 0.5),
                y: Math.random() < 0.5 ? -box.h * (Math.random() + 0.5) : box.h * (Math.random() + 0.5)
            };
            const boost = (Math.random() * 2.5 + 1.25) * 0.92;
            const velocity = { x: spawnPosition.x * 0.92, y: spawnPosition.y * 0.92, z: -11.5 };
            const angularVelocity = {
                x: (Math.random() * 1.75 - 0.875) * 0.92,
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
        box.roll(vectors, null, result => {
            console.log(result);
        });
    }

    rollButton.addEventListener('click', rollDice);
    rollDice();  // Roll the dice once as soon as the page loads
}
