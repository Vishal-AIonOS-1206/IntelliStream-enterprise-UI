import DashboardLayout from "@/components/DashboardLayout";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
    Activity,
    AlertCircle,
    CheckCircle2,
    Clock,
    PlayCircle,
    RotateCcw,
    Terminal,
    Wrench,
    Sparkles,
    TrendingUp,
    GitMerge,
    Shield,
    FileCheck
} from "lucide-react";

// Mock Data
const PIPELINES = [
    { id: "pipe_101", name: "etl_daily_revenue", status: "running", lastRun: "5 min ago", duration: "2m 34s", health: "Healthy" },
    { id: "pipe_102", name: "ml_feature_pipeline", status: "completed", lastRun: "1 hour ago", duration: "15m 12s", health: "Healthy" },
    { id: "pipe_103", name: "data_sync_customers", status: "running", lastRun: "2 min ago", duration: "45s", health: "Healthy" },
    { id: "pipe_104", name: "bi_aggregation_hourly", status: "failed", lastRun: "3 hours ago", duration: "4m 20s", health: "Critical" },
    { id: "pipe_105", name: "gdpr_compliance_check", status: "completed", lastRun: "Yesterday", duration: "1h 05m", health: "Healthy" },
];

const INCIDENTS = [
    { id: "INC-2024-001", title: "Schema Mismatch in Raw Zone", severity: "High", time: "2 hours ago", status: "Open" },
    { id: "INC-2024-002", title: "Latency Spike in Streaming Job", severity: "Medium", time: "5 hours ago", status: "Investigating" },
    { id: "INC-2024-003", title: "Null Values in Primary Key", severity: "Critical", time: "1 day ago", status: "Resolved" },
];

const AUTO_FIXES = [
    { id: "FIX-884", action: "Schema Evolution Applied", target: "stg_orders", result: "Success", time: "30 mins ago" },
    { id: "FIX-883", action: "Cluster Restarted", target: "Airflow Worker #3", result: "Success", time: "4 hours ago" },
    { id: "FIX-882", action: "Backfill Triggered", target: "fct_sales", result: "Running", time: "10 mins ago" },
];

const SLA_METRICS = [
    { name: "API Response Latency", value: 45, target: 100, unit: "ms", status: "Good" },
    { name: "Data Freshness (Bronze)", value: 5, target: 15, unit: "mins", status: "Good" },
    { name: "Data Freshness (Silver)", value: 48, target: 60, unit: "mins", status: "Good" },
    { name: "Data Freshness (Gold)", value: 130, target: 120, unit: "mins", status: "Warning" },
];

const COVERAGE_STATS = [
    { category: "Tables Documented", value: 85, total: 100 },
    { category: "Owners Assigned", value: 92, total: 100 },
    { category: "PII Tagged", value: 100, total: 100 },
    { category: "Lineage Mapped", value: 78, total: 100 },
];

