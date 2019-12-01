module.exports.run = (rawInput) => {
  const moduleWeights = rawInput.toString().split('\n');
  const total = moduleWeights.map(mass => Math.floor(mass / 3) - 2).reduce((acc, mass) => acc + mass, 0);
  return total;
}
