interface CpfTypes {
  cleanCpf: string;
  formattedCpf: string;
  stateCode: string[];
}

type StateCode = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

/**
 * Main function to generate a CPF. It will generate a CPF number, one with only numbers and the other formatted.
 *
 * @returns {Promise<CpfTypes>} Returns a Promise with the clean CPF and the formatted CPF.
 */
const generateCpf = async (stateCode: StateCode | undefined = undefined): Promise<CpfTypes> => {
  await Promise.resolve()
  const cpfSeed = stateCode ? randomCpfSeed().substring(0, 8) + stateCode : randomCpfSeed()
  let listOfElements = cpfSeed.split('').map((value) => parseInt(value))
  let sumOfElements = listOfElements.map((number, index) => number * (10 - Number(index)))

  const verifierOne = calcVerifierNum(sumOfElements.reduce((a, b) => a + b))
  const cpfSeedSecondRound = (cpfSeed + verifierOne).slice(1)

  listOfElements = cpfSeedSecondRound.split('').map((value) => parseInt(value))
  sumOfElements = listOfElements.map((number, index) => number * (10 - Number(index)))

  const verifierTwo = calcVerifierNum(sumOfElements.reduce((a, b) => a + b))
  const cleanCPF = `${cpfSeed}${verifierOne}${verifierTwo}`
  const formattedCPF = cleanCPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')

  return { cleanCpf: cleanCPF, formattedCpf: formattedCPF, stateCode: getCpfState(cleanCPF) }
}

/**
 *  Calculates the state of the given CPF.
 *
 * @param {string} cpf - The CPF to get the state code.
 * @returns {string[]} The state for the given CPF.
 */
const getCpfState = (cpf: string): string[] => {
  const stateCode = Number(cpf.charAt(8)) as StateCode
  let state
  switch (stateCode) {
    case 0:
      state = ['RS']
      break
    case 1:
      state = ['DF', 'GO', 'MT', 'MS', 'TO']
      break
    case 2:
      state = ['AC', 'AM', 'AP', 'PA', 'RO', 'RR']
      break
    case 3:
      state = ['CE', 'MA', 'PI']
      break
    case 4:
      state = ['AL', 'PB', 'PE', 'RN']
      break
    case 5:
      state = ['BA', 'SE']
      break
    case 6:
      state = ['MG']
      break
    case 7:
      state = ['ES', 'RJ']
      break
    case 8:
      state = ['SP']
      break
    case 9:
      state = ['PR', 'SC']
      break
    default:
      throw new Error('Invalid state code')
  }
  return state
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
  return n2 < 2 ? 0 : 11 - n2
}

// const output = async () => {
//   for (let i = 0; i < 100; i++) {
//     const CPFs = await generateCpf()

//     console.log(`${CPFs.cleanCpf} | ${CPFs.formattedCpf} | ${CPFs.stateCode.join(', ')}`)
//   }
// }

// output()

export { generateCpf }
