"use client" // Client component hote hobe trigger handle korar jonno

import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import { UserInfo } from "@/types/user.types"
import { Key, LogOut, User } from "lucide-react"
import Link from "next/link"
import Swal from "sweetalert2"
import { useRouter } from "next/navigation"
import { logoutUser } from "@/services/auth.service"


interface UserDropdownProps {
    userInfo: UserInfo
}

const UserDropdown = ({ userInfo }: UserDropdownProps) => {
    const router = useRouter();

    const handleLogout = async () => {
    const result = await Swal.fire({
        title: 'Logout?',
        text: "Are you sure you want to exit?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, Logout'
    });

    if (result.isConfirmed) {
        const success = await logoutUser();

        if (success) {
            Swal.fire({
                title: 'Logged Out!',
                icon: 'success',
                timer: 1000,
                showConfirmButton: false
            });
            router.push("/login");
            router.refresh();
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'Something went wrong while logging out.',
                icon: 'error'
            });
        }
    }
};

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-full border border-input bg-background h-9 w-9 hover:bg-accent hover:text-accent-foreground">
                <span className="text-sm font-semibold">
                    {userInfo.name.charAt(0).toUpperCase()}
                </span>
            </DropdownMenuTrigger>

            <DropdownMenuContent align={"end"} className="w-56">
                <DropdownMenuGroup>
                    <DropdownMenuLabel>
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium">
                                {userInfo.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                {userInfo.email}
                            </p>
                            <p className="text-xs text-primary capitalize">
                                {userInfo.role.toLowerCase().replace("_", " ")}
                            </p>
                        </div>
                    </DropdownMenuLabel>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuItem >
                    <Link href={"/my-profile"} className="flex w-full items-center">
                        <User className="mr-2 h-4 w-4" />
                        My Profile
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuItem >
                    <Link href={"/change-password"} className="flex w-full items-center">
                        <Key className="mr-2 h-4 w-4" />
                        Change Password
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem 
                    onClick={handleLogout} 
                    className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserDropdown