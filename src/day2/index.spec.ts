import { describe, expect, test } from "bun:test"
import { readFile } from "node:fs/promises"
import endent from "endent"
import { part1, part2 } from "./index.ts"

describe("day 2", () => {
  test("part 1 example", () => {
    const example = endent`
      Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
      Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
      Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
      Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
      Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
    `

    const result = part1(example)

    expect(result).toEqual("8")
  })

  test("part 1 input", async () => {
    const result = part1((await readFile("src/day2/input.txt")).toString())

    expect(result).toEqual("2278")
  })

  test("part 2 example", () => {
    const example = endent`
      Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
      Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
      Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
      Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
      Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
    `

    const result = part2(example)

    expect(result).toEqual("2286")
  })

  test("part 2 input", async () => {
    const result = part2((await readFile("src/day2/input.txt")).toString())

    expect(result).toEqual("67953")
  })
})
