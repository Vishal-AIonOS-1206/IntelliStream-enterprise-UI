import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    Database,
    Activity,
    ClipboardCheck,
    Settings,
    LogOut,
    Building2,
    Plus,
    ChevronsUpDown,
    User,
    Zap,
} from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarProvider,
    SidebarRail,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const NAV_ITEMS = [
    {
        title: "Executive Cockpit",
        url: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Data Assets",
        url: "/dashboard/assets",
        icon: Database,
    },
    {
        title: "Monitoring",
        url: "/dashboard/monitoring",
        icon: Activity,
    },
    {
        title: "Approvals",
        url: "/dashboard/approvals",
        icon: ClipboardCheck,
    },
    {
        title: "Settings",
        url: "/dashboard/settings",
        icon: Settings,
    },
];

const WORKSPACES = [
    {
        name: "Acme Corp Production",
        type: "Production",
        icon: Building2,
    },
    {
        name: "Acme Corp Staging",
        type: "Staging",
        icon: Building2,
    },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeWorkspace, setActiveWorkspace] = useState(WORKSPACES[0]);

    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full bg-[#020817]">
                <Sidebar className="border-r border-slate-800 bg-[#0B1120]">
                    <SidebarHeader className="border-b border-slate-800 p-4">
                        <div className="flex items-center gap-2 px-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500 text-white">
                                <Zap className="h-5 w-5 fill-current" />
                            </div>
                            <span className="text-lg font-bold tracking-tight text-white">
                                IntelliStream
                            </span>
                        </div>
                    </SidebarHeader>

                    <SidebarContent className="px-2 py-4">
                        <SidebarMenu>
                            {NAV_ITEMS.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={location.pathname === item.url}
                                        tooltip={item.title}
                                        className="h-10 text-slate-400 hover:bg-slate-800 hover:text-cyan-400 data-[active=true]:bg-slate-800 data-[active=true]:text-cyan-400"
                                    >
                                        <Link to={item.url} className="flex items-center gap-3">
                                            <item.icon className="h-5 w-5" />
                                            <span className="font-medium">{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarContent>

                    <SidebarFooter className="border-t border-slate-800 p-4 space-y-4">
                        {/* Workspace Selector */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="w-full justify-start gap-2 px-2 h-12 hover:bg-slate-800 text-slate-300 hover:text-white group"
                                >
                                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-800 group-hover:bg-slate-700 text-cyan-500">
                                        <activeWorkspace.icon className="size-4" />
                                    </div>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold text-white">
                                            {activeWorkspace.name}
                                        </span>
                                        <span className="truncate text-xs text-slate-400">
                                            {activeWorkspace.type}
                                        </span>
                                    </div>
                                    <ChevronsUpDown className="ml-auto size-4 text-slate-500" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg bg-[#0B1120] border-slate-800 text-slate-300"
                                side="top"
                                align="center"
                                sideOffset={4}
                            >
                                <DropdownMenuLabel className="text-xs text-slate-500">
                                    Workspaces
                                </DropdownMenuLabel>
                                {WORKSPACES.map((workspace) => (
                                    <DropdownMenuItem
                                        key={workspace.name}
                                        onClick={() => setActiveWorkspace(workspace)}
                                        className="gap-2 p-2 focus:bg-slate-800 focus:text-cyan-400 cursor-pointer"
                                    >
                                        <div className="flex size-6 items-center justify-center rounded-sm border border-slate-700">
                                            <workspace.icon className="size-4 shrink-0" />
                                        </div>
                                        {workspace.name}
                                    </DropdownMenuItem>
                                ))}
                                <DropdownMenuSeparator className="bg-slate-800" />
                                <DropdownMenuItem
                                    className="gap-2 p-2 focus:bg-slate-800 focus:text-cyan-400 cursor-pointer"
                                    onClick={() => navigate("/onboarding")}
                                >
                                    <div className="flex size-6 items-center justify-center rounded-md border border-slate-700 bg-slate-800">
                                        <Plus className="size-4" />
                                    </div>
                                    <div className="font-medium text-slate-400">Create New Workspace</div>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* User Profile */}
                        <div className="flex items-center gap-3 px-2 py-2 rounded-lg bg-slate-900/50 border border-slate-800">
                            <Avatar className="h-8 w-8 border border-slate-700">
                                <AvatarImage src="/placeholder-user.jpg" alt="@user" />
                                <AvatarFallback className="bg-cyan-950 text-cyan-400">VK</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col flex-1 min-w-0">
                                <span className="text-xs font-medium text-white truncate">Vishal.Khode</span>
                                <span className="text-[10px] text-slate-500 truncate">vishal@intellistream.ai</span>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-slate-400 hover:text-red-400 hover:bg-red-950/20"
                                onClick={() => navigate("/login")}
                            >
                                <LogOut className="h-4 w-4" />
                            </Button>
                        </div>
                    </SidebarFooter>
                    <SidebarRail />
                </Sidebar>

                {/* Main Content */}
                <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
                    <header className="h-16 flex items-center gap-4 border-b border-slate-800 bg-[#0B1120]/50 backdrop-blur-sm px-6 sticky top-0 z-10 w-full animate-in fade-in slide-in-from-top-2 duration-500">
                        <SidebarTrigger className="text-slate-400 hover:text-white" />
                        <div className="flex-1" />
                        {/* Maybe some top header actions here later */}
                    </header>
                    <main className="flex-1 flex flex-col gap-4 p-4 lg:gap-6 lg:p-6 overflow-auto bg-[#020817]">
                        {children}
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
}
