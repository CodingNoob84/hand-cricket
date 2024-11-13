import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const getInitials = (name: string): string => {
    return name
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase())
        .join('')
}

export const getPlayers = (number: number, toss: 'bat' | 'bowl'): string => {
    const ordinalNumber = getOrdinalSuffix(number)

    if (toss === 'bat') {
        return `${ordinalNumber} wicket`
    } else if (toss === 'bowl') {
        return `${ordinalNumber} over`
    } else {
        throw new Error('Invalid toss value')
    }
}

export const convertToOvers = (balls: number): string => {
    const overs = Math.floor(balls / 6)
    const remainingBalls = balls % 6
    return `${overs}.${remainingBalls}`
}

export const getPlayerScore = (
    runs: number,
    balls: number,
    wickets: number | undefined,
    toss: 'bat' | 'bowl'
): string => {
    if (toss === 'bat') {
        return `${runs} (${balls})`
    } else if (toss === 'bowl') {
        const overs = Math.floor(balls / 6)
        const remainingBalls = balls % 6
        return `${runs} - ${wickets} (${overs}.${remainingBalls})`
    } else {
        throw new Error('Invalid toss value')
    }
}

export const getOrdinalSuffix = (num: number): string => {
    const j = num % 10,
        k = num % 100

    if (j === 1 && k !== 11) {
        return `${num}st`
    }
    if (j === 2 && k !== 12) {
        return `${num}nd`
    }
    if (j === 3 && k !== 13) {
        return `${num}rd`
    }
    return `${num}th`
}
