const numberRegex = /(\d+)/g

class Mapping {
  constructor(readonly dst: number, readonly src: number, readonly length: number) {}

  map(value: number): number | null {
    if (value < this.src) return null
    if (value + 1 > this.src + this.length) return null

    return value + (this.dst - this.src)
  }

  mapReversed(value: number): number | null {
    if (value < this.dst) return null
    if (value + 1 > this.dst + this.length) return null

    return value - (this.dst - this.src)
  }
}

function parseMappingGroups(groups: string[]) {
  return groups.slice(1).map((group) =>
    group
      .split("\n")
      .slice(1)
      .map((line) => {
        const [dst, src, length] = line.split(" ")

        return new Mapping(+dst, +src, +length)
      })
  )
}

function doMapping(seed: number, mappings: Mapping[]): number {
  return mappings.map((it) => it.map(seed)).filter((it) => it !== null)[0] ?? seed
}

export function part1(input: string): string {
  const groups = input.split("\n\n")
  const seeds = [...groups[0].matchAll(numberRegex)].map(([_, it]) => it)

  const mappings = parseMappingGroups(groups)

  const seedLocations = seeds.map((seed) => {
    return mappings.reduce((seed, mapping) => doMapping(seed, mapping), +seed)
  })

  return Math.min(...seedLocations).toString()
}

type SeedRange = {
  start: number
  end: number
}

function parseSeedRanges(line: string): SeedRange[] {
  const numbers = [...line.matchAll(numberRegex)].map(([_, it]) => it)
  const result = []

  for (let i = 0; i < numbers.length; i += 2) {
    const start = +numbers[i]
    const end = start + +numbers[i + 1]

    result.push({ start, end })
  }

  return result
}

function doReverseMapping(location: number, mappings: Mapping[]): number {
  return mappings.map((it) => it.mapReversed(location)).filter((it) => it !== null)[0] ?? location
}

// This is a bad brute force solution. I tried to intersect ranges but failed :(
export function part2(input: string): string {
  const groups = input.split("\n\n")

  const seedRanges = parseSeedRanges(groups[0])
  const mappings = parseMappingGroups(groups).reverse()

  for (let i = 0; i < Number.MAX_VALUE; i++) {
    const seed = mappings.reduce((location, mapping) => doReverseMapping(location, mapping), i)

    if (seedRanges.some((range) => seed >= range.start && seed <= range.end)) {
      return i.toString()
    }
  }

  return ""
}
