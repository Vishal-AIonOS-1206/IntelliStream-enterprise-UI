
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Zap, CheckCircle2, Box, Database, HardDrive, Loader2, ArrowRight, ArrowLeft, Plus } from "lucide-react";

const STEPS = [
    { id: 1, name: "Create Workspace" },
    { id: 2, name: "Connect Platform" },
    { id: 3, name: "Setup" },
];

const DATA_PLATFORMS = [
    { id: "databricks", name: "Databricks", type: "Lakehouse platform", icon: Box, popular: true },
    { id: "snowflake", name: "Snowflake", type: "Cloud data warehouse", icon: Database, popular: true },
    { id: "bigquery", name: "BigQuery", type: "Google Cloud warehouse", icon: Database, popular: false },
    { id: "microsoft-fabric", name: "Microsoft Fabric", type: "Unified analytics", icon: Box, popular: false },
    { id: "object-storage", name: "Object Storage", type: "S3, Azure Blob, GCS", icon: HardDrive, popular: false },
];

const Onboarding = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    // Step 1 State
    const [workspaceName, setWorkspaceName] = useState("");
    const [environment, setEnvironment] = useState("");

    // Step 2 State
    const [selectedPlatform, setSelectedPlatform] = useState("");
    const [connectionStatus, setConnectionStatus] = useState("idle"); // idle, testing, success, failed

    // Step 3 State
    const [discoveryStatus, setDiscoveryStatus] = useState("idle"); // idle, connecting, discovering, complete

    const handleStep1Submit = (e: React.FormEvent) => {
        e.preventDefault();
        setCurrentStep(2);
    };

    const handlePlatformSelect = (platformId: string) => {
        setSelectedPlatform(platformId);
        setConnectionStatus("idle");
    };

    const handleTestConnection = () => {
        setConnectionStatus("testing");
        // Simulate testing delay
        setTimeout(() => {
            setConnectionStatus("success");
        }, 2000);
    };

    const handleConnectAndDiscover = () => {
        setDiscoveryStatus("connecting");
        setCurrentStep(3);

        // Simulate Discovery Process
        setTimeout(() => setDiscoveryStatus("discovering"), 1500);
        setTimeout(() => setDiscoveryStatus("complete"), 4500);
    };

    const handleAddAnotherSource = () => {
        setDiscoveryStatus("idle");
        setSelectedPlatform("");
        setCurrentStep(2);
    };

    const handleFinish = () => {
        navigate("/dashboard");
    };

    return (
        <div className="min-h-screen w-full flex flex-col bg-[#020817] relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-grid opacity-20" />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-background/80 to-background pointer-events-none" />

            {/* Header */}
            <div className="relative z-10 pt-6 pb-4 text-center space-y-4">
                <div className="flex justify-center items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/20 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                        <Zap className="h-6 w-6 text-cyan-400 fill-cyan-400" />
                    </div>
                    <span className="text-2xl font-bold text-white tracking-tight">IntelliStream</span>
                </div>

                {/* Stepper */}
                <div className="flex justify-center items-center gap-4">
                    {STEPS.map((step, index) => (
                        <div key={step.id} className="flex items-center">
                            <div className="flex items-center gap-2">
                                <div className={`h-2.5 w-2.5 rounded-full ${currentStep >= step.id ? "bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]" : "bg-slate-700"}`} />
                                <span className={`text-base font-medium ${currentStep >= step.id ? "text-cyan-400" : "text-slate-500"}`}>
                                    {step.name}
                                </span>
                            </div>
                            {index < STEPS.length - 1 && (
                                <div className="w-16 h-[2px] bg-slate-800 mx-3" />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className="relative z-10 flex-1 flex items-center justify-center p-4">
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="w-full max-w-2xl"
                >
                    {/* STEP 1: CREATE WORKSPACE */}
                    {currentStep === 1 && (
                        <Card className="border-slate-800 bg-[#0F172A] shadow-2xl">
                            <CardHeader className="space-y-2 pb-6 px-8 pt-8">
                                <CardTitle className="text-3xl font-bold text-white tracking-tight">Create your workspace</CardTitle>
                                <CardDescription className="text-lg text-slate-400 leading-relaxed">
                                    IntelliStream will automatically discover and monitor your data once connected.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="px-8 pb-4">
                                <form id="step1-form" onSubmit={handleStep1Submit} className="space-y-6">
                                    <div className="space-y-3">
                                        <Label htmlFor="workspaceName" className="text-lg font-semibold text-white">Workspace Name</Label>
                                        <Input
                                            id="workspaceName"
                                            placeholder="e.g., Production Data Warehouse"
                                            value={workspaceName}
                                            onChange={(e) => setWorkspaceName(e.target.value)}
                                            required
                                            className="bg-[#020817]/60 border-slate-700 h-12 text-lg text-white placeholder:text-slate-600 focus-visible:ring-cyan-500/50 focus-visible:border-cyan-500 px-4 rounded-lg"
                                        />
                                        <p className="text-sm text-slate-500 pl-1">A descriptive name for your data environment</p>
                                    </div>
                                    <div className="space-y-3">
                                        <Label className="text-lg font-semibold text-white">Environment</Label>
                                        <Select value={environment} onValueChange={setEnvironment} required>
                                            <SelectTrigger className="bg-[#020817]/60 border-slate-700 h-12 text-lg text-white focus:ring-cyan-500/50 focus:border-cyan-500 px-4 rounded-lg">
                                                <SelectValue placeholder="Select Environment" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-[#0F172A] border-slate-700 text-white">
                                                <SelectItem value="production" className="text-base py-2">Production</SelectItem>
                                                <SelectItem value="staging" className="text-base py-2">Staging</SelectItem>
                                                <SelectItem value="development" className="text-base py-2">Development</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </form>
                            </CardContent>
                            <CardFooter className="px-8 pb-8 pt-4">
                                <Button
                                    type="submit"
                                    form="step1-form"
                                    className="w-full h-12 text-lg font-bold bg-cyan-400 hover:bg-cyan-300 text-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:shadow-[0_0_35px_rgba(34,211,238,0.5)] transition-all duration-300 rounded-lg"
                                >
                                    Connect your data platform <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </CardFooter>
                        </Card>
                    )}

                    {/* STEP 2: CONNECT PLATFORM */}
                    {currentStep === 2 && (
                        <div className="space-y-6">
                            {!selectedPlatform ? (
                                <Card className="border-slate-800 bg-[#0F172A] shadow-2xl">
                                    <CardHeader className="space-y-2 pb-6 px-8 pt-8">
                                        <CardTitle className="text-3xl font-bold text-white tracking-tight">Connect your data platform</CardTitle>
                                        <CardDescription className="text-lg text-slate-400 leading-relaxed">
                                            Select your primary data platform to begin automated discovery and monitoring
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="px-8 pb-8">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {DATA_PLATFORMS.map((platform) => {
                                                const Icon = platform.icon;
                                                return (
                                                    <div
                                                        key={platform.id}
                                                        className="relative group p-5 rounded-xl border border-slate-700 bg-[#020817]/40 hover:bg-[#020817]/80 hover:border-cyan-500/50 transition-all cursor-pointer flex items-center gap-4"
                                                        onClick={() => handlePlatformSelect(platform.id)}
                                                    >
                                                        <div className="h-12 w-12 rounded-lg bg-[#0F172A] flex items-center justify-center border border-slate-700 group-hover:border-cyan-500/50 transition-colors">
                                                            <Icon className="h-6 w-6 text-slate-300 group-hover:text-cyan-400" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="flex justify-between items-center mb-1">
                                                                <h3 className="font-semibold text-lg text-white group-hover:text-cyan-400 transition-colors">{platform.name}</h3>
                                                                {platform.popular && (
                                                                    <span className="text-[10px] uppercase font-bold bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded-full border border-cyan-500/20">
                                                                        Popular
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <p className="text-sm text-slate-400">{platform.type}</p>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </CardContent>
                                    <CardFooter className="bg-[#020817]/30 border-t border-slate-800 py-4 px-8 flex items-center gap-3 text-sm text-slate-400">
                                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                                        Secure Connection: IntelliStream uses read-only credentials and industry-standard encryption.
                                    </CardFooter>
                                </Card>
                            ) : (
                                // Platform Specific Form
                                <Card className="border-slate-800 bg-[#0F172A] shadow-2xl">
                                    <CardHeader className="space-y-1 pb-2 px-8 pt-6">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="w-fit mb-1 pl-0 text-slate-400 hover:text-cyan-400 hover:bg-transparent -ml-2 h-6"
                                            onClick={() => setSelectedPlatform("")}
                                        >
                                            <ArrowLeft className="mr-2 h-3.5 w-3.5" /> Back
                                        </Button>
                                        <CardTitle className="text-2xl font-bold text-white tracking-tight">Connect to {DATA_PLATFORMS.find(p => p.id === selectedPlatform)?.name}</CardTitle>
                                        <CardDescription className="text-base text-slate-400">
                                            Provide your workspace credentials to enable automated discovery
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4 px-8 pb-2">
                                        <div className="space-y-1.5">
                                            <Label className="text-base font-semibold text-white">Workspace URL</Label>
                                            <Input
                                                className="bg-[#020817]/60 border-slate-700 h-10 text-base text-white placeholder:text-slate-600 focus-visible:ring-cyan-500/50 focus-visible:border-cyan-500 px-3 rounded-lg"
                                                placeholder="https://your-workspace.cloud.provider.com"
                                                autoComplete="off"
                                                name="workspace_url_off"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label className="text-base font-semibold text-white">Access Token</Label>
                                            <Input
                                                className="bg-[#020817]/60 border-slate-700 h-10 text-base text-white placeholder:text-slate-600 focus-visible:ring-cyan-500/50 focus-visible:border-cyan-500 px-3 rounded-lg"
                                                type="password"
                                                placeholder="dapi................"
                                                autoComplete="new-password"
                                                name="access_token_off"
                                            />
                                            <p className="text-xs text-slate-500">Generate a personal access token from your settings</p>
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label className="text-base font-semibold text-white">Catalogs to Include</Label>
                                            <Select defaultValue="all">
                                                <SelectTrigger className="bg-[#020817]/60 border-slate-700 h-10 text-base text-white focus:ring-cyan-500/50 focus:border-cyan-500 px-3 rounded-lg">
                                                    <SelectValue placeholder="Select" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-[#0F172A] border-slate-700 text-white">
                                                    <SelectItem value="all">All Catalogs (Recommended)</SelectItem>
                                                    <SelectItem value="custom">Select Custom</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        {connectionStatus === "idle" || connectionStatus === "testing" || connectionStatus === "failed" ? (
                                            <div className="pt-1">
                                                <Button
                                                    variant="secondary"
                                                    className="w-full h-10 text-base font-semibold bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700"
                                                    onClick={handleTestConnection}
                                                    disabled={connectionStatus === "testing"}
                                                >
                                                    {connectionStatus === "testing" ? (
                                                        <>
                                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Testing...
                                                        </>
                                                    ) : (
                                                        "Test Connection"
                                                    )}
                                                </Button>
                                                {connectionStatus === "failed" && (
                                                    <p className="text-red-400 text-xs mt-1.5 text-center">Connection failed. Please check your credentials.</p>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="rounded-lg bg-green-500/10 border border-green-500/20 p-4 flex items-center justify-between animate-in fade-in slide-in-from-top-2">
                                                <div className="flex items-center gap-2">
                                                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                                                    <span className="text-green-500 font-medium">Connection successful</span>
                                                </div>
                                                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white" onClick={() => setConnectionStatus("idle")}>
                                                    Test Again
                                                </Button>
                                            </div>
                                        )}
                                    </CardContent>
                                    <CardFooter className="px-8 pb-8 pt-2">
                                        <Button
                                            className="w-full h-12 text-lg font-bold bg-cyan-400 hover:bg-cyan-300 text-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:shadow-[0_0_35px_rgba(34,211,238,0.5)] transition-all duration-300 rounded-lg"
                                            onClick={handleConnectAndDiscover}
                                            disabled={connectionStatus !== "success"}
                                        >
                                            Connect & Discover
                                        </Button>
                                    </CardFooter>
                                </Card>
                            )}
                        </div>
                    )}

                    {/* STEP 3: SETUP / DISCOVERY */}
                    {currentStep === 3 && (
                        <Card className="border-slate-800 bg-[#0F172A] shadow-2xl py-8 flex flex-col justify-center">
                            <CardContent className="flex flex-col items-center justify-center text-center space-y-6">
                                <div className="space-y-2">
                                    <h2 className="text-2xl font-bold text-white">Discovering your data</h2>
                                    <p className="text-base text-slate-400">IntelliStream is automatically analyzing your data environment</p>
                                </div>

                                {/* Status Steps */}
                                <div className="w-full max-w-sm space-y-2.5 text-left">
                                    <StatusItem
                                        label="Discovering catalogs"
                                        status={discoveryStatus === "connecting" ? "loading" : "complete"}
                                    />
                                    <StatusItem
                                        label="Identifying datasets"
                                        status={discoveryStatus === "connecting" ? "waiting" : (discoveryStatus === "discovering" ? "loading" : "complete")}
                                    />
                                    <StatusItem
                                        label="Mapping pipelines"
                                        status={discoveryStatus === "connecting" || discoveryStatus === "discovering" ? "waiting" : (discoveryStatus === "complete" ? "complete" : "waiting")}
                                    />
                                    <StatusItem
                                        label="Building catalog"
                                        status={discoveryStatus === "complete" ? "complete" : "waiting"}
                                    />
                                </div>

                                {/* Stats - Grid only appears when some progress is made */}
                                {(discoveryStatus === "discovering" || discoveryStatus === "complete") && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="grid grid-cols-3 gap-4 w-full max-w-xl mt-4"
                                    >
                                        <StatCard value={discoveryStatus === "complete" ? "142" : "26"} label="Datasets found" />
                                        <StatCard value={discoveryStatus === "complete" ? "8" : "0"} label="Pipelines detected" />
                                        <StatCard value={discoveryStatus === "complete" ? "3" : "0"} label="Issues identified" />
                                    </motion.div>
                                )}

                                {/* Completion Actions */}
                                {discoveryStatus === "complete" && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="flex gap-4 mt-6"
                                    >
                                        <Button variant="outline" size="sm" className="h-10 text-base border-slate-700 text-slate-300 hover:bg-[#020817] hover:text-white" onClick={handleAddAnotherSource}>
                                            <Plus className="mr-2 h-4 w-4" /> Add Another Source
                                        </Button>
                                        <Button size="sm" className="h-10 text-base font-bold bg-cyan-400 hover:bg-cyan-300 text-slate-950 shadow-[0_0_15px_rgba(34,211,238,0.4)] min-w-[160px]" onClick={handleFinish}>
                                            Go to Dashboard
                                        </Button>
                                    </motion.div>
                                )}
                            </CardContent>
                        </Card>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

// Helper Components for Step 3
const StatusItem = ({ label, status }: { label: string, status: "waiting" | "loading" | "complete" }) => {
    return (
        <div className="flex items-center gap-3">
            <div className="h-5 w-5 flex items-center justify-center">
                {status === "waiting" && <div className="h-1.5 w-1.5 rounded-full bg-slate-700" />}
                {status === "loading" && <Loader2 className="h-4 w-4 text-cyan-400 animate-spin" />}
                {status === "complete" && <CheckCircle2 className="h-5 w-5 text-green-500" />}
            </div>
            <span className={`text-base ${status === "waiting" ? "text-slate-600" : "text-slate-200"}`}>
                {label}
            </span>
        </div>
    )
}

const StatCard = ({ value, label }: { value: string, label: string }) => (
    <div className="rounded-lg border border-slate-700 bg-[#020817]/40 p-4 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-white mb-1">{value}</span>
        <span className="text-xs text-slate-400">{label}</span>
    </div>
)

export default Onboarding;
