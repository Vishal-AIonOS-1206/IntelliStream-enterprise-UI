
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Zap, Plus, ArrowRight, Building2, Server, ChevronRight } from "lucide-react";

// Mock data for existing workspaces
const MOCK_WORKSPACES = [
    { id: "1", name: "Acme Corp Production", role: "Steward", icon: Building2, type: "Production" },
    { id: "2", name: "Acme Corp Staging", role: "Viewer", icon: Server, type: "Staging" },
];

const WorkspaceSelection = () => {
    const navigate = useNavigate();
    const [workspaces] = useState(MOCK_WORKSPACES);

    const handleCreateNew = () => {
        navigate("/onboarding");
    };

    const handleContinue = (workspaceId: string) => {
        console.log("Continuing to workspace:", workspaceId);
        navigate("/"); // Navigate to dashboard
    };

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#020817] text-foreground relative overflow-hidden p-6 sm:p-12">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 w-full max-w-6xl space-y-16"
            >
                {/* Header Section */}
                <div className="text-center space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                        Welcome to IntelliStream
                    </h1>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                        Select a workspace to continue or create a new one.
                    </p>
                </div>

                {/* Main Content Sections */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">

                    {/* LEFT COLUMN: Existing Workspaces */}
                    <div className="space-y-8 flex flex-col">
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-1 bg-cyan-500 rounded-full box-glow-cyan" />
                            <h2 className="text-2xl font-bold text-white">
                                Your Workspaces
                            </h2>
                        </div>

                        <div className="flex flex-col gap-4 flex-1">
                            {workspaces.map((workspace, index) => (
                                <motion.button
                                    key={workspace.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 + 0.3 }}
                                    onClick={() => handleContinue(workspace.id)}
                                    className="group relative w-full text-left overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 p-5 hover:bg-slate-800/80 hover:border-cyan-500/30 transition-all duration-300 flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-5">
                                        <div className="h-12 w-12 rounded-xl bg-cyan-950/30 border border-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:scale-105 group-hover:bg-cyan-950/50 group-hover:border-cyan-500/30 transition-all duration-300">
                                            <workspace.icon className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">
                                                {workspace.name}
                                            </h3>
                                            <div className="mt-1">
                                                <span className="inline-flex items-center rounded-md bg-slate-800 px-2 py-1 text-xs font-medium text-slate-400 ring-1 ring-inset ring-slate-700/50">
                                                    {workspace.role}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="h-10 w-10 rounded-full flex items-center justify-center text-slate-500 group-hover:text-white group-hover:bg-slate-700 transition-all">
                                        <ChevronRight className="h-5 w-5" />
                                    </div>
                                </motion.button>
                            ))}

                            {workspaces.length === 0 && (
                                <div className="flex-1 flex items-center justify-center rounded-2xl border border-dashed border-slate-800 p-8 text-slate-500">
                                    No workspaces found.
                                </div>
                            )}
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Create New Workspace */}
                    <div className="space-y-8 flex flex-col">
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-1 bg-cyan-500 rounded-full box-glow-cyan" />
                            <h2 className="text-2xl font-bold text-white">
                                Create New Workspace
                            </h2>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="flex-1"
                        >
                            <div className="h-full min-h-[320px] relative overflow-hidden rounded-3xl border border-dashed border-slate-800 bg-gradient-to-br from-slate-900/30 to-transparent p-10 flex flex-col items-center justify-center text-center">
                                {/* Hover Effect Background */}
                                <div className="absolute inset-0 bg-cyan-500/5 opacity-0 hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative mb-8 group">
                                    <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full" />
                                    <div className="relative h-20 w-20 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center group-hover:scale-110 group-hover:border-cyan-500/50 transition-all duration-300">
                                        <Plus className="h-8 w-8 text-cyan-400" />
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-3">
                                    New Workspace
                                </h3>

                                <p className="text-slate-400 max-w-xs mx-auto mb-10 leading-relaxed">
                                    Set up a new environment for your organization.
                                </p>

                                <Button
                                    onClick={handleCreateNew}
                                    size="lg"
                                    className="relative overflow-hidden w-full max-w-[200px] h-12 text-base font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] transition-all duration-300"
                                >
                                    Get Started
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            {/* Custom CSS for Glow Effects */}
            <style>{`
                .box-glow-cyan {
                    box-shadow: 0 0 10px rgba(6, 182, 212, 0.5);
                }
            `}</style>
        </div>
    );
};

export default WorkspaceSelection;
