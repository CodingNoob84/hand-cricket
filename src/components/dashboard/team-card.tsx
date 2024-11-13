// import { getInitials } from '@/lib/utils'
// import { Edit } from 'lucide-react'
// import { Id } from '../../../convex/_generated/dataModel'
// import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
// import { Button } from '../ui/button'
// import { Skeleton } from '../ui/skeleton'
// import { EditTeam } from './create-edit-block'

// export interface UserData {
//     _id: Id<'users'>
//     _creationTime: number
//     name?: string | undefined
//     role?: 'user' | 'admin' | undefined
//     image?: string | undefined
//     email?: string | undefined
//     emailVerificationTime?: number | undefined
//     isAnonymous?: boolean | undefined
//     phone?: string | undefined
//     phoneVerificationTime?: number | undefined
// }

// export interface TeamData {
//     _id: Id<'teams'>
//     _creationTime: number
//     userId: Id<'users'>
//     teamName: string
//     teamTagline: string
// }

// interface TeamCardProps {
//     isEdit: boolean
//     isLoading: boolean
//     userData: UserData | null | undefined
//     teamData: TeamData | null | undefined
// }

// export const TeamCard = ({
//     isEdit,
//     isLoading,
//     userData,
//     teamData,
// }: TeamCardProps) => {
//     if (isLoading) {
//         return (
//             <div className="w-full flex justify-center items-center max-w-md mx-auto rounded-xl border bg-card text-card-foreground shadow">
//                 <div className="flex flex-col gap-4 my-4 px-4">
//                     <div className="flex flex-row items-center justify-between gap-4">
//                         <div className="flex flex-row items-center gap-4">
//                             <Skeleton className="h-14 w-14 rounded-full" />
//                             <div className="flex flex-col">
//                                 <Skeleton className="h-4 w-32 mb-1" />
//                                 <Skeleton className="h-3 w-24" />
//                             </div>
//                         </div>
//                         <Button variant="secondary" size="icon">
//                             <Edit className="w-4 h-4" />
//                         </Button>
//                     </div>
//                     <div>
//                         <Skeleton className="h-3 w-full mb-1" />
//                         <Skeleton className="h-3 w-3/4" />
//                     </div>
//                 </div>
//             </div>
//         )
//     }
//     if (teamData)
//         return (
//             <div className="w-full flex justify-center items-center max-w-md mx-auto rounded-xl border bg-card text-card-foreground shadow">
//                 <div className="w-full flex flex-col gap-4 my-4 px-4">
//                     <div className="flex flex-row items-center justify-between gap-4">
//                         <div className="flex flex-row items-center gap-4">
//                             <Avatar className="h-14 w-14 text-black">
//                                 <AvatarImage
//                                     src={userData?.image}
//                                     alt={userData?.name}
//                                 />
//                                 <AvatarFallback className="text-black">
//                                     {getInitials(userData?.name || '')}
//                                 </AvatarFallback>
//                             </Avatar>
//                             <div className="flex flex-col">
//                                 <div className="text-md font-semibold">
//                                     {userData?.name}
//                                 </div>
//                                 <p className="text-sm text-muted-foreground">
//                                     Owner of {teamData?.teamName}
//                                 </p>
//                             </div>
//                         </div>
//                         {isEdit && <EditTeam userData={teamData} />}
//                     </div>
//                     <div>
//                         <p className="text-gray-700">{teamData?.teamTagline}</p>
//                     </div>
//                 </div>
//             </div>
//         )
// }
