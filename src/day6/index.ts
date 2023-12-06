import { lines } from "../utils.ts"

const numberRegex = /(\d+)/g

type Race = {
  time: number
  distance: number
}

function simulate(totalTime: number, chargeTime: number): number {
  const remainingTime = totalTime - chargeTime

  return remainingTime * chargeTime
}

function findStart(totalTime: number, distance: number): number {
  for (let i = 0; i < totalTime; i++) {
    if (simulate(totalTime, i) > distance) return i
  }

  return NaN
}

function findEnd(totalTime: number, distance: number): number {
  for (let i = totalTime - 1; i >= 0; i--) {
    if (simulate(totalTime, i) > distance) return i
  }

  return NaN
}

function calculateRace(race: Race): number {
  const end = findEnd(race.time, race.distance)
  const start = findStart(race.time, race.distance)

  return end - start + 1
}

export function part1(input: string): string {
  const times = [...lines(input)[0].matchAll(numberRegex)].map(([_, it]) => +it)
  const distances = [...lines(input)[1].matchAll(numberRegex)].map(([_, it]) => +it)
  const races = times.map((time, index) => ({ time, distance: distances[index] }))

  return races
    .map((race) => calculateRace(race))
    .reduce((acc, curr) => acc * curr)
    .toString()
}

export function part2(input: string): string {
  const [time, distance] = [...input.replaceAll(" ", "").matchAll(numberRegex)].map(([_, it]) => +it)

  return calculateRace({ time, distance }).toString()
}
