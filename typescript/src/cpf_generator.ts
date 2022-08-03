interface CpfTypes {
  cleanCpf: string;
  formattedCpf: string;
}

/**
 * Main function to generate a CPF. It will generate a CPF number, one with only numbers and the other formatted.
 *
 * @returns {Promise<CpfTypes>} Returns a Promise with the clean CPF and the formatted CPF.
 */
const generateCpf = async (): Promise<CpfTypes> => {
  await Promise.resolve()
  const baseValue = randomCpfSeed()
  let vecSum = baseValue.split('').map((x) => parseInt(x))
  let vecMultiplied = vecSum.map((_, index) => vecSum[index] * (10 - Number(index)))

  const verifierOne = calcVerifierNum(vecMultiplied.reduce((a, b) => a + b))
  const baseSecondRun = (baseValue + verifierOne).slice(1)

  vecSum = baseSecondRun.split('').map((x) => parseInt(x))
  vecMultiplied = vecSum.map((_, index) => vecSum[index] * (10 - Number(index)))

  const verifierTwo = calcVerifierNum(vecMultiplied.reduce((a, b) => a + b))
  const cleanCPF = `${baseValue}${verifierOne}${verifierTwo}`
  const formattedCPF = cleanCPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')

  return { cleanCpf: cleanCPF, formattedCpf: formattedCPF }
}

/**
 * Generates a random CPF seed of 9 digits of number in range of 0-9.
 *
 * @returns {string} Returns a random CPF seed of 9 chars.
 */
const randomCpfSeed = (): string => {
  let cpf = ''
  for (let i = 0; i < 9; i++) {
    cpf += Math.floor(Math.random() * 10)
  }
  return cpf
}

/**
 * Calculates the verifier number of a CPF.
 * If the left over is 0 or 1, the verifier number will be 0. Otherwise, the verifier number will be 11 minus the left over of the division.
 *
 * @param {number} n1 - The sum of the first 9 digits of the CPF.
 * @returns {number} The verifier number of the CPF.
 */
const calcVerifierNum = (n1: number): number => {
  const n2 = n1 % 11
  if (n2 < 2) {
    return 0
  } else {
    return 11 - n2
  }
}

// const output = async () => {
//   for (let i = 0; i < 100; i++) {
//     const CPFs = await generateCpf()

//     console.log(`${CPFs.cleanCpf} - ${CPFs.formattedCpf}`)
//   }
// }

// output()

export { generateCpf }
