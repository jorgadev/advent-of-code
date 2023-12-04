import fs from "fs";

const digits = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

export function part1() {
  fs.readFile("day1/input.txt", "utf-8", (err, data) => {
    let value = 0;

    const lines = data.split("\n");
    lines.forEach((line) => {
      let num = "";
      for (let i = 0; i < line.length; i++) {
        if (!isNaN(line[i])) {
          num += line[i];
          break;
        }
      }

      for (let i = line.length - 1; i >= 0; i--) {
        if (!isNaN(line[i])) {
          num += line[i];
          break;
        }
      }

      value += parseInt(num);
    });
    console.log(value);
  });
}

export function part2() {
  fs.readFile("day1/input.txt", "utf-8", (err, data) => {
    let value = 0;

    const lines = data.split("\n");
    lines.forEach((line) => {
      let num = "";

      while (line.length > 0) {
        if (isNaN(line[0])) {
          const starter = digits.find((digit) =>
            line.substring(0, line.length).startsWith(digit)
          );

          if (starter) {
            num += (digits.indexOf(starter) + 1).toString();
            break;
          } else {
            line = line.slice(1);
          }
        } else {
          num += line[0];
          break;
        }
      }

      let i = 0;
      while (line.length > 0 && i < 10) {
        if (isNaN(line[line.length - 1])) {
          const ender = digits.find((digit) => {
            return line.substring(0, line.length - i).endsWith(digit);
          });

          if (ender) {
            num += (digits.indexOf(ender) + 1).toString();
            i++;
            break;
          } else {
            line = line.substring(0, line.length - 1);
            i++;
          }
        } else {
          num += line[line.length - 1];
          i++;
          break;
        }
      }

      value += parseInt(num);
    });
    console.log(value);
  });
}
