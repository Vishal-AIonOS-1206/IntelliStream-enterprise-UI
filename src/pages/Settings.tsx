import DashboardLayout from "@/components/DashboardLayout";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
    User,
    Bell,
    Shield,
    Cloud,
    Key,
    Mail,
    Slack
} from "lucide-react";

const Settings = () => {
    return (
        <DashboardLayout>
            <div className="space-y-6 max-w-4xl mx-auto">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Settings</h1>
                    <p className="text-slate-400 mt-2">
                        Manage your workspace preferences, integrations, and account settings.
                    </p>
                </div>

                <div className="grid gap-8">
                    {/* Workspace General */}
                    <Card className="bg-slate-900 border-slate-800">
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Cloud className="h-5 w-5 text-cyan-500" />
                                <CardTitle className="text-white">Workspace General</CardTitle>
                            </div>
                            <CardDescription className="text-slate-400">Configuration for "Acme Corp Production"</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="ws-name" className="text-slate-200">Workspace Name</Label>
                                <Input id="ws-name" defaultValue="Acme Corp Production" className="bg-slate-950 border-slate-700 text-white" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="ws-env" className="text-slate-200">Environment Tag</Label>
                                <Input id="ws-env" defaultValue="Production" disabled className="bg-slate-950/50 border-slate-700 text-slate-400 cursor-not-allowed" />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Notifications */}
                    <Card className="bg-slate-900 border-slate-800">
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Bell className="h-5 w-5 text-amber-500" />
                                <CardTitle className="text-white">Notifications & Alerts</CardTitle>
                            </div>
                            <CardDescription className="text-slate-400">Configure how and when you receive alerts.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base text-white">Critical Pipeline Failures</Label>
                                    <p className="text-sm text-slate-400">Receive immediate alerts when high-priority pipelines fail.</p>
                                </div>
                                <Switch checked={true} />
                            </div>
                            <Separator className="bg-slate-800" />
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base text-white">Schema Changes</Label>
                                    <p className="text-sm text-slate-400">Notify when schema drift is detected in monitored assets.</p>
                                </div>
                                <Switch checked={true} />
                            </div>
                            <Separator className="bg-slate-800" />
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base text-white">Auto-Fix Reports</Label>
                                    <p className="text-sm text-slate-400">Weekly summary of autonomous actions taken.</p>
                                </div>
                                <Switch checked={false} />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Integrations */}
                    <Card className="bg-slate-900 border-slate-800">
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Key className="h-5 w-5 text-emerald-500" />
                                <CardTitle className="text-white">Integrations</CardTitle>
                            </div>
                            <CardDescription className="text-slate-400">Connected services and API keys.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between p-4 rounded-lg border border-slate-800 bg-slate-950">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 bg-white rounded-md flex items-center justify-center">
                                        {/* Snowflake Icon Placeholder */}
                                        <div className="h-6 w-6 bg-blue-400 rounded-full" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-white">Snowflake</p>
                                        <p className="text-xs text-slate-400">Connected as ACCOUNTADMIN</p>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm" className="border-slate-700 text-slate-300">Manage</Button>
                            </div>

                            <div className="flex items-center justify-between p-4 rounded-lg border border-slate-800 bg-slate-950">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 bg-[#4A154B] rounded-md flex items-center justify-center">
                                        <Slack className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-white">Slack</p>
                                        <p className="text-xs text-slate-400">Alerts channel: #data-ops</p>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm" className="border-slate-700 text-slate-300">Manage</Button>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end gap-3">
                        <Button variant="ghost" className="text-slate-400 hover:text-white hover:bg-slate-800">Cancel</Button>
                        <Button className="bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-bold">Save Changes</Button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Settings;
