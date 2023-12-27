import { lines } from "../utils.ts"

const possibleCards = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"]

type Hand = { cards: string; bid: number }
type CardCount = { [char: string]: number }

function countChars(input: string): CardCount {
  const result: CardCount = {}

  for (const char of Array.from(input)) {
    result[char] ??= 0
    result[char] += 1
  }

  return result
}

function calculateType(hand: Hand) {
  const cardCounts = countChars(hand.cards)
  const type = Math.max(...Object.values(cardCounts))

  if (type === 3 && Object.values(cardCounts).includes(2)) {
    return 3.5
  }

  if (type === 2 && Object.values(cardCounts).filter((it) => it === 2).length === 2) {
    return 2.5
  }

  return type
}

function compare(a: Hand, b: Hand) {
  const typeDifference = calculateType(a) - calculateType(b)

  if (typeDifference !== 0) {
    return typeDifference
  }

  for (let i = 0; i < a.cards.length; i++) {
    const cardDifference = possibleCards.indexOf(b.cards[i]) - possibleCards.indexOf(a.cards[i])

    if (cardDifference !== 0) {
      return cardDifference
    }
  }

  return 0
}

function parseHand(line: string): Hand {
  const [cards, bid] = line.split(" ")

  return { cards, bid: +bid }
}

export function part1(input: string): string {
  const hands = lines(input).map(parseHand)

  return hands
    .sort((a, b) => compare(a, b))
    .map((hand, index) => hand.bid * (index + 1))
    .reduce((acc, curr) => acc + curr, 0)
    .toString()
}

const possibleCardsPart2 = ["A", "K", "Q", "T", "9", "8", "7", "6", "5", "4", "3", "2", "J"]

function calculateTypePart2(hand: Hand) {
  const cardsWithoutJoker = hand.cards
    .split("")
    .filter((it) => it !== "J")
    .join("")

  const cardCounts = countChars(cardsWithoutJoker)
  const type = Math.max(...Object.values(cardCounts), 0)
  const jokerCount = 5 - cardsWithoutJoker.length

  if (type === 3 && Object.values(cardCounts).includes(2)) {
    return 3.5
  }

  if (type === 2 && Object.values(cardCounts).filter((it) => it === 2).length === 2) {
    return 2.5 + jokerCount
  }

  return type + jokerCount
}

function comparePart2(a: Hand, b: Hand) {
  const typeDifference = calculateTypePart2(a) - calculateTypePart2(b)

  if (typeDifference !== 0) {
    return typeDifference
  }

  for (let i = 0; i < a.cards.length; i++) {
    const cardDifference = possibleCardsPart2.indexOf(b.cards[i]) - possibleCardsPart2.indexOf(a.cards[i])

    if (cardDifference !== 0) {
      return cardDifference
    }
  }

  return 0
}

export function part2(input: string): string {
  const hands = lines(input).map(parseHand)

  return hands
    .sort((a, b) => comparePart2(a, b))
    .map((hand, index) => hand.bid * (index + 1))
    .reduce((acc, curr) => acc + curr, 0)
    .toString()
}
