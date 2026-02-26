import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    CheckCircle2,
    XCircle,
    Clock,
    Cpu,
    Calendar,
    Terminal,
    ChevronRight,
    Activity,
} from "lucide-react";
import { Submissions } from "@/app/(root)/profile/page";
import { format } from "date-fns";

export const SubmissionHistory = ({
    submissions,
}: {
    submissions: Submissions[];
}) => {
    if (!submissions.length) {
        return (
            <Card className="w-full bg-card/20 backdrop-blur-md border-border/40 rounded-[2rem]">
                <CardContent className="flex flex-col items-center justify-center py-20 space-y-4">
                    <div className="p-4 rounded-full bg-muted/20 border-2 border-dashed border-border">
                        <Terminal className="w-8 h-8 text-muted-foreground/40" />
                    </div>
                    <div className="text-center">
                        <h3 className="text-xl font-bold font-man italic">
                            No Data Logs
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            Your arena attempts will be recorded here.
                        </p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    const formatMemory = (memory: string) => {
        if (!memory) return "N/A";
        try {
            const memoryArray = JSON.parse(memory);

            const avgMemory =
                memoryArray.reduce(
                    (a: string, b: string) => parseFloat(a) + parseFloat(b),
                    0,
                ) / memoryArray.length;
            return `${avgMemory.toFixed(2)} KB`;
        } catch {
            return "N/A";
        }
    };

    const formatTime = (time: string) => {
        if (!time) return "N/A";
        try {
            const timeArray = JSON.parse(time);
            const avgTime =
                timeArray
                    .map((t: string) => parseFloat(t.replace(" s", "")))
                    .reduce((a: number, b: number) => a + b, 0) /
                timeArray.length;
            return `${avgTime.toFixed(3)} s`;
        } catch {
            return "N/A";
        }
    };
    return (
        <Card className="w-full bg-card/20 backdrop-blur-xl border-border/40 rounded-[2.5rem] overflow-hidden">
            <CardHeader className="border-b border-border/20 bg-muted/5 pb-6">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <CardTitle className="text-2xl font-man font-black tracking-tight flex items-center gap-2">
                            <Activity className="w-6 h-6 text-primary" />
                            Submission Logs
                        </CardTitle>
                        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">
                            Execution History
                        </p>
                    </div>
                    <Badge
                        variant="outline"
                        className="rounded-lg font-mono px-3">
                        Total: {submissions.length}
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="p-0">
                <ScrollArea className="h-125 w-full px-6 py-4">
                    <div className="space-y-6 relative">
                        <div className="absolute left-4.75 top-2 bottom-2 w-px bg-border/40" />

                        {submissions.map((submission) => (
                            <div
                                key={submission.id}
                                className="relative pl-12 group">
                                <div
                                    className={`absolute left-0 top-1 w-10 h-10 rounded-xl border-4 border-background flex items-center justify-center z-10 transition-transform group-hover:scale-110 ${
                                        submission.status === "ACCEPTED"
                                            ? "bg-emerald-500 text-white"
                                            : "bg-destructive text-destructive-foreground"
                                    }`}>
                                    {submission.status === "ACCEPTED" ? (
                                        <CheckCircle2 className="w-5 h-5" />
                                    ) : (
                                        <XCircle className="w-5 h-5" />
                                    )}
                                </div>

                                <div className="bg-muted/30 hover:bg-muted/50 border border-border/40 rounded-2xl p-5 transition-all duration-300 group-hover:border-emerald-500/30">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                                        <div className="flex items-center gap-3">
                                            <h4
                                                className={`text-lg font-black font-man tracking-tight ${
                                                    submission.status ===
                                                    "ACCEPTED"
                                                        ? "text-emerald-500"
                                                        : "text-destructive"
                                                }`}>
                                                {submission.status.toUpperCase()}
                                            </h4>
                                            <Badge
                                                variant="secondary"
                                                className="bg-background/50 text-[10px] font-bold uppercase tracking-widest px-2 py-0">
                                                {submission.language}
                                            </Badge>
                                        </div>

                                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                                            <Calendar className="w-3 h-3" />
                                            {format(
                                                submission.createdAt,
                                                "PPpp",
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-background border border-border/50">
                                                <Cpu className="w-4 h-4 text-blue-500" />
                                            </div>
                                            <div>
                                                <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40">
                                                    Average Memory
                                                </p>
                                                <p className="text-sm font-bold font-man">
                                                    {formatMemory(
                                                        submission.memory,
                                                    )}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-background border border-border/50">
                                                <Clock className="w-4 h-4 text-amber-500" />
                                            </div>
                                            <div>
                                                <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40">
                                                    Average Runtime
                                                </p>
                                                <p className="text-sm font-bold font-man">
                                                    {formatTime(
                                                        submission.time,
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
};
