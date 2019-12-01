#!/usr/bin/env node

const fs = require('fs');

const ARG_DAY = 2;
const ARG_PART = 3;

class NotImplementedError extends Error {
  constructor(day, part) {
    super(`Solution to day ${day}, part ${part} is not implemented yet`);
  }
}

const requireSolution = (day, part) => new Promise((resolve, reject) => {
  try {
    const solution = require(`./day${day}/part${part}`);
    resolve(solution);
  } catch (_) {
    reject(new NotImplementedError(day, part));
  }
});

const readInput = (day) => new Promise((resolve, reject) => {
  try {
    const input = fs.readFileSync(`${__dirname}/inputs/day${day}`);
    resolve(input);
  } catch (err) {
    reject(err);
  }
});

if (process.argv.length == 2) {
  runAllDaysAndParts();
} else if (process.argv.length == 3) {
  runDay(process.argv[ARG_DAY]);
} else if (process.argv.length == 4) {
  runDayAndPart(process.argv[ARG_DAY], process.argv[ARG_PART]);
} else {
  console.error(`usage: aoc.js [day] [part]`);
  process.exit(1);
}

async function runAllDaysAndParts() {
  for (let day = 1; day < 24; day++) {
    await runDay(day);
  }
}

async function runDay(day) {
  // There are always two parts to a day
  await runDayAndPart(day, 1);
  await runDayAndPart(day, 2);
}

async function runDayAndPart(day, part) {
  try {
    const solution = await requireSolution(day, part);
    const input = await readInput(day);
    const result = solution.run(input);
    console.log(`Day ${day}, part ${part}: ${result}`);
  } catch (err) {
    if (err instanceof NotImplementedError) return;
    console.error(`Day ${day}, part ${part} failed: ${err}`);
  }
}
