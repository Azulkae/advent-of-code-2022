import getInput from "../Helpers/getInput";

const currentDay = 6;

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
    const stream = Array.from(data);

    for (var i = 0; i < stream.length; i++) {
        var amount = stream.slice(i, i + 4);
        if (Array.from(new Set(amount)).length === 4) {
            return i + 4;
        }
    }
}

const part2 = async () => {
    const data = await getInput(`./Day ${currentDay}/input.txt`);
    const stream = Array.from(data);

    for (var i = 0; i < stream.length; i++) {
        var amount = stream.slice(i, i + 14);
        if (Array.from(new Set(amount)).length === 14) {
            return i + 14;
        }
    }
}

runParts();