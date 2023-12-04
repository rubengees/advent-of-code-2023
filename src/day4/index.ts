import { lines } from "../utils.ts"

const numbersRegex = / (\d+)/g

function matches(line: string): string[] {
  const [winningPart, ownPart] = line.split("|")
  const trimmedWinningPart = winningPart.split(":")[1]

  const winning = [...trimmedWinningPart.matchAll(numbersRegex)].map((it) => it[1])
  const own = [...ownPart.matchAll(numbersRegex)].map((it) => it[1])

  return own.filter((it) => winning.includes(it))
}

export function part1(input: string): string {
  return lines(input)
    .map((line) => matches(line).reduce((acc, _) => acc * 2 || 1, 0))
    .reduce((acc, curr) => acc + curr, 0)
    .toString()
}

export function part2(input: string): string {
  const allLines = lines(input)
  const counts = Object.fromEntries(allLines.map((_, i) => [i, 1]))

  for (const [i, line] of allLines.entries()) {
    const matchesCount = matches(line).length

    for (let j = 0; j < matchesCount; j++) {
      counts[i + j + 1] += counts[i]
    }
  }

  return Object.values(counts)
    .reduce((acc, curr) => acc + curr, 0)
    .toString()
}
