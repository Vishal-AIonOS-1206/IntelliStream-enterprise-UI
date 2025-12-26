import DashboardLayout from "@/components/DashboardLayout";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Database, Filter, MoreHorizontal, Search, FileText, Table as TableIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ASSETS = [
    {
        id: "1",
        name: "dim_customers",
        type: "Table",
        platform: "Snowflake",
        schema: "SALES_PROD",
        rows: "1.2M",
        updated: "2 mins ago",
        quality: 98,
        status: "Healthy",
    },
    {
        id: "2",
        name: "fct_orders_daily",
        type: "Table",
        platform: "Snowflake",
        schema: "SALES_PROD",
        rows: "45.5M",
        updated: "15 mins ago",
        quality: 100,
        status: "Healthy",
    },
    {
        id: "3",
        name: "stg_clickstream_raw",
        type: "Table",
        platform: "Databricks",
        schema: "RAW_ZONE",
        rows: "850M",
        updated: "Unable to sync",
        quality: 0,
        status: "Error",
    },
    {
        id: "4",
        name: "vw_churn_prediction",
        type: "View",
        platform: "Snowflake",
        schema: "ANALYTICS",
        rows: "-",
        updated: "1 hour ago",
        quality: 95,
        status: "Healthy",
    },
    {
        id: "5",
        name: "raw_stripe_payments",
        type: "Table",
        platform: "S3",
        schema: "LANDING",
        rows: "2.1M",
        updated: "5 mins ago",
        quality: 92,
        status: "Warning",
    },
];

const DataAssets = () => {
    const navigate = useNavigate();

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Data Assets</h1>
                    <p className="text-slate-400 mt-2">
                        Catalog and manage your discovered data assets across all platforms.
                    </p>
                </div>

                {/* Filters and Search */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-slate-900/50 p-4 rounded-lg border border-slate-800">
                    <div className="relative w-full sm:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                        <Input
                            placeholder="Search assets..."
                            className="pl-10 bg-slate-950 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-cyan-500/50"
                        />
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                        <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">
                            <Filter className="mr-2 h-4 w-4" /> Filter
                        </Button>
                    </div>
                </div>

                {/* Assets Table */}
                <div className="rounded-lg border border-slate-800 bg-slate-900/50 overflow-hidden">
                    <Table>
                        <TableHeader className="bg-slate-900">
                            <TableRow className="border-slate-800 hover:bg-slate-900">
                                <TableHead className="text-slate-400 font-medium">Name</TableHead>
                                <TableHead className="text-slate-400 font-medium">Type</TableHead>
                                <TableHead className="text-slate-400 font-medium">Platform</TableHead>
                                <TableHead className="text-slate-400 font-medium">Rows</TableHead>
                                <TableHead className="text-slate-400 font-medium">Quality Score</TableHead>
                                <TableHead className="text-slate-400 font-medium">Last Updated</TableHead>
                                <TableHead className="text-slate-400 font-medium">Status</TableHead>
                                <TableHead className="text-right text-slate-400 font-medium">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {ASSETS.map((asset) => (
                                <TableRow
                                    key={asset.id}
                                    className="border-slate-800 hover:bg-slate-800/50 transition-colors cursor-pointer"
                                    onClick={() => navigate(`/dashboard/assets/${asset.id}`)}
                                >
                                    <TableCell className="font-medium text-white">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded bg-slate-800 flex items-center justify-center text-cyan-500">
                                                {asset.type === 'Table' ? <TableIcon className="h-4 w-4" /> : <FileText className="h-4 w-4" />}
                                            </div>
                                            <div className="flex flex-col">
                                                <span>{asset.name}</span>
                                                <span className="text-xs text-slate-500">{asset.schema}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-slate-300">{asset.type}</TableCell>
                                    <TableCell className="text-slate-300">{asset.platform}</TableCell>
                                    <TableCell className="text-slate-300 font-mono text-sm">{asset.rows}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <div className="h-1.5 w-16 bg-slate-800 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full ${asset.quality >= 90 ? 'bg-emerald-500' : asset.quality >= 70 ? 'bg-amber-500' : 'bg-red-500'}`}
                                                    style={{ width: `${asset.quality}%` }}
                                                />
                                            </div>
                                            <span className="text-xs text-slate-400">{asset.quality}%</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-slate-400 text-sm">{asset.updated}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant="outline"
                                            className={`
                            ${asset.status === 'Healthy' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : ''}
                            ${asset.status === 'Warning' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : ''}
                            ${asset.status === 'Error' ? 'bg-red-500/10 text-red-500 border-red-500/20' : ''}
                        `}
                                        >
                                            {asset.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-white">
                                                    <span className="sr-only">Open menu</span>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="bg-slate-900 border-slate-800 text-slate-300">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem className="focus:bg-slate-800 focus:text-cyan-400">View lineage</DropdownMenuItem>
                                                <DropdownMenuItem className="focus:bg-slate-800 focus:text-cyan-400">View details</DropdownMenuItem>
                                                <DropdownMenuSeparator className="bg-slate-800" />
                                                <DropdownMenuItem className="focus:bg-slate-800 focus:text-red-400">Run data profile</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default DataAssets;
