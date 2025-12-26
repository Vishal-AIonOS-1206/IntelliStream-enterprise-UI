import DashboardLayout from "@/components/DashboardLayout";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Check,
    X,
    FileText,
    Shield,
    Clock,
    Pencil,
    ThumbsDown,
    Search
} from "lucide-react";

// Mock Data matches the user's specific image request
const APPROVALS = [
    {
        id: "REQ-101",
        title: "AI-generated description for analytics.revenue_dashboard",
        dataset: "analytics.revenue_dashboard",
        type: "Dataset Description",
        impact: "Low Impact",
        time: "1 day ago",
        whatChanged: "Add comprehensive documentation",
        reason: "IntelliStream analyzed usage patterns and data lineage to generate accurate documentation",
        icon: FileText
    },
    {
        id: "REQ-102",
        title: "Mark ssn column as PII in customers.personal_info",
        dataset: "customers.personal_info",
        type: "PII Classification",
        impact: "High Impact",
        time: "2 days ago",
        whatChanged: "Column 'ssn' tagged as PII_SENSITIVE",
        reason: "Pattern matching detected format ###-##-#### in sample data scan.",
        icon: Shield
    },
    {
        id: "REQ-103",
        title: "Propagate 'finance_admin' role to downstream marts",
        dataset: "finance.regional_marts",
        type: "Access Control",
        impact: "Medium Impact",
        time: "3 days ago",
        whatChanged: "Grant SELECT on 5 downstream tables",
        reason: "User access patterns suggest missing permissions for finance team members.",
        icon: Shield
    }
];

const Approvals = () => {
    return (
        <DashboardLayout>
            <div className="space-y-8 pb-10">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Approvals Inbox</h1>
                    <p className="text-slate-400 mt-2 text-lg">
                        Review and approve recommendations from IntelliStream
                    </p>
                </div>

                {/* Metrics Row */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <Card className="bg-slate-900 border-slate-800">
                        <CardContent className="pt-6">
                            <div className="text-4xl font-bold text-white mb-2">8</div>
                            <p className="text-sm text-slate-400 font-medium">Pending Approvals</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-slate-900 border-slate-800">
                        <CardContent className="pt-6">
                            <div className="text-4xl font-bold text-emerald-500 mb-2">42</div>
                            <p className="text-sm text-slate-400 font-medium">Approved This Week</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-slate-900 border-slate-800">
                        <CardContent className="pt-6">
                            <div className="text-4xl font-bold text-amber-500 mb-2">3</div>
                            <p className="text-sm text-slate-400 font-medium">High Priority</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-slate-900 border-slate-800">
                        <CardContent className="pt-6">
                            <div className="text-4xl font-bold text-white mb-2">98%</div>
                            <p className="text-sm text-slate-400 font-medium">Approval Rate</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Approval List */}
                <div className="space-y-6">
                    {APPROVALS.map((req) => (
                        <Card key={req.id} className="bg-slate-900 border-slate-800 overflow-hidden">
                            <CardContent className="p-0">
                                <div className="flex flex-col md:flex-row">
                                    {/* Icon Column */}
                                    <div className="w-full md:w-24 bg-slate-950/50 flex items-start justify-center pt-8 border-b md:border-b-0 md:border-r border-slate-800 min-h-[100px]">
                                        <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                                            <req.icon className="h-6 w-6 text-blue-500" />
                                        </div>
                                    </div>

                                    {/* Content Column */}
                                    <div className="flex-1 p-6 space-y-6">
                                        {/* Header Tags */}
                                        <div className="flex flex-wrap items-center gap-3">
                                            <Badge variant="secondary" className="bg-slate-800 text-slate-300 font-normal hover:bg-slate-800">
                                                {req.type}
                                            </Badge>
                                            <span className="text-xs text-slate-500">{req.time}</span>
                                            <Badge className={`${req.impact === 'High Impact' ? 'bg-red-500 hover:bg-red-600' :
                                                    req.impact === 'Medium Impact' ? 'bg-amber-500 hover:bg-amber-600' :
                                                        'bg-slate-100 text-slate-900 hover:bg-slate-200'
                                                } text-xs font-semibold border-0`}>
                                                {req.impact}
                                            </Badge>
                                        </div>

                                        {/* Title area */}
                                        <div>
                                            <h3 className="text-xl font-bold text-white mb-1">{req.title}</h3>
                                            <p className="text-slate-400 text-sm">Dataset: <span className="text-slate-300 font-medium">{req.dataset}</span></p>
                                        </div>

                                        {/* Info Box */}
                                        <div className="bg-slate-950 rounded-lg p-5 border border-slate-800 grid md:grid-cols-2 gap-8">
                                            <div className="space-y-2">
                                                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">What Changed</h4>
                                                <p className="text-slate-200 text-sm leading-relaxed">{req.whatChanged}</p>
                                            </div>
                                            <div className="space-y-2">
                                                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Why IntelliStream Recommends It</h4>
                                                <p className="text-slate-200 text-sm leading-relaxed">{req.reason}</p>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex flex-wrap gap-3 pt-2">
                                            <Button className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold min-w-[120px]">
                                                <Check className="mr-2 h-4 w-4" /> Approve
                                            </Button>
                                            <Button variant="outline" className="border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 min-w-[140px]">
                                                <Pencil className="mr-2 h-4 w-4" /> Edit & Approve
                                            </Button>
                                            <Button variant="outline" className="border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 min-w-[120px]">
                                                <ThumbsDown className="mr-2 h-4 w-4" /> Reject
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Approvals;
