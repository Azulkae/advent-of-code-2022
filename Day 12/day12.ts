import getInput from "../Helpers/getInput";

const currentDay = 12;

const runParts = async () => {
    console.log("Running part 1");
    const result1 = await part1();
    console.log("Part 1 Result: ", result1);

    console.log("Running part 2");
    const result2 = await part2();
    console.log("Part 2 Result: ", result2);
}

const findChar = (map: string[][], char: string) => {
    for (var i = 0; i < map.length; i++) {
        for (var j = 0; j < map[0].length; j++) {
            if (map[i][j] === char) {
                return [i, j];
            }
        }
    }

    return [];
}

const findMultipleOfChar = (map: string[][], char: string) => {
    var pos: number[][] = [];

    for (var i = 0; i < map.length; i++) {
        for (var j = 0; j < map[0].length; j++) {
            if (map[i][j] === char) {
                pos = [...pos, [i, j]]
            }
        }
    }

    return pos;
}

const getElevation = (char: string) => {
    if (char === "S") {
        return "a".charCodeAt(0);
    }

    if (char === "E") {
        return "z".charCodeAt(0);
    }

    return char.charCodeAt(0);
}

const getAvailableSquaresAroundPosition = (row: number, column: number, currentChar: string, map: string[][]): number[][] => {
    var positions: number[][] = [];
    const currentValue = getElevation(currentChar);

    if (row - 1 >= 0) {
        if (getElevation(map[row - 1][column]) - 1 <= currentValue) {
            positions = [...positions, [row - 1, column]]
        }
    }

    if (row + 1 < map.length) {
        if (getElevation(map[row + 1][column]) - 1 <= currentValue) {
            positions = [...positions, [row + 1, column]]
        }
    }

    if (column - 1 >= 0) {
        if (getElevation(map[row][column - 1]) - 1 <= currentValue) {
            positions = [...positions, [row, column - 1]]
        }
    }

    if (column + 1 < map[0].length) {
        if (getElevation(map[row][column + 1]) - 1 <= currentValue) {
            positions = [...positions, [row, column + 1]]
        }
    }

    return positions;
}

const part1 = async () => {
    const data = await getInput(`./Day ${currentDay}/input.txt`);
    const map = data.split("\n").map(line => Array.from(line));

    const start = findChar(map, "S");
    const end = findChar(map, "E");

    var minPaths: number[][] = new Array(map.length).fill(0).map(() => new Array(map[0].length).fill(Infinity));
    minPaths[start[0]][start[1]] = 0;

    var pending: string[] = [start.join(",")];

    while (pending.length) {
        var newPending: string[] = [];

        for (var i = 0; i < pending.length; i++) {
            const pos = pending[i].split(",").map(Number);
            const nextPositions = getAvailableSquaresAroundPosition(pos[0], pos[1], map[pos[0]][pos[1]], map);

            for (var j = 0; j < nextPositions.length; j++) {
                const newPos = nextPositions[j];
                const newLength = minPaths[pos[0]][pos[1]] + 1;
                const oldLength = minPaths[newPos[0]][newPos[1]];

                if (oldLength > newLength) {
                    minPaths[newPos[0]][newPos[1]] = newLength;
                    newPending = [...newPending, newPos.join(",")]
                }
            }
        }

        pending = Array.from(new Set(newPending));
    }

    return minPaths[end[0]][end[1]];
}

const getMinLength = (start: number[], map: string[][]) => {
    const end = findChar(map, "E");
    var minPaths: number[][] = new Array(map.length).fill(0).map(() => new Array(map[0].length).fill(Infinity));
    minPaths[start[0]][start[1]] = 0;

    var pending: string[] = [start.join(",")];

    while (pending.length) {
        var newPending: string[] = [];

        for (var i = 0; i < pending.length; i++) {
            const pos = pending[i].split(",").map(Number);
            const nextPositions = getAvailableSquaresAroundPosition(pos[0], pos[1], map[pos[0]][pos[1]], map);

            for (var j = 0; j < nextPositions.length; j++) {
                const newPos = nextPositions[j];
                const newLength = minPaths[pos[0]][pos[1]] + 1;
                const oldLength = minPaths[newPos[0]][newPos[1]];

                if (oldLength > newLength) {
                    minPaths[newPos[0]][newPos[1]] = newLength;
                    newPending = [...newPending, newPos.join(",")]
                }
            }
        }

        pending = Array.from(new Set(newPending));
    }

    return minPaths[end[0]][end[1]];
}

const part2 = async () => {
    const data = await getInput(`./Day ${currentDay}/input.txt`);
    const map = data.split("\n").map(line => Array.from(line));

    const starts = [...findMultipleOfChar(map, "a"), findChar(map, "S")];
    return starts.map(pos => getMinLength(pos, map)).sort((a, b) => a - b)[0];
}

runParts();