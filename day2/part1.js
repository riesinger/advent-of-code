
module.exports.run = (rawInput) => {
  const instructions = rawInput.toString().split(',').map(instruction => parseInt(instruction, 10));
  // The puzzle tells us to replace position 1 with the value 12 and the position 2 with the value 2
  instructions[1] = 12;
  instructions[2] = 2;

  const getOperands = (currentIndex) => {
    return [ instructions[instructions[currentIndex + 1]], instructions[instructions[currentIndex + 2]] ];
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