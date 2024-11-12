'use server'

import { getAuthUserId } from '@convex-dev/auth/server'
import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const getTeamId = query({
    args: {},
    handler: async (ctx) => {
        // Get the authenticated user's ID
        const userId = await getAuthUserId(ctx)

        // Ensure the user is authenticated
        if (!userId) {
            throw new Error('User must be authenticated to fetch teamId.')
        }

        // Query to find the user's team
        const team = await ctx.db
            .query('teams')
            .filter((q) => q.eq(q.field('userId'), userId))
            .first()

        // If no team is found, return null or handle accordingly
        if (!team) {
            throw new Error('User must be authenticated to fetch teamId.')
        }

        // Return the userId and teamId
        return { userId, teamId: team._id }
    },
})

export const getCurrenTeam = query({
    args: {},
    handler: async (ctx) => {
        const userId = await getAuthUserId(ctx)

        // Fetch the current team for the authenticated user
        const currentTeam = await ctx.db
            .query('teams')
            .filter((q) => q.eq(q.field('userId'), userId))
            .first()

        return currentTeam
    },
})

export const createOrUpdateTeam = mutation({
    args: {
        teamName: v.string(),
        teamTagline: v.string(),
    },
    handler: async (ctx, { teamName, teamTagline }) => {
        const userId = await getAuthUserId(ctx)

        if (!userId) {
            throw new Error(
                'User must be authenticated to create or update a team.'
            )
        }

        // Check if a team already exists for this user
        const existingTeam = await ctx.db
            .query('teams')
            .filter((q) => q.eq(q.field('userId'), userId))
            .first()

        if (existingTeam) {
            // Update the existing team
            await ctx.db.patch(existingTeam._id, {
                teamName,
                teamTagline,
            })
            return { status: 'updated', teamId: existingTeam._id }
        } else {
            // Create a new team
            const newTeamId = await ctx.db.insert('teams', {
                userId,
                teamName,
                teamTagline,
            })
            return { status: 'created', teamId: newTeamId }
        }
    },
})
