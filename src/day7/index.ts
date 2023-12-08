import { lines } from "../utils.ts"

const possibleCards = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"]

type CardCount = { [char: string]: number }

function countChars(input: string): CardCount {
  const result: CardCount = {}

  for (const char of Array.from(input)) {
    result[char] ??= 0
    result[char] += 1
  }

  return result
}

class Hand {
  constructor(readonly cards: string, readonly bid: number) {}

  compareTo(other: Hand): number {
    const typeDifference = this.type - other.type

    if (typeDifference === 0) {
      for (let i = 0; i < this.cards.length; i++) {
        const cardDifference = possibleCards.indexOf(other.cards[i]) - possibleCards.indexOf(this.cards[i])

        if (cardDifference !== 0) {
          return cardDifference
        }
      }

      throw new Error(`Duplicate detected: ${this.cards}`)
    }

    return typeDifference
  }

  private get type() {
    const cardCounts = countChars(this.cards)
    const type = Math.max(...Object.values(cardCounts))

    if (type === 3 && Object.values(cardCounts).includes(2)) {
      return 3.5
    }

    if (type === 2 && Object.values(cardCounts).filter((it) => it === 2).length === 2) {
      return 2.5
    }

    return type
  }
}

function parseHand(line: string): Hand {
  const [cards, bid] = line.split(" ")

  return new Hand(cards, +bid)
}

export function part1(input: string): string {
  const hands = lines(input).map(parseHand)

  return hands
    .sort((a, b) => a.compareTo(b))
    .map((hand, index) => hand.bid * (index + 1))
    .reduce((acc, curr) => acc + curr, 0)
    .toString()
}

export function part2(input: string): string {
  return ""
}
