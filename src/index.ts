import fs from "node:fs/promises"
import { performance } from "node:perf_hooks"
import { Argument, Command, InvalidArgumentError } from "commander"
import endent from "endent"

type Program = {
  part1(input: string): string
  part2(input: string): string
}

function parseDay(day: string): string {
  const parsed = parseInt(day)

  if (!Number.isInteger(parsed)) {
    throw new InvalidArgumentError("Must be a number")
  }

  if (parsed < 1 || parsed > 25) {
    throw new InvalidArgumentError("Must be a number between 1 and 25")
  }

  return day
}

const runCommand = new Command("run")
  .addArgument(new Argument("[day]", "the day to run (should be between 1 and 25)").argParser(parseDay))
  .action(async (day: string | undefined) => {
    if (day) {
      await runDay(+day)
    } else {
      let totalTime = 0

      for (let i = 1; i <= 25; i++) {
        if (await fs.exists(`./src/day${i}`)) {
          totalTime += await runDay(i)

          console.log()
        }
      }

      console.log(`Ran all parts in ${totalTime.toFixed(3)}ms.`)
    }
  })

async function runDay(day: number) {
  let program: Program
  let input: string

  try {
    program = (await import(`./day${day}/index.ts`)) as Program
  } catch (e) {
    throw new Error(`Did not find program for day ${day}`, { cause: e })
  }

  try {
    input = (await fs.readFile(`./src/day${day}/input.txt`)).toString()
  } catch (e) {
    throw new Error(`Could not read input for day ${day}`, { cause: e })
  }

  console.log(`Running day ${day}...`)

  const startTime1 = performance.now()
  program.part1(input)
  const endTime1 = performance.now()
  const totalTime1 = endTime1 - startTime1

  console.log(`Ran part 1 in ${totalTime1.toFixed(3)}ms.`)

  const startTime2 = performance.now()
  program.part2(input)
  const endTime2 = performance.now()
  const totalTime2 = endTime2 - startTime2

  console.log(`Ran part 2 in ${totalTime2.toFixed(3)}ms.`)

  return totalTime1 + totalTime2
}

const newCommand = new Command("new")
  .addArgument(new Argument("<day>", "the day to generate for (should be between 1 and 25)").argParser(parseDay))
  .action(async (day: string) => {
    const dayFile = endent`
      export function part1(input: string): string {
        return ""
      }
      
      export function part2(input: string): string {
        return ""
      }
    `

    const testFile = endent`
        import { describe, expect, test } from "bun:test"
        import { readFile } from "node:fs/promises"
        import endent from "endent"
        import { part1, part2 } from "./index.ts"
        
        describe("day ${day}", () => {
          test.todo("part 1 example", () => {
            const example = endent\`
              
            \`
        
            const result = part1(example)
        
            expect(result).toEqual("")
          })
        
          test.todo("part 1 input", async () => {
            const result = part1((await readFile("src/day${day}/input.txt")).toString())
        
            expect(result).toEqual("")
          })
        
          test.todo("part 2 example", () => {
            const example = endent\`
              
            \`
        
            const result = part2(example)
        
            expect(result).toEqual("")
          })
        
          test.todo("part 2 input", async () => {
            const result = part2((await readFile("src/day${day}/input.txt")).toString())
        
            expect(result).toEqual("")
          })
        })
    `

    await fs.mkdir(`src/day${day}`, { recursive: true })

    await Promise.all([
      fs.appendFile(`src/day${day}/input.txt`, ""),
      fs.writeFile(`src/day${day}/index.ts`, dayFile),
      fs.writeFile(`src/day${day}/index.spec.ts`, testFile),
    ])
  })

new Command()
  .version("1.0.0", "-v, --version")
  .name("advent-of-code-2023")
  .addCommand(runCommand)
  .addCommand(newCommand)
  .parse(process.argv)
