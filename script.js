// Colors
colors = {
    playerDefault: "#000000",
    playerActive: "#feff49"
}

// Get the calculator element and get Desmos to do its magic
var calculator = Desmos.GraphingCalculator(document.getElementById('calculator'), {
    lockViewport: true,
    zoomButtons: false,
    settingsMenu: false,
    expressionsTopbar: false,
    trace: false,
    border: false,
    images: false,
    expressions: false
});

// Takes in a player object, and puts a point on the graph where they should be
function createPlayer(player) {
    calculator.setExpression({
        id: player.id,
        latex: '(' + player.pos.x + ', ' + player.pos.y + ')',
        color: colors.playerDefault,
        style: Desmos.Styles.OPEN,
        secret: true,
        label: player.username,
        showLabel: true
    });
}

function launchEquation() {
    // Get equation from page

    // Check equation is valid

    // Move equation to where it should be on the y-axis

    // Draw it out - probably animating the bounds?

}

function clearGraph() {
    calculator.setBlank();
}

/* TEMPORARY STUFF TO GET TO A WORKING STATE */
player1 = {
    id: 1,
    pos: {
        x: -8,
        y: 6
    },
    username: 'domdomegg'
}

player2 = {
    id: 2,
    pos: {
        x: 9,
        y: -4
    },
    username: 'footballgeorge1729'
}

createPlayer(player1);
createPlayer(player2);
