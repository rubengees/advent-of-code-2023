import { lines } from "../utils.ts"

type Game = {
  id: number
  cubes: { [color: string]: number }[]
}

const gameRegex = new RegExp("Game (\\d+): (.+)")
const cubesRegex = new RegExp("(\\d+) (\\w+)", "g")

function parseLine(line: string): Game {
  const [_, id, cubeLists] = line.match(gameRegex) || []

  const cubes = cubeLists
    .split(";")
    .map((it) => Object.fromEntries([...it.matchAll(cubesRegex)].map(([_, count, color]) => [color, +count])))

  return { id: +id, cubes }
}

function isValid(game: Game): boolean {
  return game.cubes.every(
    (cubes) => (cubes["red"] ?? 0) <= 12 && (cubes["green"] ?? 0) <= 13 && (cubes["blue"] ?? 0) <= 14
  )
}

export function part1(input: string): string {
  return lines(input)
    .map(parseLine)
    .filter(isValid)
    .reduce((acc, curr) => acc + curr.id, 0)
    .toString()
}

function power(game: Game): number {
  const highestCountForColor: { [color: string]: number } = {}

  for (const cube of game.cubes) {
    for (const [color, count] of Object.entries(cube)) {
      highestCountForColor[color] = Math.max(highestCountForColor[color] ?? 0, count)
    }
  }

  return Object.values(highestCountForColor).reduce((acc, curr) => acc * curr, 1)
}

export function part2(input: string): string {
  return lines(input)
    .map(parseLine)
    .map(power)
    .reduce((acc, curr) => acc + curr, 0)
    .toString()
}
