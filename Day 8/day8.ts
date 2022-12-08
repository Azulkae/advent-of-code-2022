import getInput from "../Helpers/getInput";

const currentDay = 8;

const runParts = async () => {
    console.log("Running part 1");
    const result1 = await part1();
    console.log("Part 1 Result: ", result1);

    console.log("Running part 2");
    const result2 = await part2();
    console.log("Part 2 Result: ", result2);
}

const treeVisisbleFromDirection = (trees: number[][], row: number, column: number, rowDirection: number, columnDirection: number) => {
    var currentRow = row + rowDirection;
    var currentColumn = column + columnDirection;

    var firstHeight = trees[row][column];

    while (currentRow >= 0 && currentRow < trees.length && currentColumn >= 0 && currentColumn < trees[0].length) {
        var newHeight = trees[currentRow][currentColumn];

        if (newHeight >= firstHeight) {
            return false;
        }

        currentRow += rowDirection;
        currentColumn += columnDirection;
    }

    return true;
}

const part1 = async () => {
    const data = await getInput(`./Day ${currentDay}/input.txt`);
    const trees = data.split("\n").map(row => Array.from(row).map(t => Number(t)));

    var count = 0;

    for (var row = 0; row < trees.length; row++) {
        for (var column = 0; column < trees[0].length; column++) {
            if (treeVisisbleFromDirection(trees, row, column, 1, 0)) {
                count++
                continue;
            }

            if (treeVisisbleFromDirection(trees, row, column, -1, 0)) {
                count++
                continue;
            }

            if (treeVisisbleFromDirection(trees, row, column, 0, 1)) {
                count++
                continue;
            }

            if (treeVisisbleFromDirection(trees, row, column, 0, -1)) {
                count++
                continue;
            }
        }
    }
    return count;
}

const treeVisisbleInDirection = (trees: number[][], row: number, column: number, rowDirection: number, columnDirection: number) => {
    var currentRow = row + rowDirection;
    var currentColumn = column + columnDirection;

    var count = 0;

    var treeHeight = trees[row][column];

    while (currentRow >= 0 && currentRow < trees.length && currentColumn >= 0 && currentColumn < trees[0].length) {
        var height = trees[currentRow][currentColumn];
        count++;

        if (height >= treeHeight) {
            return count;
        }

        currentRow += rowDirection;
        currentColumn += columnDirection;
    }

    return count;
}

const getScenicScore = (trees: number[][], row: number, column: number) => {
    const score = treeVisisbleInDirection(trees, row, column, 0, -1) * treeVisisbleInDirection(trees, row, column, 0, 1) * treeVisisbleInDirection(trees, row, column, -1, 0) * treeVisisbleInDirection(trees, row, column, 1, 0);
    return score;
}

const part2 = async () => {
    const data = await getInput(`./Day ${currentDay}/input.txt`);
    const trees = data.split("\n").map(row => Array.from(row).map(t => Number(t)));

    var scores: number[] = [];
    for (var row = 0; row < trees.length; row++) {
        for (var column = 0; column < trees[0].length; column++) {
            scores = [...scores, getScenicScore(trees, row, column)]
        }
    }
    scores.sort((a,b) => a-b);
    console.log(scores.slice(scores.length - 30));
    return scores[scores.length -1];
}

runParts();