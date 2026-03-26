"use client"

import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NavSection } from "@/types/dashboard.types";
import { UserInfo } from "@/types/user.types";
import { Menu, Search } from "lucide-react";
import { useSyncExternalStore, useState } from "react";

import UserDropdown from "./UserDropdown";
import DashboardMobileSidebar from "./DashboardMobileSidebar";


interface DashboardNavbarProps {
    userInfo: UserInfo;
    navItems: NavSection[];
    dashboardHome: string
}

const subscribe = () => () => {};

const DashboardNavbarContent = ({ dashboardHome, navItems, userInfo }: DashboardNavbarProps) => {

    const [isOpen, setIsOpen] = useState(false);
    const mounted = useSyncExternalStore(subscribe, () => true, () => false);

    return (
        <div className="flex items-center gap-4 w-full px-4 py-3 border-b bg-background">
            {/* Mobile Menu Toggle Button And Menu */}
            {mounted && (
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger
                        className="md:hidden inline-flex items-center justify-center h-9 w-9 rounded-lg border border-input bg-background hover:bg-muted"
                        aria-label="Open menu"
                    >
                        <Menu className="h-5 w-5" />
                    </SheetTrigger>

                    <SheetContent side="left" className="w-64 p-0">
                        <DashboardMobileSidebar userInfo={userInfo} dashboardHome={dashboardHome} navItems={navItems} />
                    </SheetContent>
                </Sheet>
            )}

            {/* Placeholder so layout doesn't shift before mount */}
            {!mounted && (
                <div className="md:hidden h-9 w-9" aria-hidden="true" />
            )}


            {/* Search Component */}
            <div className="flex-1 flex items-center">
                <div className="relative w-full hidden sm:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input type="text" placeholder="Search..." className="pl-9 pr-4" />
                </div>
            </div>


            {/* Right Side Actions */}
            <div className="flex items-center gap-2">
                {/* User Dropdown  */}
                <UserDropdown userInfo={userInfo} />
            </div>
        </div>
    )
}

export default DashboardNavbarContent