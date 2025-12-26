import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle2, ArrowRight, ShieldAlert, Zap, Activity } from "lucide-react";
import { motion } from "framer-motion";

const Dashboard = () => {
    return (
        <DashboardLayout>
            <div className="space-y-6 pb-20">
                <div className="flex flex-col gap-4">
                    <div>
                        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                            Executive Cockpit
                        </h1>
                        <p className="text-slate-400 mt-2">Real-time operational intelligence across reliability, trust, and explainability</p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-2">
                        {/* Reliability Card */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
                            <Card className="bg-slate-900 border-slate-800 text-slate-100 shadow-sm hover:shadow-cyan-900/20 transition-all">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium text-slate-400">Reliability</CardTitle>
                                    <Activity className="h-4 w-4 text-slate-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-baseline gap-2">
                                        <div className="text-2xl font-bold text-white">91%</div>
                                        <div className="text-xs text-emerald-500 flex items-center font-medium">
                                            <ArrowRight className="h-3 w-3 -rotate-45" /> 2%
                                        </div>
                                    </div>
                                    <p className="text-xs text-slate-500 mt-1">System uptime</p>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Governance Card */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
                            <Card className="bg-slate-900 border-slate-800 text-slate-100 shadow-sm hover:shadow-cyan-900/20 transition-all">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium text-slate-400">Governance</CardTitle>
                                    <ShieldAlert className="h-4 w-4 text-slate-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-baseline gap-2">
                                        <div className="text-2xl font-bold text-white">88%</div>
                                        <div className="text-xs text-red-500 flex items-center font-medium">
                                            <ArrowRight className="h-3 w-3 rotate-45" /> 1%
                                        </div>
                                    </div>
                                    <p className="text-xs text-slate-500 mt-1">Policy compliance</p>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Data Coverage Card */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
                            <Card className="bg-slate-900 border-slate-800 text-slate-100 shadow-sm hover:shadow-cyan-900/20 transition-all">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium text-slate-400">Data Coverage</CardTitle>
                                    <Zap className="h-4 w-4 text-slate-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-baseline gap-2">
                                        <div className="text-2xl font-bold text-white">90%</div>
                                        <div className="text-xs text-emerald-500 flex items-center font-medium">
                                            <ArrowRight className="h-3 w-3 -rotate-45" /> 3%
                                        </div>
                                    </div>
                                    <p className="text-xs text-slate-500 mt-1">Schema coverage</p>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Model Uptime Card */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
                            <Card className="bg-slate-900 border-slate-800 text-slate-100 shadow-sm hover:shadow-cyan-900/20 transition-all">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium text-slate-400">Model Uptime</CardTitle>
                                    <Activity className="h-4 w-4 text-slate-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-baseline gap-2">
                                        <div className="text-2xl font-bold text-white">98.2%</div>
                                        <div className="text-xs text-amber-500 flex items-center font-medium">
                                            <Activity className="h-3 w-3 mr-1" /> 0%
                                        </div>
                                    </div>
                                    <p className="text-xs text-slate-500 mt-1">ML availability</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>


                    <Tabs defaultValue="overview" className="space-y-6">
                        <TabsList className="bg-transparent h-auto p-0 gap-2 justify-start">
                            <TabsTrigger
                                value="overview"
                                className="rounded-full px-4 py-2 text-sm font-medium border border-transparent data-[state=active]:bg-white data-[state=active]:text-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 transition-all border-slate-800 data-[state=active]:border-transparent"
                            >
                                Overview
                            </TabsTrigger>
                            <TabsTrigger
                                value="reliability"
                                className="rounded-full px-4 py-2 text-sm font-medium border border-transparent data-[state=active]:bg-white data-[state=active]:text-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 transition-all border-slate-800 data-[state=active]:border-transparent"
                            >
                                <Activity className="w-4 h-4 mr-2" />
                                Reliability
                            </TabsTrigger>
                            <TabsTrigger
                                value="governance"
                                className="rounded-full px-4 py-2 text-sm font-medium border border-transparent data-[state=active]:bg-white data-[state=active]:text-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 transition-all border-slate-800 data-[state=active]:border-transparent"
                            >
                                <ShieldAlert className="w-4 h-4 mr-2" />
                                Governance
                            </TabsTrigger>
                            <TabsTrigger
                                value="explainability"
                                className="rounded-full px-4 py-2 text-sm font-medium border border-transparent data-[state=active]:bg-white data-[state=active]:text-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 transition-all border-slate-800 data-[state=active]:border-transparent"
                            >
                                <Zap className="w-4 h-4 mr-2" />
                                Explainability
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="overview" className="space-y-6 animate-in slide-in-from-bottom-2 duration-500">

                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Recent Incidents Card */}
                                <Card className="bg-slate-900 border-slate-800 shadow-sm overflow-hidden">
                                    <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-slate-800/50">
                                        <CardTitle className="text-lg font-bold text-white">Recent Incidents</CardTitle>
                                        <Button variant="link" className="text-cyan-500 text-sm font-medium p-0 h-auto hover:text-cyan-400">
                                            View all
                                        </Button>
                                    </CardHeader>
                                    <CardContent className="p-0">
                                        <div className="divide-y divide-slate-800/50">
                                            {/* Monitoring Item 1 */}
                                            <div className="p-4 hover:bg-slate-800/20 transition-colors group">
                                                <div className="flex gap-4">
                                                    <div className="mt-1">
                                                        <AlertTriangle className="h-5 w-5 text-red-500" />
                                                    </div>
                                                    <div className="flex-1 space-y-1">
                                                        <h4 className="text-white font-medium text-sm group-hover:text-cyan-400 transition-colors">High null rate in customer_email</h4>
                                                        <p className="text-xs text-slate-500 font-mono">customers.prod</p>
                                                        <div className="flex items-center gap-2 mt-2">
                                                            <Badge variant="secondary" className="bg-slate-950 text-slate-300 border border-slate-800 text-[10px] font-medium px-2 py-0.5 h-5">
                                                                Investigating
                                                            </Badge>
                                                            <span className="text-[10px] text-slate-500">2 hours ago</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Monitoring Item 2 */}
                                            <div className="p-4 hover:bg-slate-800/20 transition-colors group">
                                                <div className="flex gap-4">
                                                    <div className="mt-1">
                                                        <AlertTriangle className="h-5 w-5 text-amber-500" />
                                                    </div>
                                                    <div className="flex-1 space-y-1">
                                                        <h4 className="text-white font-medium text-sm group-hover:text-cyan-400 transition-colors">Schema drift detected in orders table</h4>
                                                        <p className="text-xs text-slate-500 font-mono">transactions.orders</p>
                                                        <div className="flex items-center gap-2 mt-2">
                                                            <Badge variant="outline" className="border-slate-700 text-slate-400 text-[10px] font-medium px-2 py-0.5 h-5">
                                                                auto-fixed
                                                            </Badge>
                                                            <span className="text-[10px] text-slate-500">5 hours ago</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Monitoring Item 3 */}
                                            <div className="p-4 hover:bg-slate-800/20 transition-colors group">
                                                <div className="flex gap-4">
                                                    <div className="mt-1">
                                                        <AlertTriangle className="h-5 w-5 text-amber-500" />
                                                    </div>
                                                    <div className="flex-1 space-y-1">
                                                        <h4 className="text-white font-medium text-sm group-hover:text-cyan-400 transition-colors">Data freshness SLA breach</h4>
                                                        <p className="text-xs text-slate-500 font-mono">analytics.daily_summary</p>
                                                        <div className="flex items-center gap-2 mt-2">
                                                            <Badge variant="secondary" className="bg-slate-950 text-slate-300 border border-slate-800 text-[10px] font-medium px-2 py-0.5 h-5">
                                                                resolved
                                                            </Badge>
                                                            <span className="text-[10px] text-slate-500">1 day ago</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Recent Auto-Fixes Card */}
                                <Card className="bg-slate-900 border-slate-800 shadow-sm overflow-hidden">
                                    <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-slate-800/50">
                                        <CardTitle className="text-lg font-bold text-white">Recent Auto-Fixes</CardTitle>
                                        <span className="text-xs text-slate-500 font-medium">Last 24 hours</span>
                                    </CardHeader>
                                    <CardContent className="p-0">
                                        <div className="divide-y divide-slate-800/50">
                                            {/* Auto Fix 1 */}
                                            <div className="p-4 hover:bg-slate-800/20 transition-colors group">
                                                <div className="flex gap-4">
                                                    <div className="mt-1">
                                                        <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                                                    </div>
                                                    <div className="flex-1 space-y-1">
                                                        <h4 className="text-white font-medium text-sm group-hover:text-cyan-400 transition-colors">Removed duplicate records</h4>
                                                        <p className="text-xs text-slate-500 font-mono">users.activity_log</p>
                                                        <div className="flex items-center gap-2 mt-2 text-[10px] text-slate-500">
                                                            <span>1,247 rows</span>
                                                            <span className="w-1 h-1 rounded-full bg-slate-700"></span>
                                                            <span>1 hour ago</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Auto Fix 2 */}
                                            <div className="p-4 hover:bg-slate-800/20 transition-colors group">
                                                <div className="flex gap-4">
                                                    <div className="mt-1">
                                                        <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                                                    </div>
                                                    <div className="flex-1 space-y-1">
                                                        <h4 className="text-white font-medium text-sm group-hover:text-cyan-400 transition-colors">Normalized date formats</h4>
                                                        <p className="text-xs text-slate-500 font-mono">events.raw_data</p>
                                                        <div className="flex items-center gap-2 mt-2 text-[10px] text-slate-500">
                                                            <span>856 rows</span>
                                                            <span className="w-1 h-1 rounded-full bg-slate-700"></span>
                                                            <span>3 hours ago</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Auto Fix 3 */}
                                            <div className="p-4 hover:bg-slate-800/20 transition-colors group">
                                                <div className="flex gap-4">
                                                    <div className="mt-1">
                                                        <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                                                    </div>
                                                    <div className="flex-1 space-y-1">
                                                        <h4 className="text-white font-medium text-sm group-hover:text-cyan-400 transition-colors">Fixed invalid JSON in metadata</h4>
                                                        <p className="text-xs text-slate-500 font-mono">catalog.dataset_metadata</p>
                                                        <div className="flex items-center gap-2 mt-2 text-[10px] text-slate-500">
                                                            <span>23 rows</span>
                                                            <span className="w-1 h-1 rounded-full bg-slate-700"></span>
                                                            <span>6 hours ago</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Items Awaiting Approval Card */}
                            <Card className="bg-slate-900 border-slate-800 shadow-sm overflow-hidden">
                                <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-slate-800/50">
                                    <div className="flex items-center gap-2">
                                        <CardTitle className="text-lg font-bold text-white">Items Awaiting Approval</CardTitle>
                                    </div>
                                    <Button variant="link" className="text-cyan-500 text-sm font-medium p-0 h-auto hover:text-cyan-400">
                                        View all
                                    </Button>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="divide-y divide-slate-800/50">
                                        {/* Approval 1 */}
                                        <div className="p-4 hover:bg-slate-800/20 transition-colors group">
                                            <div className="flex items-start justify-between">
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-2">
                                                        <Badge variant="outline" className="text-slate-400 border-slate-700 text-[10px] uppercase font-bold tracking-wider rounded-sm px-1.5 py-0">PII Classification</Badge>
                                                        <span className="text-[10px] text-slate-500">2 days ago</span>
                                                    </div>
                                                    <h4 className="text-slate-200 text-sm font-medium group-hover:text-white transition-colors">
                                                        Mark <code className="bg-slate-950 px-1 py-0.5 rounded text-cyan-400 font-mono text-xs">ssn</code> column as PII in <code className="text-slate-400">customers.personal_info</code>
                                                    </h4>
                                                </div>
                                                <Badge className="bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20 text-[10px]">
                                                    High Impact
                                                </Badge>
                                            </div>
                                        </div>

                                        {/* Approval 2 */}
                                        <div className="p-4 hover:bg-slate-800/20 transition-colors group">
                                            <div className="flex items-start justify-between">
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-2">
                                                        <Badge variant="outline" className="text-slate-400 border-slate-700 text-[10px] uppercase font-bold tracking-wider rounded-sm px-1.5 py-0">Dataset Description</Badge>
                                                        <span className="text-[10px] text-slate-500">1 day ago</span>
                                                    </div>
                                                    <h4 className="text-slate-200 text-sm font-medium group-hover:text-white transition-colors">
                                                        AI-generated description for <code className="text-slate-400">analytics.revenue_dashboard</code>
                                                    </h4>
                                                </div>
                                                <Badge className="bg-blue-500/10 text-blue-500 border border-blue-500/20 hover:bg-blue-500/20 text-[10px]">
                                                    Low Impact
                                                </Badge>
                                            </div>
                                        </div>

                                        {/* Approval 3 */}
                                        <div className="p-4 hover:bg-slate-800/20 transition-colors group">
                                            <div className="flex items-start justify-between">
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-2">
                                                        <Badge variant="outline" className="text-slate-400 border-slate-700 text-[10px] uppercase font-bold tracking-wider rounded-sm px-1.5 py-0">Auto-fix Rule</Badge>
                                                        <span className="text-[10px] text-slate-500">3 hours ago</span>
                                                    </div>
                                                    <h4 className="text-slate-200 text-sm font-medium group-hover:text-white transition-colors">
                                                        Promote <span className="text-white">email validation rule</span> to production
                                                    </h4>
                                                </div>
                                                <Badge className="bg-amber-500/10 text-amber-500 border border-amber-500/20 hover:bg-amber-500/20 text-[10px]">
                                                    Medium Impact
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="reliability" className="space-y-6 animate-in slide-in-from-bottom-2 duration-500">
                            <div className="grid gap-6">
                                <Card className="bg-slate-900 border-slate-800">
                                    <CardHeader>
                                        <CardTitle className="text-white">System Reliability Trends</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="h-[250px] flex items-center justify-center border border-dashed border-slate-800 rounded-md bg-slate-950/50">
                                            <div className="text-center">
                                                <Activity className="h-10 w-10 text-slate-600 mx-auto mb-3" />
                                                <p className="text-slate-500">Uptime & Latency Visualization Placeholder</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <Card className="bg-slate-900 border-slate-800">
                                        <CardHeader>
                                            <CardTitle className="text-white">Service Level Objectives (SLOs)</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-slate-300">API Availability</span>
                                                        <span className="text-emerald-500 font-medium">99.99%</span>
                                                    </div>
                                                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                                        <div className="h-full bg-emerald-500 w-[99.9%]" />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-slate-300">Data Freshness</span>
                                                        <span className="text-amber-500 font-medium">98.5%</span>
                                                    </div>
                                                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                                        <div className="h-full bg-amber-500 w-[98.5%]" />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-slate-300">Pipeline Success Rate</span>
                                                        <span className="text-emerald-500 font-medium">99.2%</span>
                                                    </div>
                                                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                                        <div className="h-full bg-emerald-500 w-[99.2%]" />
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Card className="bg-slate-900 border-slate-800">
                                        <CardHeader>
                                            <CardTitle className="text-white">Active Incidents</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-4">
                                                <div className="flex items-start gap-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                                                    <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                                                    <div>
                                                        <h4 className="text-white font-medium text-sm">Payment Gateway Latency</h4>
                                                        <p className="text-slate-400 text-xs">Investigating - 15 mins ago</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start gap-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                                                    <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                                                    <div>
                                                        <h4 className="text-white font-medium text-sm">Warehouse Sync Delay</h4>
                                                        <p className="text-slate-400 text-xs">Identified - 1 hour ago</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="governance" className="space-y-6 animate-in slide-in-from-bottom-2 duration-500">
                            <div className="grid md:grid-cols-3 gap-6">
                                <Card className="bg-slate-900 border-slate-800">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-sm font-medium text-slate-400">GDPR Compliance</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold text-white">100%</div>
                                        <p className="text-xs text-emerald-500 mt-1">Fully Compliant</p>
                                    </CardContent>
                                </Card>
                                <Card className="bg-slate-900 border-slate-800">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-sm font-medium text-slate-400">PII Fields Detected</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold text-white">1,204</div>
                                        <p className="text-xs text-slate-500 mt-1">Across 85 tables</p>
                                    </CardContent>
                                </Card>
                                <Card className="bg-slate-900 border-slate-800">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-sm font-medium text-slate-400">Policy Violations</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold text-amber-500">12</div>
                                        <p className="text-xs text-slate-500 mt-1">Requires manual review</p>
                                    </CardContent>
                                </Card>
                            </div>
                            <Card className="bg-slate-900 border-slate-800">
                                <CardHeader>
                                    <CardTitle className="text-white">Recent Audit Logs</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="flex items-center justify-between border-b border-slate-800 pb-2 last:border-0 last:pb-0">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center">
                                                        <ShieldAlert className="h-4 w-4 text-slate-400" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-white">Access Policy Updated</p>
                                                        <p className="text-xs text-slate-500">by admin@intellistream.ai</p>
                                                    </div>
                                                </div>
                                                <span className="text-xs text-slate-500">{i * 2} hours ago</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="explainability" className="space-y-6 animate-in slide-in-from-bottom-2 duration-500">
                            <div className="grid gap-6 md:grid-cols-2">
                                <Card className="bg-slate-900 border-slate-800">
                                    <CardHeader>
                                        <CardTitle className="text-white">Model Drift Monitoring</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="h-[200px] flex items-center justify-center border border-dashed border-slate-800 rounded-md bg-slate-950/50">
                                            <div className="text-center">
                                                <Activity className="h-10 w-10 text-slate-600 mx-auto mb-3" />
                                                <p className="text-slate-500">Drift Charts Placeholder</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card className="bg-slate-900 border-slate-800">
                                    <CardHeader>
                                        <CardTitle className="text-white">Feature Importance</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-3">
                                            <div className="space-y-1">
                                                <div className="flex justify-between text-xs">
                                                    <span className="text-slate-300">Customer Age</span>
                                                    <span className="text-slate-400">0.35</span>
                                                </div>
                                                <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                                    <div className="h-full bg-cyan-500 w-[35%]" />
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <div className="flex justify-between text-xs">
                                                    <span className="text-slate-300">Last Purchase Date</span>
                                                    <span className="text-slate-400">0.28</span>
                                                </div>
                                                <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                                    <div className="h-full bg-cyan-500 w-[28%]" />
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <div className="flex justify-between text-xs">
                                                    <span className="text-slate-300">Total Spend</span>
                                                    <span className="text-slate-400">0.22</span>
                                                </div>
                                                <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                                    <div className="h-full bg-cyan-500 w-[22%]" />
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div >
        </DashboardLayout >
    );
};

export default Dashboard;
