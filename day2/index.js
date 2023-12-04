import fs from "fs";

export function part1() {
  fs.readFile("day2/input.txt", "utf-8", (err, data) => {
    let sumOfIds = 0;
    const lines = data.split("\n");

    let obj = {
      red: 12,
      green: 13,
      blue: 14,
    };

    let value = 0;
    lines.forEach((line) => {
      let addId = true;
      const id = parseInt(line.split(":")[0].split(" ")[1]);
      const sets = line.split(": ")[1];

      const setsInGame = sets.split("; ");

      for (let i = 0; i < setsInGame.length; i++) {
        const set = setsInGame[i];
        const matches = set.match(/([0-9][0-9]* [red|green|blue])\w+/g);
        const tooMany = matches.some((el) => {
          const num = parseInt(el.split(" ")[0]);
          const color = el.split(" ")[1];

          return num > obj[color];
        });

        if (tooMany) {
          addId = false;
          break;
        }
      }

      if (addId) {
        value += id;
      }
    });

    console.log(value);
  });
}

export function part2() {
  fs.readFile("day2/input.txt", "utf-8", (err, data) => {
    const lines = data.split("\n");

    let obj = {
      red: 0,
      green: 0,
      blue: 0,
    };

    let sumOfPowers = 0;
    lines.forEach((line) => {
      const matches = line.match(/([0-9][0-9]* [red|green|blue])\w+/g);

      matches.forEach((el) => {
        const num = parseInt(el.split(" ")[0]);
        const color = el.split(" ")[1];

        if (num > obj[color]) {
          obj[color] = num;
        }
      });

      sumOfPowers += obj.red * obj.green * obj.blue;

      obj = { red: 0, green: 0, blue: 0 };
    });

    console.log(sumOfPowers);
  });
}
