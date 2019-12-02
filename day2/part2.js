
module.exports.run = (rawInput) => {
  const testInputs = (instructions, noun, verb) => {
    instructions[1] = noun;
    instructions[2] = verb;

    const getOperands = (currentIndex) => {
      return [instructions[instructions[currentIndex + 1]], instructions[instructions[currentIndex + 2]]];
    }

    const addAndStore = (currentIndex, first, second) => {
      instructions[instructions[currentIndex + 3]] = first + second;
    }

    const multiplyAndStore = (currentIndex, first, second) => {
      instructions[instructions[currentIndex + 3]] = first * second;
    }

    // start processing instructions
    let currentInstructionIndex = 0;
    while (true) {
      switch (instructions[currentInstructionIndex]) {
        case 1:
          addAndStore(currentInstructionIndex, ...getOperands(currentInstructionIndex));
          currentInstructionIndex += 4;
          break;
        case 2:
          multiplyAndStore(currentInstructionIndex, ...getOperands(currentInstructionIndex));
          currentInstructionIndex += 4;
          break;
        case 99:
          return instructions[0];
        default:
          throw new Error(`Unknown instruction: ${instructions[currentInstructionIndex]}`);
      }
    }
  }

  for (let noun = 0; noun < 99; noun++) {
    for (let verb = 0; verb < 99; verb++) {
      const instructions = rawInput.toString().split(',').map(instruction => parseInt(instruction, 10));
      const result = testInputs(instructions, noun, verb);
      if (result == 19690720) {
        return 100 * noun + verb;
      }
    }
  }
}