const Monitoring = () => {
    return (
        <DashboardLayout>
            <div className="space-y-8 pb-10">
                <div className="flex justify-between items-end">
                    <div>
                        <h1 className="text-3xl font-bold text-white tracking-tight">Monitoring</h1>
                        <p className="text-slate-400 mt-2 text-lg">
                            Real-time operational monitoring and incident management
                        </p>
                    </div>
                    <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">
                        <RotateCcw className="mr-2 h-4 w-4" /> Refresh
                    </Button>
                </div>

                {/* KPI Cards */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <Card className="bg-slate-900 border-slate-800 hover:shadow-lg hover:shadow-cyan-900/10 transition-all">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <Activity className="h-5 w-5 text-slate-400" />
                            <span className="text-xs font-semibold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full">+12%</span>
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold text-white mb-1">247</div>
                            <p className="text-sm text-slate-400">Active Pipelines</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-slate-900 border-slate-800 hover:shadow-lg hover:shadow-amber-900/10 transition-all">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <AlertCircle className="h-5 w-5 text-slate-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold text-white mb-1">3</div>
                            <p className="text-sm text-slate-400">Open Incidents</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-slate-900 border-slate-800 hover:shadow-lg hover:shadow-purple-900/10 transition-all">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <Sparkles className="h-5 w-5 text-slate-400" />
                            <span className="text-xs font-semibold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full">+24%</span>
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold text-white mb-1">156</div>
                            <p className="text-sm text-slate-400">Auto-Fixes This Week</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-slate-900 border-slate-800 hover:shadow-lg hover:shadow-blue-900/10 transition-all">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <TrendingUp className="h-5 w-5 text-slate-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold text-emerald-500 mb-1">99.2%</div>
                            <p className="text-sm text-slate-400">SLA Compliance</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Tabs & Content */}
                <Tabs defaultValue="pipelines" className="space-y-6">
                    <TabsList className="bg-transparent p-0 gap-2 flex-wrap">
                        <TabsTrigger value="pipelines" className="rounded-full px-6 py-2 border border-slate-800 bg-slate-900/50 data-[state=active]:bg-white data-[state=active]:text-slate-950 text-slate-400 font-medium">Pipelines</TabsTrigger>
                        <TabsTrigger value="incidents" className="rounded-full px-6 py-2 border border-slate-800 bg-slate-900/50 data-[state=active]:bg-white data-[state=active]:text-slate-950 text-slate-400 font-medium">Incidents</TabsTrigger>
                        <TabsTrigger value="autofixes" className="rounded-full px-6 py-2 border border-slate-800 bg-slate-900/50 data-[state=active]:bg-white data-[state=active]:text-slate-950 text-slate-400 font-medium">Auto-Fixes</TabsTrigger>
                        <TabsTrigger value="sla" className="rounded-full px-6 py-2 border border-slate-800 bg-slate-900/50 data-[state=active]:bg-white data-[state=active]:text-slate-950 text-slate-400 font-medium">SLA & Latency</TabsTrigger>
                        <TabsTrigger value="coverage" className="rounded-full px-6 py-2 border border-slate-800 bg-slate-900/50 data-[state=active]:bg-white data-[state=active]:text-slate-950 text-slate-400 font-medium">Catalog Coverage</TabsTrigger>
                    </TabsList>

                    {/* PIPELINES TAB */}
                    <TabsContent value="pipelines" className="mt-0">
                        <Card className="bg-slate-900 border-slate-800 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-slate-950 text-slate-400 font-medium border-b border-slate-800">
                                        <tr>
                                            <th className="px-6 py-4">Pipeline Name</th>
                                            <th className="px-6 py-4">Status</th>
                                            <th className="px-6 py-4">Last Run</th>
                                            <th className="px-6 py-4">Duration</th>
                                            <th className="px-6 py-4">Health</th>
                                            <th className="px-6 py-4 text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-800">
                                        {PIPELINES.map((pipeline) => (
                                            <tr key={pipeline.id} className="hover:bg-slate-800/50 transition-colors group">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <GitMerge className="h-5 w-5 text-slate-500" />
                                                        <span className="font-semibold text-slate-200">{pipeline.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {pipeline.status === 'running' && (
                                                        <span className="inline-flex items-center rounded-full bg-slate-950 px-3 py-1 text-xs font-medium text-white ring-1 ring-inset ring-slate-700">
                                                            running
                                                        </span>
                                                    )}
                                                    {pipeline.status === 'completed' && (
                                                        <span className="inline-flex items-center rounded-full bg-slate-900 px-3 py-1 text-xs font-medium text-slate-400 ring-1 ring-inset ring-slate-700">
                                                            completed
                                                        </span>
                                                    )}
                                                    {pipeline.status === 'failed' && (
                                                        <span className="inline-flex items-center rounded-full bg-red-950/30 px-3 py-1 text-xs font-medium text-red-500 ring-1 ring-inset ring-red-500/20">
                                                            failed
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-slate-400">{pipeline.lastRun}</td>
                                                <td className="px-6 py-4 text-slate-400 font-mono text-xs">{pipeline.duration}</td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <div className={`h-2 w-2 rounded-full ${pipeline.health === 'Healthy' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                                                        <span className={`${pipeline.health === 'Healthy' ? 'text-emerald-500' : 'text-red-500'}`}>{pipeline.health}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <PlayCircle className="h-4 w-4" />
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    </TabsContent>

                    {/* INCIDENTS TAB */}
                    <TabsContent value="incidents" className="space-y-4">
                        <div className="grid gap-4">
                            {INCIDENTS.map((incident) => (
                                <Card key={incident.id} className="bg-slate-900 border-slate-800 hover:border-amber-500/30 transition-all cursor-pointer">
                                    <CardContent className="p-6 flex items-center justify-between">
                                        <div className="flex gap-4 items-start">
                                            <div className="mt-1">
                                                <AlertCircle className="h-5 w-5 text-amber-500" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-semibold text-white">{incident.title}</h3>
                                                <p className="text-slate-400 text-sm">{incident.id} • {incident.time}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Badge variant="secondary" className="bg-slate-800 text-slate-300">{incident.status}</Badge>
                                            <Badge className={`${incident.severity === 'Critical' ? 'bg-red-500' : incident.severity === 'High' ? 'bg-orange-500' : 'bg-yellow-500'} text-white border-0`}>
                                                {incident.severity}
                                            </Badge>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    {/* AUTO-FIXES TAB */}
                    <TabsContent value="autofixes" className="mt-0">
                        <Card className="bg-slate-900 border-slate-800">
                            <CardContent className="p-0">
                                <div className="space-y-0">
                                    {AUTO_FIXES.map((fix, i) => (
                                        <div key={i} className={`flex items-center p-6 border-b border-slate-800 last:border-0 hover:bg-slate-800/20`}>
                                            <div className="h-10 w-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 mr-4">
                                                <Sparkles className="h-5 w-5 text-emerald-500" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between mb-1">
                                                    <p className="font-semibold text-slate-200">{fix.action}</p>
                                                    <span className="text-xs text-slate-500">{fix.time}</span>
                                                </div>
                                                <p className="text-sm text-slate-400 flex items-center gap-2">
                                                    Target: <Badge variant="outline" className="text-cyan-400 border-cyan-400/20 bg-cyan-400/5 font-mono text-[10px]">{fix.target}</Badge>
                                                    <span className="text-slate-600">•</span>
                                                    Result: <span className="text-emerald-500">{fix.result}</span>
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* SLA & LATENCY TAB */}
                    <TabsContent value="sla" className="mt-0">
                        <div className="grid gap-6 md:grid-cols-2">
                            {SLA_METRICS.map((metric, i) => (
                                <Card key={i} className="bg-slate-900 border-slate-800">
                                    <CardHeader className="pb-2">
                                        <div className="flex justify-between items-center">
                                            <CardTitle className="text-base text-white font-medium">{metric.name}</CardTitle>
                                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${metric.status === 'Good' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                                                {metric.status}
                                            </span>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-end gap-2 mb-2">
                                            <span className="text-3xl font-bold text-white">{metric.value}</span>
                                            <span className="text-sm text-slate-500 mb-1">{metric.unit}</span>
                                            <span className="text-xs text-slate-500 mb-1 ml-auto">Target: &lt;{metric.target} {metric.unit}</span>
                                        </div>
                                        <Progress
                                            value={(metric.target / Math.max(metric.value, metric.target)) * 100}
                                            className={`h-2 ${metric.status === 'Good' ? 'bg-slate-800' : 'bg-slate-800'}`}
                                            indicatorClassName={metric.status === 'Good' ? 'bg-emerald-500' : 'bg-amber-500'}
                                        />
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    {/* CATALOG COVERAGE TAB */}
                    <TabsContent value="coverage" className="mt-0">
                        <Card className="bg-slate-900 border-slate-800">
                            <CardHeader>
                                <CardTitle className="text-white">Documentation Coverage</CardTitle>
                                <CardDescription className="text-slate-400">Completeness of metadata across your data estate.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                                    {COVERAGE_STATS.map((stat, i) => (
                                        <div key={i} className="flex flex-col items-center text-center p-4 bg-slate-950 rounded-lg border border-slate-800">
                                            <div className="relative h-24 w-24 mb-4 flex items-center justify-center">
                                                <svg className="h-full w-full -rotate-90 text-slate-800" viewBox="0 0 36 36">
                                                    {/* Background Circle */}
                                                    <path className="stroke-current" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                                    {/* Progress Circle */}
                                                    <path
                                                        className="stroke-cyan-500"
                                                        strokeDasharray={`${stat.value}, 100`}
                                                        strokeWidth="3"
                                                        fill="none"
                                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                    />
                                                </svg>
                                                <div className="absolute flex flex-col items-center">
                                                    <span className="text-xl font-bold text-white">{stat.value}%</span>
                                                </div>
                                            </div>
                                            <h4 className="font-medium text-slate-200">{stat.category}</h4>
                                            <p className="text-xs text-slate-500 mt-1">{stat.value} of {stat.total}</p>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </DashboardLayout>
    );
};

export default Monitoring;
