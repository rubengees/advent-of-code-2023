import { lines } from "../utils.ts"

type Point = {
  x: number
  y: number
}

type StringPosition = {
  value: string
  x: number
  y: number
}

function findAll(lines: string[], regex: RegExp): StringPosition[] {
  return lines.flatMap((line, y) =>
    [...line.matchAll(regex)].map((match) => ({
      value: match[0],
      x: match.index ?? 0,
      y,
    }))
  )
}

const symbolRegex = /[*$+%#&=/@\-]/

function isValid(stringPosition: StringPosition, allLines: string[]) {
  for (let x = stringPosition.x - 1; x <= stringPosition.x + stringPosition.value.length; x++) {
    for (let y = stringPosition.y - 1; y <= stringPosition.y + 1; y++) {
      const adjacentChar = allLines[y]?.[x]

      if (symbolRegex.test(adjacentChar)) {
        return true
      }
    }
  }

  return false
}

const partNumberRegex = /\d+/g

export function part1(input: string): string {
  const allLines = lines(input)

  return findAll(allLines, partNumberRegex)
    .filter((it) => isValid(it, allLines))
    .reduce((acc, curr) => acc + +curr.value, 0)
    .toString()
}

function isAdjacent(gear: StringPosition, partNumber: StringPosition) {
  return (
    gear.y >= partNumber.y - 1 &&
    gear.y <= partNumber.y + 1 &&
    gear.x >= partNumber.x - 1 &&
    gear.x <= partNumber.x + partNumber.value.length
  )
}

export function part2(input: string): string {
  const allLines = lines(input)
  const partNumbers = findAll(allLines, partNumberRegex)

  return findAll(allLines, /\*/g)
    .map((gear) => {
      const adjacentPartNumbers = partNumbers.filter((it) => isAdjacent(gear, it))

      if (adjacentPartNumbers.length === 2) {
        return +adjacentPartNumbers[0].value * +adjacentPartNumbers[1].value
      }

      return 0
    })
    .reduce((acc, curr) => acc + curr, 0)
    .toString()
}
