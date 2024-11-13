import { create } from 'zustand'

// Define the bot's structure
export interface Bot {
    botId: string
    botName: string
    botImage: string
    botTeamName: string
    botTeamTagLine: string
}

// Define the interface for the bot store's state
interface BotState {
    bot: Bot
}

// Create the bot store using Zustand
export const useBotStore = create<BotState>(() => ({
    bot: {
        botId: '0',
        botName: 'Xabara Bot',
        botImage: '/images/bot-image.png',
        botTeamName: 'Dark Devil',
        botTeamTagLine: 'Competing against you!',
    },
}))
