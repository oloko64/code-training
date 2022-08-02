interface CpfTypes {
    cleanCpf: string;
    formattedCpf: string;
  }

const randomCpfSeed = () => {
  let cpf = '';
  for (let i = 0; i < 9; i++) {
    cpf += Math.floor(Math.random() * 10);
  }
  return cpf;
};

const calcVerifierNum = (n1: number) => {
  const n2 = n1 % 11;
  if (n2 < 2) {
    return 0;
  }
  return 11 - n2;
};

const calculate = (): CpfTypes => {
  const baseValue = randomCpfSeed();
  let vecSum = baseValue.split('').map((x) => parseInt(x, 10));
  let vecMultiplied = vecSum.map((_, index) => vecSum[index] * (10 - Number(index)));

  const verifierOne = calcVerifierNum(vecMultiplied.reduce((a, b) => a + b));
  const baseSecondRun = (baseValue + verifierOne).slice(1);

  vecSum = baseSecondRun.split('').map((x) => parseInt(x, 10));
  vecMultiplied = vecSum.map((_, index) => vecSum[index] * (10 - Number(index)));

  const verifierTwo = calcVerifierNum(vecMultiplied.reduce((a, b) => a + b));

  const cleanCPF = `${baseValue}${verifierOne}${verifierTwo}`;
  const formattedCPF = cleanCPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

  console.log(cleanCPF);
  console.log(formattedCPF);
  return { cleanCpf: cleanCPF, formattedCpf: formattedCPF };
};

calculate();
