import getInput from "../Helpers/getInput";

const currentDay = 11;

type Monkey = {
    op: "times" | "add"
    opAmount: number | "old";
    items: number[];
    testNumber: number;
    monkeyIfTrue: number;
    monkeyIfFalse: number;
}

const parseMonkey = (line: string): Monkey => {
    const things = line.split("\n");
    const items = things[1].slice(things[1].indexOf(":") + 2).split(", ").map(Number);
    const operation = things[2].indexOf("*") === -1 ? "add" : "times";
    const operationAmount = things[2].slice(things[2].indexOf("d") + 4);
    const testNumber = Number(things[3].slice(things[3].indexOf("y") + 2));
    const monkeyIfTrue = Number(things[4].slice(things[4].indexOf("y") + 2));
    const monkeyIfFalse = Number(things[5].slice(things[5].indexOf("y") + 2));

    return {
        op: operation,
        opAmount: operationAmount === "old" ? operationAmount : Number(operationAmount),
        items,
        testNumber,
        monkeyIfTrue,
        monkeyIfFalse
    }
}

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
    const monkeys = data.split("\n\n").map(parseMonkey);

    var currentRound = 1;
    var inspectAmount = new Array(monkeys.length).fill(0);

    while (currentRound <= 20) {
        currentRound++;

        for (var monkey = 0; monkey < monkeys.length; monkey++) {
            for (var item = 0; item < monkeys[monkey].items.length; item++) {
                var curMonkey = monkeys[monkey];

                inspectAmount[monkey]++;

                const opNum = curMonkey.opAmount === "old" ? curMonkey.items[item] : curMonkey.opAmount;
                var newWorry = Math.floor((curMonkey.op === "add" ? curMonkey.items[item] + opNum : curMonkey.items[item] * opNum) / 3);

                if (newWorry % curMonkey.testNumber === 0) {
                    monkeys[curMonkey.monkeyIfTrue].items = [...monkeys[curMonkey.monkeyIfTrue].items, newWorry];
                } else {
                    monkeys[curMonkey.monkeyIfFalse].items = [...monkeys[curMonkey.monkeyIfFalse].items, newWorry];
                }
            }
            monkeys[monkey].items = [];
        }
    }

    var inspectNum = [...inspectAmount];
    inspectNum.sort((a, b) => a - b);
    return inspectNum[inspectNum.length - 2] * inspectNum[inspectNum.length - 1];
}

const part2 = async () => {
    const data = await getInput(`./Day ${currentDay}/input.txt`);
    const monkeys = data.split("\n\n").map(parseMonkey);

    var currentRound = 1;
    var inspectAmount = new Array(monkeys.length).fill(0);

    const modLimit = monkeys.map(m => m.testNumber).reduce((a, b) => a * b, 1);

    while (currentRound <= 10000) {
        currentRound++;

        for (var monkey = 0; monkey < monkeys.length; monkey++) {
            for (var item = 0; item < monkeys[monkey].items.length; item++) {
                var curMonkey = monkeys[monkey];

                inspectAmount[monkey]++;

                const opNum = curMonkey.opAmount === "old" ? curMonkey.items[item] : curMonkey.opAmount;
                var newWorry = Math.floor((curMonkey.op === "add" ? curMonkey.items[item] + opNum : curMonkey.items[item] * opNum)) % modLimit;

                if (newWorry % curMonkey.testNumber === 0) {
                    monkeys[curMonkey.monkeyIfTrue].items = [...monkeys[curMonkey.monkeyIfTrue].items, newWorry];
                } else {
                    monkeys[curMonkey.monkeyIfFalse].items = [...monkeys[curMonkey.monkeyIfFalse].items, newWorry];
                }
            }
            monkeys[monkey].items = [];
        }
    }

    var inspectNum = [...inspectAmount];
    inspectNum.sort((a, b) => a - b);
    return inspectNum[inspectNum.length - 2] * inspectNum[inspectNum.length - 1];
}

runParts();