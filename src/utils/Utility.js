export default class Utility {
  static isValidField = term => {
    let length = term.trim().length;
    return length > 0;
  };

  static isEmailValid = term => {
    const expression = 'azertyuiopqsdfghjklmwxcvbn';
    let isValid = expression.test(String(term).toLowerCase());
    return;
  };
}
