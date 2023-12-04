import fs from "fs";

export function part1() {
  fs.readFile("day4/input.txt", "utf-8", (err, data) => {
    const lines = data.split("\n");

    let value = 0;

    for (let i = 0; i < lines.length; i++) {
      let [winningNumbers, cardNumbers] = lines[i]
        .split(":")[1]
        .split("|")
        .map((el) =>
          el
            .trim()
            .match(/\d+/g)
            .map((el) => parseInt(el))
        );

      const numOfMatches = cardNumbers.filter((el) =>
        winningNumbers.includes(el)
      ).length;

      let lineValue = 0;
      if (numOfMatches > 0) {
        lineValue += 1;

        for (let i = 0; i < numOfMatches - 1; i++) {
          lineValue *= 2;
        }
      }

      value += lineValue;
    }

    console.log(value);
  });
}

export function part2() {
  fs.readFile("day4/input.txt", "utf-8", (err, data) => {
    const lines = data.split("\n");

    let obj = {};

    for (let i = 0; i < lines.length; i++) {
      if (!obj[i + 1]) {
        obj[i + 1] = 1;
      } else {
        obj[i + 1] += 1;
      }

      let [winningNumbers, cardNumbers] = lines[i]
        .split(":")[1]
        .split("|")
        .map((el) =>
          el
            .trim()
            .match(/\d+/g)
            .map((el) => parseInt(el))
        );

      const numOfMatches = cardNumbers.filter((el) =>
        winningNumbers.includes(el)
      ).length;

      let check = obj[i + 1];
      while (check > 0) {
        for (let j = 1; j < numOfMatches + 1; j++) {
          if (!obj[i + j + 1]) {
            obj[i + j + 1] = 1;
          } else {
            obj[i + j + 1] += 1;
          }
        }

        check--;
      }
    }

    console.log(Object.values(obj).reduce((a, b) => a + b, 0));
  });
}
