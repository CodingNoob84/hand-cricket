import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const createMatch = mutation({
    args: { userId: v.id('users'), teamId: v.id('teams') },
    handler: async (ctx, { userId, teamId }) => {
        // Create a new match entry
        const newMatch = {
            teamId,
            userId,
            toss: '', // Optional default value
            innings: 0, // Optional default value
            result: '', // Optional default value
            resultBy: '', // Optional default value
        }

        // Insert the match into the 'matches' table
        const matchId = await ctx.db.insert('matches', newMatch)

        // Return the created matchId
        return matchId
    },
})

export const getMatchData = query({
    args: { matchId: v.string() },
    handler: async (ctx, { matchId }) => {
        // Fetch the match data
        const match = await ctx.db
            .query('matches')
            .filter((q) => q.eq(q.field('_id'), matchId))
            .unique()

        if (!match) {
            throw new Error('Match not found')
        }

        // Fetch the team associated with the match
        const team = await ctx.db.get(match.teamId)

        if (!team) {
            throw new Error('Team not found')
        }

        // Fetch the user associated with the team
        const user = await ctx.db.get(team.userId)

        if (!user) {
            throw new Error('User not found')
        }

        // Return the combined data
        return {
            userId: user._id,
            username: user.name,
            userimage: user.image,
            teamId: team._id,
            teamName: team.teamName,
            teamTagline: team.teamTagline,
            toss: match.toss,
            innings: match.innings,
            result: match.result,
            resultBy: match.resultBy,
        }
    },
})

const MatchDataSchema = v.object({
    toss: v.optional(
        v.union(v.literal('bat'), v.literal('bowl'), v.literal(''))
    ),
    result: v.string(),
    resultBy: v.string(),
    userRuns: v.number(),
    userWickets: v.number(),
    userBalls: v.number(),
    botRuns: v.number(),
    botWickets: v.number(),
    botBalls: v.number(),
})

export const updateMatch = mutation({
    args: {
        matchId: v.id('matches'),
        data: MatchDataSchema,
    },
    handler: async (ctx, { matchId, data }) => {
        const { db } = ctx

        // Fetch the match document
        const match = await db.get(matchId)
        if (!match) {
            throw new Error('Match not found')
        }

        // Update the match document with new data
        await db.patch(matchId, {
            toss: data.toss,
            result: data.result,
            resultBy: data.resultBy,
            userRuns: data.userRuns,
            userWickets: data.userWickets,
            userBalls: data.userBalls,
            botRuns: data.botRuns,
            botWickets: data.botWickets,
            botBalls: data.botBalls,
        })

        return { success: true, message: 'Match updated successfully' }
    },
})
