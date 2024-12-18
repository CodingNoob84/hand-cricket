'use client'
import { useMatchStore } from '@/store/match-store'
import { CommentaryBlock } from './commentary-block'
import { DisplayBlock } from './display-block'
import { InningsBreak } from './innings-break'
import { RunsBlock } from './runs-block'
import CricketSummary from './summary'
import { TeamScore } from './team-score'

export const GameLayout = () => {
    const inningsEnded = useMatchStore((state) => state.isInningsEnded)
    const result = useMatchStore((state) => state.result)
    console.log('gamelayout', result, inningsEnded)
    if (inningsEnded && result == '') {
        return <InningsBreak />
    }
    return (
        <>
            {result == '' ? (
                <div className="flex-grow flex flex-col overflow-auto lg:overflow-auto lg:h-screen p-4">
                    <TeamScore />
                    <CommentaryBlock />
                    <DisplayBlock />
                    <RunsBlock />
                </div>
            ) : (
                <CricketSummary />
            )}
        </>
    )
}
