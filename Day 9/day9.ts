import getInput from "../Helpers/getInput";

const currentDay = 9;

const runParts = async () => {
    console.log("Running part 1");
    const result1 = await part1();
    console.log("Part 1 Result: ", result1);

    console.log("Running part 2");
    const result2 = await part2();
    console.log("Part 2 Result: ", result2);
}

const part1 = async () => {
    const data = await getInput(`./Day ${currentDay}/input.txt`);
    const moves = data.split('\n');

    const flatMoves = moves.flatMap(move => {
        const [dir, amount] = move.split(" ");
        return (new Array(Number(amount))).fill(dir);
    })

    var currentHead = [0, 0];
    var currentTail = [0, 0];

    var tailVisited = ["0,0"];

    for (var i = 0; i < flatMoves.length; i++) {
        const dir = flatMoves[i];

        if (dir === "R") {
            currentHead = [currentHead[0] + 1, currentHead[1]];
        }

        if (dir === "D") {
            currentHead = [currentHead[0], currentHead[1] + 1];
        }

        if (dir === "L") {
            currentHead = [currentHead[0] - 1, currentHead[1]];
        }

        if (dir === "U") {
            currentHead = [currentHead[0], currentHead[1] - 1];
        }

        if (Math.abs(currentTail[0] - currentHead[0]) > 1) {
            currentTail[0] = (currentTail[0] + currentHead[0]) / 2
            currentTail[1] = currentHead[1];
        }

        if (Math.abs(currentTail[1] - currentHead[1]) > 1) {
            currentTail[1] = (currentTail[1] + currentHead[1]) / 2
            currentTail[0] = currentHead[0];
        }

        tailVisited = [...tailVisited, currentTail.join(",")]
    }

    return new Set(tailVisited).size
}

const part2 = async () => {
    const data = await getInput(`./Day ${currentDay}/input.txt`);
    const moves = data.split('\n');

    const flatMoves = moves.flatMap(move => {
        const [dir, amount] = move.split(" ");
        return (new Array(Number(amount))).fill(dir);
    })

    var knots = new Array(10).fill(0).map(() => [0, 0]);

    var tailVisited = ["0,0"];

    for (var i = 0; i < flatMoves.length; i++) {
        const dir = flatMoves[i];
        const currentHead = knots[0];

        if (dir === "R") {
            knots[0] = [currentHead[0] + 1, currentHead[1]];
        }

        if (dir === "D") {
            knots[0] = [currentHead[0], currentHead[1] - 1];
        }

        if (dir === "L") {
            knots[0] = [currentHead[0] - 1, currentHead[1]];
        }

        if (dir === "U") {
            knots[0] = [currentHead[0], currentHead[1] + 1];
        }

        for (var j = 0; j < knots.length - 1; j++) {
            const checkKnot = knots[j]
            const moveKnot = knots[j + 1]

            var moved = false;

            if ((moveKnot[0] - checkKnot[0]) * Math.sign(moveKnot[0] - checkKnot[0]) > 1) {
                moveKnot[0] = checkKnot[0] > moveKnot[0] ? checkKnot[0] - 1 : checkKnot[0] + 1;

                if ((moveKnot[1] - checkKnot[1]) * Math.sign(moveKnot[1] - checkKnot[1]) > 1) {
                    moveKnot[1] = checkKnot[1] > moveKnot[1] ? checkKnot[1] - 1 : checkKnot[1] + 1;
                } else {
                    moveKnot[1] = checkKnot[1];
                }
            }

            if ((moveKnot[1] - checkKnot[1]) * Math.sign(moveKnot[1] - checkKnot[1]) > 1) {
                moveKnot[1] = checkKnot[1] > moveKnot[1] ? checkKnot[1] - 1 : checkKnot[1] + 1;

                if ((moveKnot[0] - checkKnot[0]) * Math.sign(moveKnot[0] - checkKnot[0]) > 1) {
                    moveKnot[0] = checkKnot[0] > moveKnot[0] ? checkKnot[0] - 1 : checkKnot[0] + 1;
                } else {
                    moveKnot[0] = checkKnot[0];
                }
            }
        }

        tailVisited = [...tailVisited, knots[9].join(",")]
    }
    
    return new Set(tailVisited).size
}

runParts();