import getInput from "../Helpers/getInput";

const currentDay = 15;

const runParts = async () => {
    console.log("Running part 1");
    const result1 = await part1();
    console.log("Part 1 Result: ", result1);

    console.log("Running part 2");
    const result2 = await part2();
    console.log("Part 2 Result: ", result2);
}

const doOverlap = (range1: number[], range2: number[]) => {
    return !((range1[0] < range2[0] && range1[1] < range2[0]) || (range1[0] > range2[1] && range1[1] > range2[1]))
}

const rangeContains = (range1: number[], range2: number[]) => {
    return range1[0] >= range2[0] && range1[1] >= range2[0] && range1[0] <= range2[1] && range1[1] <= range2[1]
}

const part1 = async () => {
    const data = await getInput(`./Day ${currentDay}/input.txt`);
    const pos = data.split("\n").map(line => line.split(":").map(pos2 => [Number(pos2.split(",")[0]), Number(pos2.split(",")[1])]))

    var notAllowed: number[][] = [];

    const yCheck = 2000000;

    for (var i = 0; i < pos.length; i++) {
        const [sensor, beacon] = pos[i];
        const yDiff = Math.abs(beacon[1] - sensor[1]);
        const xDiff = Math.abs(beacon[0] - sensor[0]);

        const yRange = (xDiff + yDiff) - Math.abs(sensor[1] - yCheck);

        if (yRange >= 0) {
            notAllowed.push([sensor[0] - yRange, sensor[0] + yRange]);
        }
    }

    notAllowed.sort((a, b) => a[0] - b[0]);
    var hasSplit = false;
    do {
        hasSplit = false;
        for (var i = 1; i < notAllowed.length; i++) {
            if (rangeContains(notAllowed[i], notAllowed[i - 1])) {
                notAllowed = [...notAllowed.slice(0, i), ...notAllowed.slice(i + 1)]
                hasSplit = true;
                break;
            }
            if (doOverlap(notAllowed[i - 1], notAllowed[i])) {
                notAllowed = [...notAllowed.slice(0, i - 1), [notAllowed[i - 1][0], notAllowed[i][1]], ...notAllowed.slice(i + 1)]
                hasSplit = true;
                break;
            }

        }
    } while (hasSplit)
    console.log(notAllowed);

    return notAllowed.map(range => range[1] - range[0]).reduce((a, b) => a + b, 0)
}

const getRanges = (pos: number[][][], yValue: number) => {
    var notAllowedX: number[][] = [];

    for (var i = 0; i < pos.length; i++) {
        const [sensor, beacon] = pos[i];
        const yDiff = Math.abs(beacon[1] - sensor[1]);
        const xDiff = Math.abs(beacon[0] - sensor[0]);

        const yRange = (xDiff + yDiff) - Math.abs(sensor[1] - yValue);

        if (yRange >= 0) {
            notAllowedX.push([sensor[0] - yRange, sensor[0] + yRange]);
        }
    }

    notAllowedX.sort((a, b) => a[0] - b[0]);
    var hasSplit = false;
    do {
        hasSplit = false;
        for (var i = 1; i < notAllowedX.length; i++) {
            if (rangeContains(notAllowedX[i], notAllowedX[i - 1])) {
                notAllowedX = [...notAllowedX.slice(0, i), ...notAllowedX.slice(i + 1)]
                hasSplit = true;
                break;
            }
            if (doOverlap(notAllowedX[i - 1], notAllowedX[i])) {
                notAllowedX = [...notAllowedX.slice(0, i - 1), [notAllowedX[i - 1][0], notAllowedX[i][1]], ...notAllowedX.slice(i + 1)]
                hasSplit = true;
                break;
            }

        }
    } while (hasSplit)

    return notAllowedX;
}

const part2 = async () => {
    const data = await getInput(`./Day ${currentDay}/input.txt`);
    const pos = data.split("\n").map(line => line.split(":").map(pos2 => [Number(pos2.split(",")[0]), Number(pos2.split(",")[1])]))

    for (var i = 0; i < 4000000; i++) {
        const test = getRanges(pos, i);

        if (test.length > 1 && test[0][1] >= 0 && test[0][1] < 4000000) {
            return (test[0][1] + 1) * 4000000 + i
        }
    }
}

runParts();