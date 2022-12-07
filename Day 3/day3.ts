import getInput from "../Helpers/getInput";

const currentDay = 3;

const runParts = async () => {
    console.log("Running part 1");
    const result1 = await part1();
    console.log("Part 1 Result:", result1);
    
    console.log("Running part 2");
    const result2 = await part2();
    console.log("Part 2 Result:", result2);
}

const part1 = async () => {
    const data = await getInput(`./Day ${currentDay}/input.txt`);
    const lines = data.split("\n");
    const charArrays = lines.map(item => [Array.from(item.slice(0, item.length / 2)), Array.from(item.slice(item.length / 2))]);
    const uniqueChars = charArrays.map(arrays => arrays[0].filter(v => arrays[1].some(v2 => v2 === v))[0]);
    const totalScore = uniqueChars.map(charToScore).reduce((a, b) => a + b, 0);
    return totalScore;
}

const part2 = async () => {
    const data = await getInput(`./Day ${currentDay}/input.txt`);
    const lines = data.split("\n");
    const charArrays = lines.map(str => Array.from(str));

    var groups: string[][][] = [];
    for (var i = 0; i < (charArrays.length / 3); i++) {
        groups = [...groups, charArrays.slice(i * 3, (i + 1) * 3)]
    }

    const uniqueChars = groups.map(arrays => arrays[0].filter(v => arrays[1].some(v1 => v1 === v) && arrays[2].some(v2 => v2 === v))[0]);
    const totalScore = uniqueChars.map(charToScore).reduce((a, b) => a + b, 0);
    return totalScore;
}

const charToScore = (char: string) => {
    if (char.toUpperCase() === char) {
        return char.charCodeAt(0) - 65 + 27
    }
    return char.charCodeAt(0) - 96
}

runParts();