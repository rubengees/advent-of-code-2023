import { lines } from "../utils.ts"

const numberRegex = /(\d+)/g

type Race = {
  time: number
  distance: number
}

function range(length: number): number[] {
  return Array.from({ length }, (_, i) => i)
}

function simulate(totalTime: number, chargeTime: number): number {
  const remainingTime = totalTime - chargeTime

  return remainingTime * chargeTime
}

export function part1(input: string): string {
  const times = [...lines(input)[0].matchAll(numberRegex)].map(([_, it]) => +it)
  const distances = [...lines(input)[1].matchAll(numberRegex)].map(([_, it]) => +it)
  const races = times.map((time, index) => ({ time, distance: distances[index] }))

  return races
    .map((race) => range(race.time).filter((it) => simulate(race.time, it) > race.distance).length)
    .reduce((acc, curr) => acc * curr)
    .toString()
}

export function part2(input: string): string {
  const times = [...lines(input)[0].replaceAll(" ", "").matchAll(numberRegex)].map(([_, it]) => +it)
  const distances = [...lines(input)[1].replaceAll(" ", "").matchAll(numberRegex)].map(([_, it]) => +it)
  const races = times.map((time, index) => ({ time, distance: distances[index] }))

  return races
    .map((race) => range(race.time).filter((it) => simulate(race.time, it) > race.distance).length)
    .reduce((acc, curr) => acc * curr)
    .toString()
}
