import { describe, expect, test } from "bun:test"
import { readFile } from "node:fs/promises"
import endent from "endent"
import { part1, part2 } from "./index.ts"

describe("day 3", () => {
  test("part 1 example", () => {
    const example = endent`
      467..114..
      ...*......
      ..35..633.
      ......#...
      617*......
      .....+.58.
      ..592.....
      ......755.
      ...$.*....
      .664.598..
    `

    const result = part1(example)

    expect(result).toEqual("4361")
  })

  test("part 1 input", async () => {
    const result = part1((await readFile("src/day3/input.txt")).toString())

    expect(result).toEqual("521515")
  })

  test("part 2 example", () => {
    const example = endent`
      467..114..
      ...*......
      ..35..633.
      ......#...
      617*......
      .....+.58.
      ..592.....
      ......755.
      ...$.*....
      .664.598..
    `

    const result = part2(example)

    expect(result).toEqual("467835")
  })

  test("part 2 input", async () => {
    const result = part2((await readFile("src/day3/input.txt")).toString())

    expect(result).toEqual("69527306")
  })
})
