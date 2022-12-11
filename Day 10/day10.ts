import getInput from "../Helpers/getInput";

const currentDay = 10;

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
    const moves = data.split("\n");

    var curReg = 1;

    var cycles: number[] = [];

    for (var i = 0; i < moves.length; i++) {
        var [op, amount] = moves[i].split(" ");

        cycles = [...cycles, curReg];

        if (op === "noop") {
            continue
        }

        cycles = [...cycles, curReg];
        curReg += Number(amount);
    }

    var regs: number[] = [];

    for (var j = 0; j < cycles.length; j++) {
        if ((j + 1) % 20 === 0 && (((j + 1) / 20) % 2 === 1)) {
            regs = [...regs, cycles[j] * (j + 1)]
        }
    }

    return regs.reduce((a, b) => a + b, 0);
}

const part2 = async () => {
    const data = await getInput(`./Day ${currentDay}/input.txt`);
    const moves = data.split("\n");

    var curReg = 1;
    var curCycle = 1;

    var drawn: boolean[][] = new Array(6).fill(0).map(() => new Array(40).fill(false));
    var cycles: number[] = [];

    for (var i = 0; i < moves.length; i++) {
        var [op, amount] = moves[i].split(" ");

        cycles = [...cycles, curReg];

        var row = curCycle % 40;
        var height = Math.floor(curCycle / 40);

        if (row >= curReg && row <= curReg + 2) {
            drawn[height][row] = true;
        }

        curCycle++;

        if (op === "noop") {
            continue
        }

        var row2 = curCycle % 40;
        var height2 = Math.floor(curCycle / 40);

        if (row2 >= curReg && row2 <= curReg + 2) {
            drawn[height2][row2] = true;
        }

        cycles = [...cycles, curReg];
        curReg += Number(amount);
        curCycle++;
    }

    drawn.map((a) => console.log(a.map(b => b ? "#" : ".").join("")));
}

runParts();