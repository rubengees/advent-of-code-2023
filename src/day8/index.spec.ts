import { describe, expect, test } from "bun:test"
import { readFile } from "node:fs/promises"
import endent from "endent"
import { part1, part2 } from "./index.ts"

describe("day 8", () => {
  test("part 1 example", () => {
    const example = endent`
      RL

      AAA = (BBB, CCC)
      BBB = (DDD, EEE)
      CCC = (ZZZ, GGG)
      DDD = (DDD, DDD)
      EEE = (EEE, EEE)
      GGG = (GGG, GGG)
      ZZZ = (ZZZ, ZZZ)
    `

    const result = part1(example)

    expect(result).toEqual("2")
  })

  test("part 1 example 2", () => {
    const example = endent`
      LLR
      
      AAA = (BBB, BBB)
      BBB = (AAA, ZZZ)
      ZZZ = (ZZZ, ZZZ)
    `

    const result = part1(example)

    expect(result).toEqual("6")
  })

  test("part 1 input", async () => {
    const result = part1((await readFile("src/day8/input.txt")).toString())

    expect(result).toEqual("18673")
  })

  test("part 2 example 2", () => {
    const example = endent`
      LR

      11A = (11B, XXX)
      11B = (XXX, 11Z)
      11Z = (11B, XXX)
      22A = (22B, XXX)
      22B = (22C, 22C)
      22C = (22Z, 22Z)
      22Z = (22B, 22B)
      XXX = (XXX, XXX)
    `

    const result = part2(example)

    expect(result).toEqual("6")
  })

  test("part 2 input", async () => {
    const result = part2((await readFile("src/day8/input.txt")).toString())

    expect(result).toEqual("17972669116327")
  })
})
