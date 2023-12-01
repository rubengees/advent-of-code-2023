import { describe, expect, test } from "bun:test"
import { readFile } from "node:fs/promises"
import endent from "endent"
import { part1, part2 } from "./index.ts"

describe("day 1", () => {
  test("part 1 example", () => {
    const example = endent`
      1abc2
      pqr3stu8vwx
      a1b2c3d4e5f
      treb7uchet
    `

    const result = part1(example)

    expect(result).toEqual("142")
  })

  test("part 1 input", async () => {
    const result = part1((await readFile("src/day1/input.txt")).toString())

    expect(result).toEqual("54951")
  })

  test("part 2 example", () => {
    const example = endent`
      two1nine
      eightwothree
      abcone2threexyz
      xtwone3four
      4nineeightseven2
      zoneight234
      7pqrstsixteen
    `

    const result = part2(example)

    expect(result).toEqual("281")
  })

  test("part 2 edge case", () => {
    const example = endent`
      sevennine
      eighthree
    `

    const result = part2(example)

    expect(result).toEqual("162")
  })

  test("part 2 input", async () => {
    const result = part2((await readFile("src/day1/input.txt")).toString())

    expect(result).toEqual("55218")
  })
})
