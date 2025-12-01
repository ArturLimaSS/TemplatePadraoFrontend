function apenasNumeros(value: string) {
  if (value !== '' && value !== null && value !== undefined) {
    const valueCleared = value
      .toString()
      .replace(/[^0-9.,]/g, '')
      .replace(',', '.');
    const valor = Number(valueCleared);
    return isNaN(valor) ? 0 : valueCleared;
  }
  return '';
}

export function apenasNumerosInteiros(value: string) {
  const numeros = value.replace(/[^0-9]/g, '');
  return numeros;
}

const documentoMask = (value: string) => {
  let newValue = value;

  if (String(value).length > 11) {
    newValue = cnpjMask(value);
  } else {
    newValue = cpfMask(value);
  }

  return newValue;
};

function cpfMask(value: string) {
  if (!value) {
    return '';
  }
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
}

function cnpjMask(value: string) {
  if (!value) {
    return '';
  }
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d)/, '$1/$2')
    .replace(/(-\d{2})\d+?$/, '$1');
}

function celularMask(value: string) {
  if ((value || false) && value.substr(0, 1) !== '+') {
    const onlyDigits = value.replace(/[^0-9]/g, '');
    let searchPrimeiroSegmento = /(\d{4})(\d)/;
    if (onlyDigits.length > 10) {
      searchPrimeiroSegmento = /(\d{5})(\d)/;
    }
    if (onlyDigits.length == 12) {
      const regexNumeroBrasilCom55 = /(\d{2})(\d{2})(\d{4})(\d{4})/;
      const resultado = regexNumeroBrasilCom55.test(onlyDigits);
      if (resultado) {
        return onlyDigits
          .replace(/\D/g, '')
          .replace(/(\d{2})(\d{2})(\d{4})(\d{4})/, '+$1 ($2) $3-$4');
      }
    }

    if (onlyDigits.length == 13) {
      const regexNumeroBrasilCom55 = /(\d[55])(\d{2})(\d{5})(\d{4})/;
      const resultado = regexNumeroBrasilCom55.test(onlyDigits);
      if (resultado) {
        return onlyDigits
          .replace(/\D/g, '')
          .replace(/(\d{2})(\d{2})(\d{5})(\d{4})/, '+$1 ($2) $3-$4');
      } else {
        return `+${onlyDigits}`;
      }
    }
    return (
      onlyDigits
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(searchPrimeiroSegmento, '$1-$2')
        //.replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
        .replace(/(-\d{4})\d+?$/, '$1')
    );
  } else if ((value || false) && value.substr(0, 1) === '+') {
    const onlyDigits = value.replace(/[^0-9]/g, '');
    if (!verificarDDIBrasileiro(onlyDigits)) {
      return `+${onlyDigits}`;
    }
    let searchSegundoSegmento = /(\d{4})(\d)/;
    if (onlyDigits.length > 10) {
      searchSegundoSegmento = /(\d{5})(\d)/;
    }
    return onlyDigits
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d{2})(\d)/, '($2) $3')
      .replace(searchSegundoSegmento, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1');
  }

  return null;
}

function horaMask(value: string) {
  if (!value) {
    return '';
  }
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1:$2')
    .replace(/(:\d{2})\d+?$/, '$1');
}

function cepMask(value: string) {
  if (!value) {
    return '';
  }
  return value
    .replace(/\D/g, '')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{3})\d+?$/, '$1');
}

function pisMask(value: string) {
  if (!value) {
    return '';
  }
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{5})(\d)/, '$1.$2')
    .replace(/(\d{5}\.)(\d{2})(\d)/, '$1$2-$3')
    .replace(/(-\d{1})\d+?$/, '$1');
}

function identidadeMask(value: string) {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1-$2')
    .replace(/(-\d{1})\d+?$/, '$1');
}

export function primeirasLetrasNome(texto: string) {
  const words = texto.trim().split(' ').filter(Boolean).slice(0, 2);

  return words.map((word) => word[0].toUpperCase()).join('');
}

