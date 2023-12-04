import fs from "fs";

export function part1() {
  fs.readFile("day3/input.txt", "utf-8", (err, data) => {
    const lines = data.split("\n");

    const numOfCols = lines[0].length;
    let value = 0;

    for (let i = 0; i < lines.length; i++) {
      for (let j = 0; j < lines[i].length; j++) {
        if (!isNaN(lines[i][j])) {
          let num = lines[i][j];

          let k = j + 1;
          while (!isNaN(lines[i][k])) {
            num += lines[i][k];
            k++;
          }

          // left or right
          if (
            lines[i][j - 1] != undefined &&
            lines[i][j - 1] !== "." &&
            isNaN(lines[i][j - 1])
          ) {
            console.log(num, "left");

            value += parseInt(num);
            j += num.length;
          } else if (
            lines[i][j + num.length] != undefined &&
            lines[i][j + num.length] !== "." &&
            isNaN(lines[i][j + num.length])
          ) {
            console.log(num, "right");

            value += parseInt(num);
            j += num.length;
          }

          // up or down
          else {
            let numsToCheck = num.length + 2;

            for (let u = -1; u < numsToCheck - 1; u++) {
              const up =
                lines[i - 1]?.[j + u] != undefined &&
                lines[i - 1]?.[j + u] !== "." &&
                isNaN(lines[i - 1]?.[j + u]);
              const down =
                lines[i + 1]?.[j + u] != undefined &&
                lines[i + 1]?.[j + u] !== "." &&
                isNaN(lines[i + 1]?.[j + u]);

              console.log(num, lines[i + 1]?.[j + u]);

              if (up || down) {
                value += parseInt(num);
                break;
              }
            }
            j += num.length;
          }
        }
      }
    }

    console.log(value);
  });
}

export function part2() {
  fs.readFile("day3/input.txt", "utf-8", (err, data) => {
    const lines = data.split("\n");

    let value = 0;
    for (let i = 0; i < lines.length; i++) {
      for (let j = 0; j < lines[i].length; j++) {
        if (lines[i][j] === "*") {
          const numbers = [];

          // left
          if (!isNaN(lines[i][j - 1])) {
            let num = "";

            for (let k = -3; k < 0; k++) {
              if (!isNaN(lines[i][j + k])) {
                num += lines[i][j + k];
              }
            }

            numbers.push(parseInt(num));
          }

          // left
          if (!isNaN(lines[i][j + 1])) {
            let num = "";

            for (let k = 1; k < 4; k++) {
              if (!isNaN(lines[i][j + k])) {
                num += lines[i][j + k];
              }
            }

            numbers.push(parseInt(num));
          }

          let up = [];
          for (let u = -3; u < 4; u++) {
            up.push(lines[i - 1][j + u]);
          }
          up = up.map((el) => (el ? el : ".")).join("");
          const matchesUp = [...up.matchAll(/\d+/g)];

          matchesUp.forEach((match) => {
            if (match[0].length === 1 && [2, 3, 4].includes(match.index)) {
              numbers.push(parseInt(match[0]));
            } else if (
              match[0].length === 2 &&
              [1, 2, 3, 4].includes(match.index)
            ) {
              numbers.push(parseInt(match[0]));
            } else if (
              match[0].length === 3 &&
              [0, 1, 2, 3, 4].includes(match.index)
            ) {
              numbers.push(parseInt(match[0]));
            }
          });

          let down = [];
          for (let u = -3; u < 4; u++) {
            down.push(lines[i + 1][j + u]);
          }
          down = down.map((el) => (el ? el : ".")).join("");
          const matchesDown = [...down.matchAll(/\d+/g)];

          matchesDown.forEach((match) => {
            if (match[0].length === 1 && [2, 3, 4].includes(match.index)) {
              numbers.push(parseInt(match[0]));
            } else if (
              match[0].length === 2 &&
              [1, 2, 3, 4].includes(match.index)
            ) {
              numbers.push(parseInt(match[0]));
            } else if (
              match[0].length === 3 &&
              [0, 1, 2, 3, 4].includes(match.index)
            ) {
              numbers.push(parseInt(match[0]));
            }
          });

          console.log(numbers);

          if (numbers.length === 2) {
            value += numbers[0] * numbers[1];
          }
        }
      }
    }

    console.log(value);
  });
}
