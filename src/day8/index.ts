import { lines } from "../utils.ts"

type Node = { left: string; right: string }
type Network = { [key: string]: Node }

const lineRegex = /(\w+) = \((\w+), (\w+)\)/

function parseNetwork(input: string[]): Network {
  return Object.fromEntries(
    input.map((line) => {
      const result = lineRegex.exec(line) || []

      return [result[1], { left: result[2], right: result[3] }]
    })
  )
}

function simulate(instructions: string[], network: Network, start: string, end: (value: string) => boolean) {
  let currentKey = start

  for (let i = 0; i < Number.MAX_VALUE; i++) {
    const instruction = instructions[i % instructions.length]
    const node = network[currentKey]

    if (instruction === "L") {
      currentKey = node.left
    } else {
      currentKey = node.right
    }

    if (end(currentKey)) {
      return i + 1
    }
  }

  throw new Error("Infinite loop")
}

export function part1(input: string): string {
  const allLines = lines(input)
  const instructions = allLines[0].split("")
  const network = parseNetwork(allLines.slice(2))

  return simulate(instructions, network, "AAA", (value) => value === "ZZZ").toString()
}

function gcd(a: number, b: number): number {
  return !b ? a : gcd(b, a % b)
}

function lcm(a: number, b: number) {
  return (a / gcd(a, b)) * b
}

export function part2(input: string): string {
  const allLines = lines(input)
  const instructions = allLines[0].split("")
  const network = parseNetwork(allLines.slice(2))

  const results = Object.keys(network)
    .filter((it) => it.endsWith("Z"))
    .map((key) => simulate(instructions, network, key, (value) => value.endsWith("Z")))

  return results.reduce(lcm).toString()
}