function formataMoeda(value: number | string, currency: string) {
  if (!value) return '';

  if (!currency) {
    console.error('A moeda (currency) não foi definida.');
    return '';
  }

  const numeroFormatado = new Intl.NumberFormat('pt-BR', {
    style: currency === 'XAU' ? 'decimal' : 'currency',
    currency: currency !== 'XAU' ? currency : undefined,
    minimumFractionDigits: currency === 'XAU' ? 3 : 2,
    maximumFractionDigits: currency === 'XAU' ? 3 : 2,
  }).format(Number(value));

  return `${numeroFormatado} ${currency == 'XAU' ? '(g)' : ''}`;
}

export const clareiaCorEmEx = (cor: string, quantidade: number | string) => {
  return `${cor}${quantidade}`;
};

const mascaraMetalPeso = function (value: string | number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'decimal',
    maximumFractionDigits: 3,
    minimumFractionDigits: 3,
  }).format(Number(value));
};

export const limpaMascaraPeso = (value: string | number) => {
  const maskedValue = value.toString().replace(/\D/g, '');
  const arr = maskedValue.toString().split('');

  const positionToAddDot = arr.length - 3;
  if (positionToAddDot >= 0) {
    arr.splice(positionToAddDot, 0, '.');
  }

  return arr.join('');
};

const limpaMascaraMoeda = function (value: string | number) {
  const maskedValue = value.toString().replace(/\D/g, '');
  const arr = maskedValue.toString().split('');

  const positionToAddDot = arr.length - 2;
  if (positionToAddDot >= 0) {
    arr.splice(positionToAddDot, 0, '.');
  }

  return arr.join('');
};

const formatarParaMascaraMoeda = function (value: string) {
  if (value == undefined) {
    value = '0';
  }
  return Number(value).toFixed(2).toString().replace('.', ',');
};

const formatarMoeda = function (value: string) {
  const result = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
    Number(value),
  );
  return result;
};

const formatarDeMascaraMoeda = function (strValue: string) {
  if (strValue || false) {
    return Number(strValue.toString().replace(/\./g, '').replace(',', '.'));
  }

  return null;
};

const formatarDeMascaraController = function (strValue: string) {
  if (strValue || false) {
    let nvValor = strValue.replace(/\D/g, '');
    nvValor = nvValor.replace(/([0-9]{2})$/g, '.$1');

    return Number(nvValor);
  }

  return null;
};

const validaCPF = function (strCPF: string) {
  if (strCPF) {
    strCPF = strCPF.replace(/\D/g, '');
    let soma = 0;
    let resto;
    if (strCPF == '00000000000') return false;

    for (let i = 1; i <= 9; i++) soma = soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;

    if (resto == 10 || resto == 11) resto = 0;
    if (resto != parseInt(strCPF.substring(9, 10))) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) soma = soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;

    if (resto == 10 || resto == 11) resto = 0;
    if (resto != parseInt(strCPF.substring(10, 11))) return false;
    return true;
  } else {
    return false;
  }
};

const validaHorario = function (value: string) {
  return /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/.test(value);
};

const verificarDDIBrasileiro = function (celular: string) {
  const telefone = String(celular);

  return telefone.substring(0, 3) == '+55' || telefone.substring(0, 2) == '55';
};

export const formatPhone = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{4})\d+?$/, '$1');
};

function validaEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function primeiraLetraMaiuscula(string: string) {
  return String(string).charAt(0).toUpperCase() + String(string).slice(1);
}

export {
  cpfMask,
  documentoMask,
  cnpjMask,
  horaMask,
  celularMask,
  cepMask,
  pisMask,
  identidadeMask,
  formataMoeda,
  apenasNumeros,
  formatarDeMascaraMoeda,
  formatarMoeda,
  formatarParaMascaraMoeda,
  validaCPF,
  validaHorario,
  limpaMascaraMoeda,
  mascaraMetalPeso,
  formatarDeMascaraController,
  validaEmail,
};
