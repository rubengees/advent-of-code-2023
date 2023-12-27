import { describe, expect, test } from "bun:test"
import { readFile } from "node:fs/promises"
import endent from "endent"
import { part1, part2 } from "./index.ts"

describe("day 7", () => {
  test("part 1 simple example", () => {
    const example = endent`
      77888 1
      77788 10
    `

    const result = part1(example)

    expect(result).toEqual("12")
  })

  test("part 1 example", () => {
    const example = endent`
      32T3K 765
      T55J5 684
      KK677 28
      KTJJT 220
      QQQJA 483
    `

    const result = part1(example)

    expect(result).toEqual("6440")
  })

  test("part 1 input", async () => {
    const result = part1((await readFile("src/day7/input.txt")).toString())

    expect(result).toEqual("247815719")
  })

  test("part 2 example", () => {
    const example = endent`
      32T3K 765
      T55J5 684
      KK677 28
      KTJJT 220
      QQQJA 483
    `

    const result = part2(example)

    expect(result).toEqual("5905")
  })

  test("part 2 input", async () => {
    const result = part2((await readFile("src/day7/input.txt")).toString())

    expect(result).toEqual("248747492")
  })
})
