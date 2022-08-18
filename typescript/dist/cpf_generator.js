const generateCpf = async (stateCode = undefined) => {
    await Promise.resolve();
    const cpfSeed = stateCode ? randomCpfSeed().substring(0, 8) + stateCode : randomCpfSeed();
    let listOfElements = cpfSeed.split('').map((value) => parseInt(value));
    let sumOfElements = listOfElements.map((number, index) => number * (10 - Number(index)));
    const verifierOne = calcVerifierNum(sumOfElements.reduce((a, b) => a + b));
    const cpfSeedSecondRound = (cpfSeed + verifierOne).slice(1);
    listOfElements = cpfSeedSecondRound.split('').map((value) => parseInt(value));
    sumOfElements = listOfElements.map((number, index) => number * (10 - Number(index)));
    const verifierTwo = calcVerifierNum(sumOfElements.reduce((a, b) => a + b));
    const cleanCPF = `${cpfSeed}${verifierOne}${verifierTwo}`;
    const formattedCPF = cleanCPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    return { cleanCpf: cleanCPF, formattedCpf: formattedCPF, stateCode: getCpfState(cleanCPF) };
};
const getCpfState = (cpf) => {
    const stateCode = Number(cpf.charAt(8));
    let state;
    switch (stateCode) {
        case 0:
            state = ['RS'];
            break;
        case 1:
            state = ['DF', 'GO', 'MT', 'MS', 'TO'];
            break;
        case 2:
            state = ['AC', 'AM', 'AP', 'PA', 'RO', 'RR'];
            break;
        case 3:
            state = ['CE', 'MA', 'PI'];
            break;
        case 4:
            state = ['AL', 'PB', 'PE', 'RN'];
            break;
        case 5:
            state = ['BA', 'SE'];
            break;
        case 6:
            state = ['MG'];
            break;
        case 7:
            state = ['ES', 'RJ'];
            break;
        case 8:
            state = ['SP'];
            break;
        case 9:
            state = ['PR', 'SC'];
            break;
        default:
            throw new Error('Invalid state code');
    }
    return state;
};
const randomCpfSeed = () => {
    let cpf = '';
    for (let i = 0; i < 9; i++) {
        cpf += Math.floor(Math.random() * 10);
    }
    return cpf;
};
const calcVerifierNum = (n1) => {
    const n2 = n1 % 11;
    return n2 < 2 ? 0 : 11 - n2;
};
const output = async () => {
    for (let i = 0; i < 100; i++) {
        const CPFs = await generateCpf();
        console.log(`${CPFs.cleanCpf} | ${CPFs.formattedCpf} | ${CPFs.stateCode.join(', ')}`);
    }
};
output();
export { generateCpf };
//# sourceMappingURL=cpf_generator.js.map