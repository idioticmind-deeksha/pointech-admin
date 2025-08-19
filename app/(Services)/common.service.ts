import JSBI from "jsbi";

export const convertBigIntToNumber = async (
  data: any,
  transactionHash: string,
  network: any
) => {
  try {
    const convertBigInt = (value: any) => {
      if (typeof value === "bigint") {
        return value.toString().replace(/n$/, "");
      } else if (typeof value === "object") {
        for (const prop in value) {
          value[prop] = convertBigInt(value[prop]);
        }
      }
      return value;
    };

    for (const key in data) {
      data[key] = convertBigInt(data[key]);
    }
    data.transactionHash = network.explorer + "tx/" + transactionHash;
    return data;
  } catch (error) {
    throw error;
  }
};

export const convertBigInt = (value: any) => {
  return value.toString().replace(/n$/, "");
};

export const convertWithDecimal = (value: any, decimal: any) => {
  if (isNaN(value)) {
    throw new Error("Value must be numeric");
  }
  value = toFixed(value);

  const decimalBigN = JSBI.BigInt(decimal);
  const convertedDecimal = JSBI.exponentiate(JSBI.BigInt(10), decimalBigN);
  return toWei(value, String(convertedDecimal));
};

export const convertWithMultiply = (value: any, value2: any) => {
  if (isNaN(value)) {
    throw new Error("Value must be numeric");
  }

  const decimalBigN = JSBI.BigInt(value2);
  const convertedDecimal = JSBI.multiply(JSBI.BigInt(10), decimalBigN);
  return toWei(value, String(convertedDecimal));
};

export const divideWithDecimal = (value: any, decimal: any) => {
  decimal = Number(decimal);
  if (!value || value === "0" || Number.isNaN(value)) return 0;
  value = value.toString();

  const decimalBigN = JSBI?.BigInt(decimal);
  const convertedDecimal: any = JSBI.exponentiate(JSBI.BigInt(10), decimalBigN);

  return fromWei(String(value), String(convertedDecimal));
};

function fromWei(value: any, numberOfDecimals: any) {
  const numberOfZerosInDenomination = numberOfDecimals.length - 1;

  if (numberOfZerosInDenomination <= 0) return value;

  let arr = value.split(".");

  const zeroPaddedValue = arr[0].padStart(numberOfZerosInDenomination, "0");
  const integer = zeroPaddedValue.slice(0, -numberOfZerosInDenomination);

  const fraction = zeroPaddedValue
    .slice(-numberOfZerosInDenomination)
    .replace(/\.?0+$/, "")
    .concat(arr[1] ? arr[1] : "");

  if (integer === "") return `0.${fraction}`;
  if (fraction === "") return `${integer}`;
  return `${integer}.${fraction}`;
}

export const toFixed = (x: any) => {
  if (!x) return 0;
  if (Math.abs(x) < 1.0) {
    let e = parseInt(x.toString().split("e-")[1]);
    if (e) {
      x *= Math.pow(10, e - 1);
      x = "0." + new Array(e).join("0") + x.toString().substring(2);
    }
  } else {
    let e = parseInt(x.toString().split("+")[1]);
    if (e > 20) {
      e -= 20;
      x /= Math.pow(10, e);
      x += new Array(e + 1).join("0");
    }
  }
  return x;
};

// Function to convert into wei
function toWei(input: any, unit: any) {
  let ether = numberToString(input); // eslint-disable-line
  const base = unit;
  const baseLength = base.length - 1 || 1;
  if (ether === ".") {
    throw new Error(
      "[ethjs-unit] while converting number " + input + " to wei, invalid value"
    );
  }

  // Is it negative?
  const negative = ether.substring(0, 1) === "-";

  if (negative) {
    ether = ether.substring(1);
  }
  // Split it into a whole and fractional part
  const comps = ether.split("."); // eslint-disable-line
  if (comps.length > 2) {
    throw new Error(
      "[ethjs-unit] while converting number " +
        input +
        " to wei,  too many decimal points"
    );
  }
  let whole = comps[0],
    fraction = comps[1]; // eslint-disable-line
  if (!whole) {
    whole = "0";
  }
  if (!fraction) {
    fraction = "0";
  }
  if (fraction.length > baseLength) {
    throw new Error(
      "[ethjs-unit] while converting number " +
        input +
        " to wei, too many decimal places"
    );
  }

  while (fraction.length < baseLength) {
    fraction += "0";
  }

  if (!parseInt(whole)) {
    return fraction.replace(/^0*(?=[1-9])/g, "");
  }

  if (negative) {
    return "-" + whole + fraction;
  }
  return whole + fraction;
}

function numberToString(arg: any) {
  if (typeof arg === "string") {
    if (!arg.match(/^-?[0-9.]+$/)) {
      throw new Error(
        "while converting number to string, invalid number value '" +
          arg +
          "', should be a number matching (^-?[0-9.]+)."
      );
    }
    return arg;
  } else if (typeof arg === "number") {
    return String(arg);
  } else if (
    typeof arg === "object" &&
    arg.toString &&
    (arg.toTwos || arg.dividedToIntegerBy)
  ) {
    if (arg.toPrecision) {
      return String(arg.toPrecision());
    } else {
      // eslint-disable-line
      return arg.toString(10);
    }
  }
  throw new Error(
    "while converting number to string, invalid number value '" +
      arg +
      "' type " +
      typeof arg +
      "."
  );
}

export const customizeAddress = (address: string) => {
  if (address) {
    const firstFive = address.substring(0, 5);
    const lastFour = address.substring(address.length - 4);
    return firstFive + "..." + lastFour;
    // const BigValue = require("bignumber.js");
  } else {
    return "---";
  }
};

export const operators = {
  ADD: "+",
  SUBTRACT: "-",
  DIVIDE: "/",
  MULTIPLY: "*",
  POWEROFF: "**",
};

export const calculatorBigInt = (num1: any, num2: any, type: string) => {
  switch (type) {
    case operators.ADD:
      return BigInt(num1) + BigInt(num2);
    case operators.SUBTRACT:
      return BigInt(num1) - BigInt(num2);
    case operators.DIVIDE:
      return num1 / num2;
    case operators.MULTIPLY:
      return num1.toString() * num2.toString();
    case operators.POWEROFF:
      return BigInt(num1) ** BigInt(num2);
  }
};

function powerOf(base: any, exponent: any) {
  if (JSBI.LT(exponent, JSBI.BigInt(0))) {
    throw new Error("Exponent must be non-negative.");
  }

  let result = JSBI.BigInt(1);
  let b = base;
  let e = exponent;

  while (JSBI.GT(e, JSBI.BigInt(0))) {
    if (JSBI.EQ(JSBI.bitwiseAnd(e, JSBI.BigInt(1)), JSBI.BigInt(1))) {
      result = JSBI.multiply(result, b);
    }
    b = JSBI.multiply(b, b);
    e = JSBI.signedRightShift(e, JSBI.BigInt(1)); // Divide exponent by 2
  }

  return result;
}
