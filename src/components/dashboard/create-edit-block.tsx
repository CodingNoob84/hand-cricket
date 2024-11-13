'use client'

import { getInitials } from '@/lib/utils'
import { UserTeamData, useUserStore } from '@/store/user-store'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from 'convex/react'
import { Edit } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { api } from '../../../convex/_generated/api'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
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
    userData,
    setOpen,
}: {
    isEdit: boolean
    userData: UserTeamData | null
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    //console.log('form', isEdit, teamData)
    const [isLoading, setIsLoading] = useState(false)
    const createUpdate = useMutation(api.teams.createOrUpdateTeam)
    const form = useForm<z.infer<typeof TeamformSchema>>({
        resolver: zodResolver(TeamformSchema),
        defaultValues: {
            teamId: userData?.teamId || '',
            teamName: userData?.teamName || '',
            teamTagline: userData?.teamTagline || '',
        },
    })

    async function onSubmit(values: z.infer<typeof TeamformSchema>) {
        setIsLoading(true)
        const result = await createUpdate({
            //teamId: isEdit ? values.teamId : undefined,
            teamName: values.teamName,
            teamTagline: values.teamTagline,
        })
        if (result.status == 'updated' || result.status == 'created') {
            setIsLoading(false)
            setOpen(false)
        }
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
                <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading} // Disable button while loading
                >
                    {isLoading
                        ? 'Loading'
                        : isEdit
                          ? 'Update Team'
                          : 'Create Team'}
                </Button>
            </form>
        </Form>
    )
}

// Component to Create a New Team
export const CreateTeam = () => {
    const [open, setOpen] = useState(false)
    const userData = useUserStore((state) => state.user)
    //console.log('create', userData)

    if (userData?.teamId) {
        return (
            <div className="w-full flex justify-center items-center max-w-md mx-auto rounded-xl border bg-card text-card-foreground shadow">
                <div className="w-full flex flex-col gap-4 my-4 px-4">
                    <div className="flex flex-row items-center justify-between gap-4">
                        <div className="flex flex-row items-center gap-4">
                            <Avatar className="h-14 w-14 text-black">
                                <AvatarImage
                                    src={userData.userImage}
                                    alt={userData.userName}
                                />
                                <AvatarFallback className="text-black">
                                    {getInitials(userData.userName)}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <div className="text-md font-semibold">
                                    {userData.userName}
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Owner of {userData.teamName}
                                </p>
                            </div>
                        </div>
                        <EditTeam userData={userData} />
                    </div>
                    <div>
                        <p className="text-gray-700">{userData.teamTagline}</p>
                    </div>
                </div>
            </div>
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
                        <CreateEditForm
                            isEdit={false}
                            userData={null}
                            setOpen={setOpen}
                        />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

// Component to Edit an Existing Team
export const EditTeam = ({ userData }: { userData: UserTeamData }) => {
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
                        <CreateEditForm
                            isEdit={true}
                            userData={userData}
                            setOpen={setOpen}
                        />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}
