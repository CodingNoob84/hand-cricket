import { TOTALOVERS, TOTALWICKETS } from '@/lib/contants'

export const Rules = () => {
    return (
        <div className="w-full flex flex-col gap-5 p-4 justify-center items-center px-10 rounded-xl border bg-card text-card-foreground shadow">
            <div className="w-full flex flex-row items-center justify-evenly">
                <div>No of Overs</div>
                <div className="font-bold">{TOTALOVERS}</div>
            </div>
            <div className="w-full flex flex-row items-center justify-evenly">
                <div>No of Wickets</div>
                <div>{TOTALWICKETS}</div>
            </div>
        </div>
    )
}
