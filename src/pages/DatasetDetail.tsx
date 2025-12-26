import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import {
    ArrowLeft,
    CheckCircle2,
    Database,
    AlertTriangle,
    FileText,
    Activity,
    GitBranch,
    Code,
    History,
    LayoutGrid,
    Table as TableIcon,
    ShieldCheck,
    Play,
    Terminal,
    Clock,
    User,
    Check,
    ChevronRight,
    Server,
    Layers,
    ArrowRightCircle,
    Copy,
    Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";

// Mock Data
const DATASET_DETAILS = {
    name: "bronze_users",
    description: "Raw user data ingested from the production transactional database using the Daily Ingestion Pipeline. Contains PII information such as emails and IP addresses. This dataset serves as the foundational layer for all customer-360 analytics and marketing segmentation models.",
    owner: "Data Engineering Team",
    domain: "Customer Experience",
    tier: "Bronze",
    sla: "99.9% Availability",
    platform: "Snowflake",
    trustScore: 94,
    columnCount: 24,
    rowCount: "1,245,390",
    volume: "450.5 MB",
    anomalies: 1,
    lastUpdated: "15 mins ago",
    healthStatus: "Healthy",
    tags: ["PII", "users", "marketing", "bronze", "gdpr-scope"],
    usedBy: [
        { name: "Executive Cockpit", type: "Dashboard" },
        { name: "Customer Segmentation", type: "ML Model" },
        { name: "Q3 Revenue Report", type: "Report" }
    ]
};

const COLUMNS = [
    { name: "user_id", type: "VARCHAR(36)", primaryKey: true, nullable: false, description: "Unique identifier for the user (UUID v4)", distinctPercentage: 100 },
    { name: "email", type: "VARCHAR(255)", primaryKey: false, nullable: false, description: "User's email address. Encrypted at rest.", distinctPercentage: 99.8 },
    { name: "created_at", type: "TIMESTAMP_NTZ", primaryKey: false, nullable: false, description: "UTC timestamp of account creation", distinctPercentage: 95 },
    { name: "account_status", type: "VARCHAR(20)", primaryKey: false, nullable: true, description: "active | suspended | deleted", distinctPercentage: 0.01 },
    { name: "last_login_dt", type: "TIMESTAMP_NTZ", primaryKey: false, nullable: true, description: "Last successful authentication", distinctPercentage: 85 },
    { name: "failed_login_count", type: "INTEGER", primaryKey: false, nullable: true, description: "Count of consecutive failed attempts", distinctPercentage: 0.5 },
    { name: "signup_source", type: "VARCHAR(50)", primaryKey: false, nullable: true, description: "Marketing channel attribution", distinctPercentage: 0.05 },
    { name: "ip_address", type: "VARCHAR(45)", primaryKey: false, nullable: true, description: "Registration IP (masked)", distinctPercentage: 60 },
];

const PIPELINE_RUNS = [
    { id: "run_8821", name: "Ingest Users Daily", type: "Scheduled", rows: "+12,405", status: "Succeeded", duration: "4m 20s", time: "15 mins ago", trigger: "Airflow" },
    { id: "run_8820", name: "Ingest Users Daily", type: "Scheduled", rows: "+11,200", status: "Succeeded", duration: "4m 15s", time: "1 day ago", trigger: "Airflow" },
    { id: "run_8819", name: "Ingest Users Daily", type: "Retried", rows: "0", status: "Failed", duration: "1m 02s", time: "2 days ago", trigger: "Airflow", error: "Connection Timeout" },
    { id: "run_8818", name: "Ingest Users Daily", type: "Scheduled", rows: "+10,850", status: "Succeeded", duration: "4m 10s", time: "2 days ago", trigger: "Airflow" },
    { id: "run_man_01", name: "Backfill User Data", type: "Manual", rows: "+50,000", status: "Succeeded", duration: "15m 30s", time: "3 days ago", trigger: "Vishal.Khode" },
];

const CATALOG_PROPERTIES = [
    {
        category: "Storage", items: [
            { key: "Location", value: "s3://prod-data-lake/bronze/users/" },
            { key: "File Format", value: "Parquet (Snappy Compressed)" },
            { key: "Partition Strategy", value: "Month / Day (based on created_at)" },
            { key: "Total Size", value: "450.5 MB" }
        ]
    },
    {
        category: "Governance", items: [
            { key: "Classification", value: "Confidential / PII" },
            { key: "Retention Policy", value: "7 Years (Legal Hold)" },
            { key: "Access Group", value: "grp_de_production_read" },
            { key: "Compliance", value: "GDPR, CCPA In-Scope" }
        ]
    },
    {
        category: "Processing", items: [
            { key: "Update Frequency", value: "Daily (02:00 UTC)" },
            { key: "Method", value: "Incremental Append" },
            { key: "Cluster Config", value: "Medium (2 Workers)" }
        ]
    }
];

const ANOMALIES = [
    { id: "ANOM-001", type: "Volume Drift", description: "Row count spike (+45%) detected.", severity: "Warning", date: "Today, 10:00 AM", status: "Investigating" },
    { id: "ANOM-002", type: "Schema Drift", description: "New column 'device_id' found but not in schema registry.", severity: "Info", date: "Yesterday, 02:15 AM", status: "Auto-Resolved" },
    { id: "ANOM-003", type: "Distribution Shift", description: "Null rate for 'signup_source' increased from 2% to 15%.", severity: "Critical", date: "3 Days ago", status: "Resolved" }
];

const LOGS = [
    { user: "Vishal Khode", action: "Approved description update", time: "2 hours ago" },
    { user: "System", action: "Anomaly detected: Volume Drift", time: "Today, 10:00 AM" },
    { user: "System", action: "Pipeline 'Ingest Users Daily' succeeded", time: "15 mins ago" },
    { user: "Sarah Connor", action: "Updated PII tags for 'email', 'ip_address'", time: "Yesterday" },
];

const DatasetDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("overview");

    return (
        <DashboardLayout>
            <div className="space-y-6 pb-20">
                {/* Header Section */}
                <div className="space-y-4">
                    <Button
                        variant="ghost"
                        className="pl-0 text-slate-400 hover:text-white"
                        onClick={() => navigate("/dashboard/assets")}
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Datasets
                    </Button>

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="space-y-1">
                            <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                                {DATASET_DETAILS.name}
                                <Badge variant="outline" className="border-amber-500/20 text-amber-500 bg-amber-500/10">
                                    {DATASET_DETAILS.tier}
                                </Badge>
                            </h1>
                            <p className="text-slate-400 max-w-2xl">
                                {DATASET_DETAILS.description}
                            </p>
                        </div>
                        <Button
                            className="bg-slate-900 border-slate-700 hover:bg-slate-800 text-emerald-500 border hover:border-emerald-500/50"
                            variant="outline"
                        >
                            <CheckCircle2 className="mr-2 h-4 w-4" /> Approve Description
                        </Button>
                    </div>
                </div>

                {/* KPI Cards Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card className="bg-slate-900 border-slate-800">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-slate-400">Trust Score</CardTitle>
                            <ShieldCheck className="h-4 w-4 text-emerald-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-white">{DATASET_DETAILS.trustScore}</div>
                            <Progress value={DATASET_DETAILS.trustScore} className="h-1 mt-2 bg-slate-800" indicatorClassName="bg-emerald-500" />
                        </CardContent>
                    </Card>
                    <Card className="bg-slate-900 border-slate-800">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-slate-400">Column Count</CardTitle>
                            <LayoutGrid className="h-4 w-4 text-slate-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-white">{DATASET_DETAILS.columnCount}</div>
                            <p className="text-xs text-slate-500 mt-1">8 PII Columns</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-slate-900 border-slate-800">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-slate-400">Data Volume</CardTitle>
                            <Database className="h-4 w-4 text-slate-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-white">{DATASET_DETAILS.volume}</div>
                            <p className="text-xs text-slate-500">{DATASET_DETAILS.rowCount} rows</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-slate-900 border-slate-800 hover:border-amber-500/50 transition-colors">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-slate-400">Anomalies</CardTitle>
                            <AlertTriangle className="h-4 w-4 text-amber-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-white">{DATASET_DETAILS.anomalies}</div>
                            <p className="text-xs text-amber-500 font-medium">Requires attention</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Tabs Navigation */}
                <Tabs defaultValue="overview" className="space-y-6" onValueChange={setActiveTab}>
                    <ScrollArea className="w-full border-b border-slate-800 pb-px">
                        <TabsList className="bg-transparent h-auto p-0 gap-6">
                            {[
                                { id: "overview", label: "Overview", icon: LayoutGrid },
                                { id: "pipelines", label: "Pipeline Runs", icon: Activity },
                                { id: "lineage", label: "Lineage", icon: GitBranch },
                                { id: "catalog", label: "Dataset Catalog", icon: Database },
                                { id: "columns", label: "Column Catalog", icon: TableIcon },
                                { id: "codegen", label: "CodeGen", icon: Code },
                                { id: "anomalies", label: "Anomalies & Drift", icon: AlertTriangle },
                                { id: "activity", label: "Activity Log", icon: History },
                            ].map((tab) => {
                                const Icon = tab.icon;
                                return (
                                    <TabsTrigger
                                        key={tab.id}
                                        value={tab.id}
                                        className="bg-transparent border-b-2 border-transparent data-[state=active]:border-cyan-500 data-[state=active]:bg-transparent data-[state=active]:text-cyan-400 text-slate-400 hover:text-slate-200 rounded-none px-2 py-3 flex items-center gap-2 transition-all"
                                    >
                                        <Icon className="h-4 w-4" />
                                        {tab.label}
                                    </TabsTrigger>
                                );
                            })}
                        </TabsList>
                    </ScrollArea>

                    {/* OVERVIEW TAB */}
                    <TabsContent value="overview" className="mt-0 space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2 space-y-6">
                                {/* Main Details Card */}
                                <Card className="bg-slate-900 border-slate-800 rounded-xl overflow-hidden">
                                    <CardHeader className="bg-slate-950/50 border-b border-slate-800 pb-4">
                                        <CardTitle className="text-white text-lg font-bold">About this Dataset</CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-6 space-y-8">
                                        {/* Description Section */}
                                        <div className="space-y-3">
                                            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wide">Description</h3>
                                            <p className="text-slate-200 text-base leading-relaxed bg-slate-950/50 p-4 rounded-lg border border-slate-800/50">
                                                {DATASET_DETAILS.description}
                                            </p>
                                        </div>

                                        <Separator className="bg-slate-800/50" />

                                        {/* Metadata Grid */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                                            <div className="space-y-2">
                                                <span className="text-sm font-medium text-slate-500 uppercase tracking-wide">Owner</span>
                                                <div className="flex items-center gap-3 text-slate-200 group cursor-pointer hover:text-white transition-colors">
                                                    <div className="h-8 w-8 rounded-full bg-cyan-950 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-900 group-hover:scale-105 transition-all">
                                                        <User className="h-4 w-4" />
                                                    </div>
                                                    <span className="font-semibold">{DATASET_DETAILS.owner}</span>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <span className="text-sm font-medium text-slate-500 uppercase tracking-wide">Domain</span>
                                                <div className="flex items-center gap-2 text-slate-200 font-medium">
                                                    <ShieldCheck className="h-4 w-4 text-cyan-500" /> {DATASET_DETAILS.domain}
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <span className="text-sm font-medium text-slate-500 uppercase tracking-wide">Platform</span>
                                                <div className="flex items-center gap-2 text-white font-semibold text-lg">
                                                    <Server className="h-4 w-4 text-slate-400" />
                                                    {DATASET_DETAILS.platform}
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <span className="text-sm font-medium text-slate-500 uppercase tracking-wide">SLA Status</span>
                                                <div className="flex items-center gap-2 text-emerald-400 font-medium">
                                                    <CheckCircle2 className="h-4 w-4" /> {DATASET_DETAILS.sla}
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <span className="text-sm font-medium text-slate-500 uppercase tracking-wide">Last Updated</span>
                                                <p className="text-slate-200 text-lg font-mono">{DATASET_DETAILS.lastUpdated}</p>
                                            </div>
                                            <div className="space-y-2">
                                                <span className="text-sm font-medium text-slate-500 uppercase tracking-wide">Tags</span>
                                                <div className="flex gap-2 flex-wrap">
                                                    {DATASET_DETAILS.tags.map(tag => (
                                                        <Badge key={tag} variant="secondary" className="bg-slate-800 text-slate-300 hover:bg-slate-700 px-3 py-1 capitalize">{tag}</Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="space-y-6">
                                {/* Quick Actions */}
                                <Card className="bg-slate-900 border-slate-800 rounded-xl overflow-hidden">
                                    <CardHeader className="bg-slate-950/50 border-b border-slate-800 pb-4">
                                        <CardTitle className="text-white text-lg font-bold">Quick Actions</CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-6 space-y-4">
                                        <Button className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800 h-12 text-base" variant="ghost">
                                            <Terminal className="mr-3 h-5 w-5 text-cyan-500" />
                                            Query in Workbook
                                            <ChevronRight className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                        <Button className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800 h-12 text-base" variant="ghost">
                                            <FileText className="mr-3 h-5 w-5 text-cyan-500" />
                                            View Documentation
                                            <ChevronRight className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                        <Button className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800 h-12 text-base" variant="ghost">
                                            <ShareLineageIcon className="mr-3 h-5 w-5 text-cyan-500" />
                                            Explore Lineage
                                            <ChevronRight className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </CardContent>
                                </Card>

                                {/* Downstream Usage */}
                                <Card className="bg-slate-900 border-slate-800 rounded-xl overflow-hidden">
                                    <CardHeader className="bg-slate-950/50 border-b border-slate-800 pb-4">
                                        <div className="flex justify-between items-center">
                                            <CardTitle className="text-white text-lg font-bold">Downstream Impact</CardTitle>
                                            <Badge variant="outline" className="border-cyan-500/20 text-cyan-500 bg-cyan-500/10">3 Products</Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-6">
                                        <div className="space-y-3">
                                            {DATASET_DETAILS.usedBy.map((item, i) => (
                                                <div key={i} className="flex items-center justify-between p-3 bg-slate-950/50 rounded-lg border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer group">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${item.type === 'Dashboard' ? 'bg-purple-500/10 text-purple-400' : 'bg-blue-500/10 text-blue-400'}`}>
                                                            <Activity className="h-4 w-4 group-hover:scale-110 transition-transform" />
                                                        </div>
                                                        <span className="text-slate-200 font-medium text-sm">{item.name}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <Button variant="link" className="text-cyan-500 w-full mt-2 h-auto p-0">View All Dependencies</Button>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </TabsContent>

                    {/* COLUMNS TAB */}
                    <TabsContent value="columns" className="mt-0">
                        <Card className="bg-slate-900 border-slate-800">
                            <CardHeader className="bg-slate-950/50 border-b border-slate-800 pb-4 flex flex-row items-center justify-between">
                                <CardTitle className="text-white text-lg font-bold">Column Catalog</CardTitle>
                                <div className="flex gap-2">
                                    <Badge variant="outline" className="text-slate-400 border-slate-700">8 Columns</Badge>
                                    <Badge variant="outline" className="text-amber-500 border-amber-500/20 bg-amber-500/10">3 PII Detected</Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                <Table>
                                    <TableHeader className="bg-slate-950">
                                        <TableRow className="border-slate-800 hover:bg-slate-950">
                                            <TableHead className="text-slate-400">Column Name</TableHead>
                                            <TableHead className="text-slate-400 w-[150px]">Data Type</TableHead>
                                            <TableHead className="text-slate-400">Attributes</TableHead>
                                            <TableHead className="text-slate-400">Description</TableHead>
                                            <TableHead className="text-slate-400 text-right">Distinct %</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {COLUMNS.map((col) => (
                                            <TableRow key={col.name} className="border-slate-800 hover:bg-slate-800/50">
                                                <TableCell className="font-medium text-white font-mono text-sm">
                                                    {col.name}
                                                </TableCell>
                                                <TableCell className="text-slate-400 font-mono text-xs">{col.type}</TableCell>
                                                <TableCell>
                                                    <div className="flex gap-2">
                                                        {col.primaryKey && <Badge variant="outline" className="border-emerald-500/20 text-emerald-500 bg-emerald-500/10 text-[10px] uppercase font-bold">PK</Badge>}
                                                        {!col.nullable && <Badge variant="outline" className="border-slate-700 text-slate-400 text-[10px] uppercase">Not Null</Badge>}
                                                        {col.name === 'email' && <Badge variant="secondary" className="bg-amber-500/20 text-amber-500 hover:bg-amber-500/30 text-[10px] uppercase">PII</Badge>}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-slate-300 text-sm max-w-md truncate">{col.description}</TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <span className="text-xs text-slate-400">{col.distinctPercentage}%</span>
                                                        <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                                            <div className="h-full bg-cyan-500" style={{ width: `${col.distinctPercentage}%` }} />
                                                        </div>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* PIPELINE RUNS TAB */}
                    <TabsContent value="pipelines" className="mt-0">
                        <Card className="bg-slate-900 border-slate-800">
                            <CardHeader className="bg-slate-950/50 border-b border-slate-800 pb-4">
                                <CardTitle className="text-white text-lg font-bold">Transformation History</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <Table>
                                    <TableHeader className="bg-slate-950">
                                        <TableRow className="border-slate-800 hover:bg-slate-950">
                                            <TableHead className="text-slate-400">Run ID</TableHead>
                                            <TableHead className="text-slate-400">Status</TableHead>
                                            <TableHead className="text-slate-400">Type</TableHead>
                                            <TableHead className="text-slate-400">Rows Affected</TableHead>
                                            <TableHead className="text-slate-400">Duration</TableHead>
                                            <TableHead className="text-slate-400">Triggered By</TableHead>
                                            <TableHead className="text-slate-400 text-right">Executed</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {PIPELINE_RUNS.map((run) => (
                                            <TableRow key={run.id} className="border-slate-800 hover:bg-slate-800/50">
                                                <TableCell>
                                                    <div className="flex flex-col">
                                                        <span className="font-medium text-cyan-400 font-mono text-xs">{run.id}</span>
                                                        <span className="text-xs text-slate-500">{run.name}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        {run.status === 'Succeeded' ? (
                                                            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                                        ) : (
                                                            <AlertTriangle className="h-4 w-4 text-red-500" />
                                                        )}
                                                        <span className={run.status === 'Succeeded' ? 'text-emerald-500' : 'text-red-500'}>{run.status}</span>
                                                    </div>
                                                    {run.error && <span className="text-xs text-red-400 block mt-1">{run.error}</span>}
                                                </TableCell>
                                                <TableCell className="text-slate-300 text-sm">{run.type}</TableCell>
                                                <TableCell className="text-slate-300 font-mono text-sm">{run.rows}</TableCell>
                                                <TableCell className="text-slate-400 text-sm">{run.duration}</TableCell>
                                                <TableCell className="text-slate-400 text-sm">
                                                    <Badge variant="outline" className="border-slate-700 text-slate-400 font-normal">{run.trigger}</Badge>
                                                </TableCell>
                                                <TableCell className="text-slate-400 text-right text-sm">{run.time}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* LINEAGE TAB - VISUAL */}
                    <TabsContent value="lineage" className="mt-0">
                        <Card className="bg-slate-900 border-slate-800 overflow-hidden">
                            <CardHeader className="bg-slate-950/50 border-b border-slate-800 pb-4">
                                <CardTitle className="text-white text-lg font-bold">Data Lineage & Impact Analysis</CardTitle>
                            </CardHeader>
                            <CardContent className="p-12 relative min-h-[500px] flex items-center justify-center bg-slate-950/30">
                                {/* Simple Flex Visualization */}
                                <div className="flex items-center gap-8 relative z-10 w-full justify-center">
                                    {/* Node 1: Source */}
                                    <div className="flex flex-col items-center gap-4 group">
                                        <div className="h-24 w-40 bg-slate-900 border border-slate-700 rounded-lg p-4 flex flex-col justify-between shadow-lg group-hover:border-cyan-500/50 transition-all">
                                            <div className="flex items-start justify-between">
                                                <Database className="h-5 w-5 text-purple-400" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-500 uppercase font-bold">Source</p>
                                                <p className="text-sm font-semibold text-white">Postgres DB</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Arrow */}
                                    <ArrowRightCircle className="h-6 w-6 text-slate-600" />

                                    {/* Node 2: THIS DATASET */}
                                    <div className="flex flex-col items-center gap-4 relative">
                                        <div className="absolute -top-10 text-cyan-500 font-bold text-sm animate-bounce">Current Asset</div>
                                        <div className="h-28 w-48 bg-slate-900 border-2 border-cyan-500 rounded-lg p-4 flex flex-col justify-between shadow-[0_0_30px_rgba(6,182,212,0.15)] ring-4 ring-cyan-500/10">
                                            <div className="flex items-start justify-between">
                                                <TableIcon className="h-6 w-6 text-cyan-400" />
                                                <Badge className="bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/20 text-[10px]">Bronze</Badge>
                                            </div>
                                            <div>
                                                <p className="text-xs text-cyan-500/70 uppercase font-bold">Table</p>
                                                <p className="text-lg font-bold text-white">bronze_users</p>
                                                <p className="text-xs text-slate-400 mt-1">1.2M Rows</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Arrow */}
                                    <ArrowRightCircle className="h-6 w-6 text-slate-600" />

                                    {/* Node 3: Transformation */}
                                    <div className="flex flex-col items-center gap-4 group opacity-70 hover:opacity-100 transition-opacity">
                                        <div className="h-20 w-36 bg-slate-900 border-dashed border border-slate-600 rounded-lg p-3 flex flex-col justify-center items-center shadow-lg">
                                            <Layers className="h-6 w-6 text-amber-500 mb-2" />
                                            <p className="text-xs font-semibold text-slate-300">dbt Transformation</p>
                                            <p className="text-[10px] text-slate-500">Clean & Dedupe</p>
                                        </div>
                                    </div>

                                    {/* Arrow */}
                                    <ArrowRightCircle className="h-6 w-6 text-slate-600" />

                                    {/* Node 4: Downstream */}
                                    <div className="flex flex-col items-center gap-4 group">
                                        <div className="h-24 w-40 bg-slate-900 border border-slate-700 rounded-lg p-4 flex flex-col justify-between shadow-lg group-hover:border-cyan-500/50 transition-all">
                                            <div className="flex items-start justify-between">
                                                <TableIcon className="h-5 w-5 text-slate-400" />
                                                <Badge variant="outline" className="border-slate-700 text-slate-500">Silver</Badge>
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-500 uppercase font-bold">Table</p>
                                                <p className="text-sm font-semibold text-white">silver_dim_users</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* DATASET CATALOG TAB */}
                    <TabsContent value="catalog" className="mt-0">
                        <Card className="bg-slate-900 border-slate-800">
                            <CardHeader className="bg-slate-950/50 border-b border-slate-800 pb-4">
                                <CardTitle className="text-white text-lg font-bold">Technical Metadata</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {CATALOG_PROPERTIES.map((section) => (
                                        <div key={section.category} className="space-y-4">
                                            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest border-b border-slate-800 pb-2 mb-4">{section.category}</h3>
                                            <ul className="space-y-4">
                                                {section.items.map((item) => (
                                                    <li key={item.key} className="group">
                                                        <span className="text-sm text-slate-400 block mb-1 group-hover:text-cyan-400 transition-colors">{item.key}</span>
                                                        <span className="text-base text-slate-200 font-medium break-all">{item.value}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* CODEGEN TAB */}
                    <TabsContent value="codegen" className="mt-0">
                        <Card className="bg-slate-900 border-slate-800">
                            <CardHeader className="bg-slate-950/50 border-b border-slate-800 pb-4">
                                <CardTitle className="text-white text-lg font-bold">Access Snippets</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-8 p-6">
                                <CodeBlock
                                    label="SQL (Snowflake)"
                                    lang="sql"
                                    code={`-- Select latest 100 users created in the last 7 days
SELECT 
    user_id, 
    email, 
    created_at 
FROM 
    PROD_DB.SALES.BRONZE_USERS 
WHERE 
    created_at > DATEADD(day, -7, CURRENT_DATE()) 
    AND account_status = 'active'
LIMIT 100;`}
                                />

                                <CodeBlock
                                    label="Python (Pandas)"
                                    lang="python"
                                    code={`import pandas as pd
from sqlalchemy import create_engine

# Establish connection
engine = create_engine(os.getenv("SNOWFLAKE_URL"))

# Query execution
query = """
SELECT * 
FROM PROD_DB.SALES.BRONZE_USERS 
WHERE account_status != 'deleted' 
LIMIT 5000
"""

df_users = pd.read_sql(query, engine)
print(f"Loaded {len(df_users)} records")`}
                                />

                                <CodeBlock
                                    label="Spark (PySpark)"
                                    lang="python"
                                    code={`# Load user data from Bronze layer
df_bronze = spark.read \\
    .format("snowflake") \\
    .option("dbtable", "PROD_DB.SALES.BRONZE_USERS") \\
    .option("sfWarehouse", "COMPUTE_WH") \\
    .load()

# Basic transformation
df_clean = df_bronze.filter(col("account_status").isNotNull())
df_clean.show(5)`}
                                />
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* ANOMALIES TAB */}
                    <TabsContent value="anomalies" className="mt-0">
                        <Card className="bg-slate-900 border-slate-800">
                            <CardHeader className="bg-slate-950/50 border-b border-slate-800 pb-4">
                                <div className="flex justify-between items-center">
                                    <CardTitle className="text-white text-lg font-bold">Data Quality & Drift Detection</CardTitle>
                                    <Button variant="outline" size="sm" className="border-slate-700 text-slate-300">Run Quality Check</Button>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="grid gap-4">
                                    {ANOMALIES.map((anom) => (
                                        <div key={anom.id} className={`flex flex-col md:flex-row md:items-center justify-between p-5 rounded-xl border ${anom.severity === 'Critical' ? 'bg-red-950/10 border-red-500/20' :
                                            anom.severity === 'Warning' ? 'bg-amber-950/10 border-amber-500/20' :
                                                'bg-blue-950/10 border-blue-500/20'
                                            }`}>
                                            <div className="flex gap-4">
                                                <div className={`p-3 rounded-lg h-fit ${anom.severity === 'Critical' ? 'bg-red-500/10' :
                                                    anom.severity === 'Warning' ? 'bg-amber-500/10' :
                                                        'bg-blue-500/10'
                                                    }`}>
                                                    <AlertTriangle className={`h-6 w-6 ${anom.severity === 'Critical' ? 'text-red-500' :
                                                        anom.severity === 'Warning' ? 'text-amber-500' :
                                                            'text-blue-500'
                                                        }`} />
                                                </div>
                                                <div className="space-y-1">
                                                    <h4 className="font-bold text-white text-lg">{anom.type}</h4>
                                                    <p className="text-slate-300">{anom.description}</p>
                                                    <div className="flex items-center gap-3 mt-2">
                                                        <Badge className={`${anom.severity === 'Critical' ? 'bg-red-500' :
                                                            anom.severity === 'Warning' ? 'bg-amber-500' :
                                                                'bg-blue-500'
                                                            } border-0`}>{anom.severity}</Badge>
                                                        <span className="text-xs text-slate-500">{anom.date}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-4 md:mt-0 md:text-right">
                                                <Badge variant="outline" className="border-slate-700 text-slate-400 mb-2 block w-fit md:ml-auto">{anom.status}</Badge>
                                                <Button size="sm" className="bg-slate-800 hover:bg-slate-700 text-white w-full md:w-auto">View Root Cause</Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* ACTIVITY TAB */}
                    <TabsContent value="activity" className="mt-0">
                        <Card className="bg-slate-900 border-slate-800">
                            <CardHeader className="bg-slate-950/50 border-b border-slate-800 pb-4">
                                <CardTitle className="text-white text-lg font-bold">Audit Trail</CardTitle>
                            </CardHeader>
                            <CardContent className="p-8">
                                <div className="relative pl-8 border-l border-slate-800 space-y-10">
                                    {LOGS.map((Log, i) => (
                                        <div key={i} className="relative">
                                            <div className="absolute -left-[41px] bg-slate-900 h-8 w-8 rounded-full border border-slate-700 flex items-center justify-center z-10">
                                                <div className="h-2.5 w-2.5 rounded-full bg-cyan-500"></div>
                                            </div>
                                            <div className="space-y-1 bg-slate-950/50 p-4 rounded-lg border border-slate-800/50">
                                                <div className="flex justify-between items-start">
                                                    <p className="text-slate-200 font-medium">{Log.action}</p>
                                                    <span className="text-xs text-slate-500 whitespace-nowrap ml-4">{Log.time}</span>
                                                </div>
                                                <p className="text-sm text-cyan-400 flex items-center gap-2">
                                                    <User className="h-3 w-3" /> {Log.user}
                                                </p>
                                            </div>
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

// Helper for Code Block (to keep main component cleaner)
const CodeBlock = ({ label, code, lang }: { label: string, code: string, lang: string }) => (
    <div className="space-y-0 rounded-lg overflow-hidden border border-slate-800">
        <div className="flex justify-between items-center bg-slate-950 px-4 py-2 border-b border-slate-800">
            <span className="text-sm text-slate-300 font-medium flex items-center gap-2">
                <Code className="h-4 w-4 text-cyan-500" /> {label}
            </span>
            <Button size="sm" variant="ghost" className="h-7 text-xs text-slate-400 hover:text-white hover:bg-slate-800">
                <Copy className="mr-1.5 h-3 w-3" /> Copy
            </Button>
        </div>
        <div className="bg-[#0D1117] p-4 font-mono text-sm text-slate-300 overflow-x-auto">
            <pre className="whitespace-pre">{code}</pre>
        </div>
    </div>
);

// Fallback icon for Lineage button if GitBranch doesn't feel right (using git-branch from lucide top imports)
const ShareLineageIcon = GitBranch;

export default DatasetDetail;
