// Подзадание 1

// Напиши функцию delay(ms), которая возвращает промис, переходящий в состояние "resolved" через ms миллисекунд.
// Значением исполнившегося промиса должно быть то кол - во миллисекунд которое передали во время вызова функции delay.

const delay = ms => {
  // Change this function
   return new Promise((resolve, reject) => {
    
    setTimeout(() => {
      const isSuccess = true;

      if (isSuccess) {
        resolve(ms);
      } else {
        reject("error");
      }
    }, ms);
  });
};

const logger = time => console.log(`Fulfilled after ${time}ms`);

// Tests
delay(2000).then(logger); // Fulfilled after 2000ms
delay(1000).then(logger); // Fulfilled after 1000ms
delay(1500).then(logger); // Fulfilled after 1500ms