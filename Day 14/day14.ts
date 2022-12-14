import getInput from "../Helpers/getInput";

const currentDay = 14;

const runParts = async () => {
    console.log("Running part 1");
    const result1 = await part1();
    console.log("Part 1 Result: ", result1);

    console.log("Running part 2");
    const result2 = await part2();
    console.log("Part 2 Result: ", result2);
}

const getLineFromAToB = (pointA: [number, number], pointB: [number, number]): [number, number][] => {
    var points: [number, number][] = [];

    if (pointA[0] === pointB[0] && pointA[1] === pointB[1]) {
        return [[...pointA]];
    }
    if (pointA[0] === pointB[0]) {
        const leftNum = pointA[1];
        const rightNum = pointB[1];


        return new Array(Math.abs(rightNum - leftNum) + 1).fill(0).map((_, i) => [pointA[0], leftNum + (Math.sign(rightNum - leftNum) * i)]);
    }
    if (pointA[1] === pointB[1]) {
        const leftNum = pointA[0];
        const rightNum = pointB[0];

        return new Array(Math.abs(rightNum - leftNum) + 1).fill(0).map((_, i) => [leftNum + (Math.sign(rightNum - leftNum) * i), pointA[1]]);
    }

    return points;
}

const part1 = async () => {
    const data = await getInput(`./Day ${currentDay}/input.txt`);
    const paths = data.split("\n").map(line => line.split(" -> ").map(point => [Number(point.split(",")[0]), Number(point.split(",")[1])] as [number, number]));

    const grid: Record<string, string> = {};
    var maxHeight = -Infinity;

    for (var i = 0; i < paths.length; i++) {
        const path = paths[i];
        var line1 = path[0];

        for (var j = 1; j < path.length; j++) {
            const line2 = path[j];
            const rocks = getLineFromAToB(line1, line2);

            for (var k = 0; k < rocks.length; k++) {
                grid[rocks[k].join(",")] = "#";
                maxHeight = Math.max(rocks[k][1], maxHeight);
            }

            line1 = line2;
        }
    }

    var settled = 0;
    var reachedAbyss = false;

    while (!reachedAbyss) {
        var hasSettled = false;
        var pos = [500, 0];

        while (!hasSettled) {
            if (pos[1] >= maxHeight) {
                reachedAbyss = true;
                break;
            }
            if (grid[`${pos[0]},${pos[1] + 1}`] === undefined) {
                pos = [pos[0], pos[1] + 1];
                continue;
            }
            if (grid[`${pos[0] - 1},${pos[1] + 1}`] === undefined) {
                pos = [pos[0] - 1, pos[1] + 1];
                continue;
            }
            if (grid[`${pos[0] + 1},${pos[1] + 1}`] === undefined) {
                pos = [pos[0] + 1, pos[1] + 1];
                continue;
            }

            hasSettled = true;
            settled++;
            grid[`${pos[0]},${pos[1]}`] = "o";
            continue;
        }
    }

    return settled;
}

const part2 = async () => {
    const data = await getInput(`./Day ${currentDay}/input.txt`);
    const paths = data.split("\n").map(line => line.split(" -> ").map(point => [Number(point.split(",")[0]), Number(point.split(",")[1])] as [number, number]));

    const grid: Record<string, string> = {};
    var maxHeight = -Infinity;

    for (var i = 0; i < paths.length; i++) {
        const path = paths[i];
        var line1 = path[0];

        for (var j = 1; j < path.length; j++) {
            const line2 = path[j];
            const rocks = getLineFromAToB(line1, line2);

            for (var k = 0; k < rocks.length; k++) {
                grid[rocks[k].join(",")] = "#";
                maxHeight = Math.max(rocks[k][1], maxHeight);
            }

            line1 = line2;
        }
    }

    var settled = 0;
    var sourceBlocked = false;

    while (!sourceBlocked) {
        var hasSettled = false;
        var pos = [500, 0];

        if (grid["500,0"] !== undefined) {
            sourceBlocked = true;
            break;
        }

        while (!hasSettled) {
            if (pos[1] === maxHeight + 1) {
                hasSettled = true;
                settled++;
                grid[`${pos[0]},${pos[1]}`] = "o";
                continue;
            }
            if (grid[`${pos[0]},${pos[1] + 1}`] === undefined) {
                pos = [pos[0], pos[1] + 1];
                continue;
            }
            if (grid[`${pos[0] - 1},${pos[1] + 1}`] === undefined) {
                pos = [pos[0] - 1, pos[1] + 1];
                continue;
            }
            if (grid[`${pos[0] + 1},${pos[1] + 1}`] === undefined) {
                pos = [pos[0] + 1, pos[1] + 1];
                continue;
            }

            hasSettled = true;
            settled++;
            grid[`${pos[0]},${pos[1]}`] = "o";
            continue;
        }
    }

    return settled;
}

runParts();