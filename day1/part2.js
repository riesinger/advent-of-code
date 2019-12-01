module.exports.run = (rawInput) => {
  const moduleWeights = rawInput.toString().split('\n');
  const calculateFuel = (mass) => {
    const requiredFuel = Math.floor(mass / 3) - 2;
    return requiredFuel <= 0 ? 0 : requiredFuel + calculateFuel(requiredFuel);
  }

  const total = moduleWeights.map(calculateFuel).reduce((acc, mass) => acc + mass, 0);
  return total;
}
