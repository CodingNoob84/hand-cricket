'use client'

import { useTeam } from '@/api-hooks/use-current-user'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from 'convex/react'
import { Edit } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { api } from '../../../convex/_generated/api'
import { Button } from '../ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    ModalTitle,
} from '../ui/modal'
import { Textarea } from '../ui/textarea'
import { TeamCard, TeamData } from './team-card'

// Define Zod schema
const TeamformSchema = z.object({
    teamId: z.string().optional(),
    teamName: z
        .string()
        .min(3, { message: 'Team name must be at least 3 characters long' })
        .max(30, { message: 'Team name must be at most 30 characters long' }),
    teamTagline: z
        .string()
        .min(5, { message: 'Tagline must be at least 5 characters long' })
        .max(100, { message: 'Tagline must be at most 100 characters long' }),
})

// Consolidated Form for Creating/Editing a Team
export const CreateEditForm = ({
    isEdit,
    teamData,
}: {
    isEdit: boolean
    teamData: TeamData | null
}) => {
    //console.log('form', isEdit, teamData)
    const createUpdate = useMutation(api.teams.createOrUpdateTeam)
    const form = useForm<z.infer<typeof TeamformSchema>>({
        resolver: zodResolver(TeamformSchema),
        defaultValues: {
            teamId: teamData?._id || '',
            teamName: teamData?.teamName || '',
            teamTagline: teamData?.teamTagline || '',
        },
    })

    async function onSubmit(values: z.infer<typeof TeamformSchema>) {
        await createUpdate({
            //teamId: isEdit ? values.teamId : undefined,
            teamName: values.teamName,
            teamTagline: values.teamTagline,
        })
        // Close the modal or perform additional actions here
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 py-5"
            >
                <FormField
                    control={form.control}
                    name="teamName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Team Name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter your team name"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="teamTagline"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tagline</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Give a proper tagline for your team"
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full">
                    {isEdit ? 'Update Team' : 'Create Team'}
                </Button>
            </form>
        </Form>
    )
}

// Component to Create a New Team
export const CreateTeam = () => {
    const [open, setOpen] = useState(false)
    const { teamData, userData, isLoading } = useTeam()
    console.log('create', teamData)

    if (isLoading) {
        return (
            <TeamCard
                isEdit={true}
                isLoading={isLoading}
                userData={null}
                teamData={null}
            />
        )
    }
    if (teamData) {
        return (
            <TeamCard
                isEdit={true}
                isLoading={isLoading}
                userData={userData}
                teamData={teamData}
            />
        )
    }

    return (
        <>
            <Button onClick={() => setOpen(true)} className="w-full">
                Create New Team
            </Button>

            <Modal open={open} onOpenChange={setOpen}>
                <ModalContent className="h-full">
                    <ModalHeader>
                        <ModalTitle>Create Team</ModalTitle>
                    </ModalHeader>
                    <ModalBody className="h-full">
                        <CreateEditForm isEdit={false} teamData={null} />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

// Component to Edit an Existing Team
export const EditTeam = ({ teamData }: { teamData: TeamData }) => {
    const [open, setOpen] = useState(false)

    return (
        <>
            <Button
                size="icon"
                variant="secondary"
                onClick={() => setOpen(true)}
                asChild
            >
                <Edit className="w-4 h-4" />
            </Button>

            <Modal open={open} onOpenChange={setOpen}>
                <ModalContent className="h-full">
                    <ModalHeader>
                        <ModalTitle>Edit Team</ModalTitle>
                    </ModalHeader>
                    <ModalBody className="h-full">
                        <CreateEditForm isEdit={true} teamData={teamData} />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}
