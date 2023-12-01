import { lines } from "../utils.ts"

export function part1(input: string): string {
  return lines(input)
    .map((line) => {
      const digits = line.split("").filter((char) => /\d/.test(char))

      return digits[0] + digits[digits.length - 1]
    })
    .map((it) => +it)
    .reduce((acc, curr) => acc + curr, 0)
    .toString()
}

export function part2(input: string): string {
  const mapping: { [index: string]: string } = {
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    nine: "9",
  }

  const regex = new RegExp("(?=(" + Object.keys(mapping).join("|") + "|\\d))", "g")

  return lines(input)
    .map((line) => {
      const rawDigits = [...line.matchAll(regex)]
      const digits = rawDigits.map(([_, it]) => mapping[it] ?? it)

      return digits[0] + digits[digits.length - 1]
    })
    .map((it) => +it)
    .reduce((acc, curr) => acc + curr, 0)
    .toString()
}
