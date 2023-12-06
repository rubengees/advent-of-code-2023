import { describe, expect, test } from "bun:test"
import { readFile } from "node:fs/promises"
import endent from "endent"
import { part1, part2 } from "./index.ts"

describe("day 6", () => {
  test("part 1 example", () => {
    const example = endent`
      Time:      7  15   30
      Distance:  9  40  200
    `

    const result = part1(example)

    expect(result).toEqual("288")
  })

  test("part 1 input", async () => {
    const result = part1((await readFile("src/day6/input.txt")).toString())

    expect(result).toEqual("503424")
  })

  test("part 2 example", () => {
    const example = endent`
      Time:      7  15   30
      Distance:  9  40  200
    `

    const result = part2(example)

    expect(result).toEqual("71503")
  })

  test("part 2 input", async () => {
    const result = part2((await readFile("src/day6/input.txt")).toString())

    expect(result).toEqual("32607562")
  })
})
