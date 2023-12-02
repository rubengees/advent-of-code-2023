import { lines } from "../utils.ts"

export function part1(input: string): string {
  return lines(input)
    .map((line) => {
      const digits = line.split("").filter((char) => Number.isInteger(+char))

      return digits[0] + digits[digits.length - 1]
    })
    .reduce((acc, curr) => acc + +curr, 0)
    .toString()
}

export function part2(input: string): string {
  const words = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]
  const regex = new RegExp(`(?=(${words.join("|")}|\\d))`, "g")

  return lines(input)
    .map((line) => {
      const rawDigits = [...line.matchAll(regex)]
      const digits = rawDigits.map(([_, it]) => (words.indexOf(it) + 1 || it).toString())

      return digits[0] + digits[digits.length - 1]
    })
    .reduce((acc, curr) => acc + +curr, 0)
    .toString()
}
