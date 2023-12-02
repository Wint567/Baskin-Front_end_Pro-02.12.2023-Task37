const userData = {
  'USD': 1000,
  'EUR': 900,
  'UAH': 15000,
  'BIF': 20000,
  'AOA': 100
};

const bankData = {
  'USD': {
    max: 3000,
    min: 100,
    img: '💵'
  },
  'EUR': {
    max: 1000,
    min: 50,
    img: '💶'
  },
  'UAH': {
    max: 0,
    min: 0,
    img: '💴'
  },
  'GBP': {
    max: 10000,
    min: 100,
    img: '💷'
  }
};

function getUserInput(promptMessage, validationCallback) {
  let userInput;
  do {
    userInput = prompt(promptMessage).toUpperCase();
  } while (!validationCallback(userInput));
  return userInput;
}

function validateCurrency(currency) {
  return userData.hasOwnProperty(currency);
}

function validateWithdrawalCurrency(currency) {
  return bankData.hasOwnProperty(currency);
}

function validateWithdrawalAmount(amount) {
  return !isNaN(amount) && amount !== null;
}

function getMoney(userData, bankData) {
  return new Promise((resolve, reject) => {
    const viewBalanceQuestion = 'Посмотреть баланс карты?';
    const confirm = window.confirm(viewBalanceQuestion);

    if (confirm) {
      const currency = getUserInput('Введите валюту для просмотра баланса:', validateCurrency);
      const balance = userData[currency];
      alert(`Баланс: ${balance} ${currency}`);
    } else {
      const withdrawCurrency = getUserInput('Введите валюту, которую вы хотите снять:', validateWithdrawalCurrency);
      const currencyInfo = bankData[withdrawCurrency];

      let withdrawAmount = parseFloat(getUserInput('Введите сумму для снятия:', validateWithdrawalAmount));

      if (withdrawAmount > currencyInfo.max || withdrawAmount < currencyInfo.min) {
        const message = withdrawAmount > currencyInfo.max ?
          `Введенная сумма больше разрешенного максимума. Максимальная сумма для снятия: ${currencyInfo.max}`:
          `Введенная сумма меньше разрешенного минимума. Минимальная сумма для снятия: ${currencyInfo.min}`;

        alert(message);
        alert('Спасибо, хорошего дня 😊');
        throw new Error({ userData, bankData });
      }

      alert(`Вот ваши деньги: ${withdrawAmount} ${withdrawCurrency} ${currencyInfo.img}`);
    }

    alert('Спасибо, хорошего дня 😊');
    resolve(userData);
  });
}

getMoney(userData, bankData)
  .then(() => console.log('Операция завершена успешно.'))
  .catch(({ userData, bankData }) => console.log('Снятие наличных отменено.'));