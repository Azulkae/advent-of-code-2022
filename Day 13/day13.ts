import getInput from "../Helpers/getInput";

const currentDay = 13;

type Signal = (Signal | number)[]

const runParts = async () => {
    console.log("Running part 1");
    const result1 = await part1();
    console.log("Part 1 Result: ", result1);

    console.log("Running part 2");
    const result2 = await part2();
    console.log("Part 2 Result: ", result2);
}

const comparePair = (signal1: Signal, signal2: Signal): boolean | undefined => {
    var [pair1, ...pair1Rest] = signal1;
    var [pair2, ...pair2Rest] = signal2;

    if (typeof pair1 === "number" && typeof pair2 === "number") {
        if (pair1 === pair2) {
            return comparePair(pair1Rest, pair2Rest);
        }

        return pair1 < pair2;
    }

    if (typeof pair1 === "number" && typeof pair2 === "object") {
        return comparePair([[pair1], ...pair1Rest], signal2);
    }

    if (typeof pair1 === "object" && typeof pair2 === "number") {
        return comparePair(signal1, [[pair2], ...pair2Rest]);
    }

    if (typeof pair1 === "object" && typeof pair2 === "object") {
        return comparePair(pair1, pair2) ?? comparePair(pair1Rest, pair2Rest);
    }

    if (typeof pair1 === "undefined" && typeof pair2 !== "undefined") {
        return true
    }

    if (typeof pair1 !== "undefined" && typeof pair2 === "undefined") {
        return false
    }

    return undefined;
}

const part1 = async () => {
    const data = await getInput(`./Day ${currentDay}/input.txt`);
    const pairs = data.split("\n\n").map(line => line.split("\n").map(list => JSON.parse(list)));

    const correctPairs = pairs.map((pair, i) => comparePair(pair[0], pair[1]) ? i + 1 : 0);
    return correctPairs.reduce((a, b) => a + b, 0)
}

const part2 = async () => {
    const data = await getInput(`./Day ${currentDay}/input.txt`);
    const pairs = [...data.split("\n\n").flatMap(line => line.split("\n").map(list => JSON.parse(list))), [[2]], [[6]]];

    pairs.sort((a,b) => comparePair(a,b) ? -1 : 1);
    const stringPairs = pairs.map(pair => JSON.stringify(pair));

    return (stringPairs.indexOf("[[2]]") + 1) * (stringPairs.indexOf("[[6]]") + 1);
}

runParts();