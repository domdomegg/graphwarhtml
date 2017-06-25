// Colors
colors = {
    playerDefault: "#000000",
    playerActive: "#c74440",
    lineDefault: "#c74440"
}

// Remap useful functions so we don't need to convert them when evaluating the equation string later
var pi = Math.PI,
    e = Math.E,
    sqrt = Math.sqrt,
    abs = Math.abs,
    sin = Math.sin,
    cos = Math.cos,
    tan = Math.tan,
    arcsin = Math.asin,
    arccos = Math.acos,
    arctan = Math.atan,
    exp = Math.exp,
    log = Math.log,
    ln = Math.log,
    log2 = Math.log2,
    log10 = Math.log10,
    pow = Math.pow;

// Add more maths functions
function csc(x) {
    return 1/sin(x);
}
function sec(x) {
    return 1/cos(x);
}
function cot(x) {
    return 1/tan(x);
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
    expressions: true,
    expressionsCollapsed: true
});

calculator.setMathBounds({
  left: -25,
  right: 25,
  bottom: -15,
  top: 15
});

// Takes in a player object, and puts a point on the graph where they should be
function createPlayer(player) {
    calculator.setExpression({
        id: player.id,
        latex: '(' + player.pos.x + ', ' + player.pos.y + ')',
        color: colors.playerDefault,
        style: Desmos.Styles.OPEN,
        label: player.username,
        showLabel: true,
        secret: true
    });
}

function launchEquation() {
    // Get equation from page, check not empty
    equation_string = document.getElementById('equation').value.trim();
    if(equation_string == "") {
        // TODO: Give user feedback
        console.warn("Empty equation_string");
        return;
    }

    var equation_latex = equation_string;

    // Fix multiplying inexplicitly
    equation_string = equation_string.replace(/([0-9\.]+)([a-zA-Z])/g, function(match, g1, g2) {
        return g1 + "*" + g2;
    });

    // Fix exponentiation
    equation_string = equation_string.replace("^", "**")

    // Check equation is valid
    var x = currentPlayer.pos.x;
    var y = 0;

    try {
        y = eval(equation_string);
    } catch (e) {
        // Not valid
        // TODO: Give user feedback
        console.warn("Invalid equation_string");
        return;
    }

    // Move equation to where it should be on the y-axis
    equation_latex = equation_latex + " + " + (currentPlayer.pos.y - y);

    // Latexify the equation_string for Desmos
    // This regular expression finds functions the "largest" functions in terms
    // of nesting, so is looped until there are no more replacements
    var re = /(sqrt|abs|sin|cos|tan|arcsin|arccos|arctan|exp|log|pow|csc|sec|cot|\^)\([^\)]*\)+/g;
    var made_replacement = true;
    while(made_replacement) {
        made_replacement = false;
        equation_latex = equation_latex.replace(re, function(match, p1) {
            made_replacement = true;
            return "\\" + match.replace(/\(/, "{(").replace(/\)$/,")}");
        });
    }

    console.log("y="+equation_latex+"\\{" + currentPlayer.pos.x + " < x < a\\}");

    calculator.setExpression({
        id: 'a',
        latex: 'a = ' + currentPlayer.pos.x,
        sliderBounds: {min: currentPlayer.pos.x, max: 25}
    })

    // Draw it out - probably animating the bounds?
    calculator.setExpression({
        id: currentPlayer.id + 'graph',
        latex: "y="+equation_latex+"\\left\\{" + currentPlayer.pos.x + "<x<a\\right\\}",
        color: colors.lineDefault,
        secret: false
    });
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

currentPlayer = player1;

createPlayer(player1);
createPlayer(player2);
