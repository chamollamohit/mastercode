import {
    Trophy,
    CheckCircle2,
    ChevronRight,
    Activity,
    Calendar,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SolvedProblems as SolvedProblemsInterface } from "@/app/(root)/profile/page";
import { formatDistance } from "date-fns";

const SolvedProblems = ({
    solvedProblems,
}: {
    solvedProblems: SolvedProblemsInterface[];
}) => {
    if (!solvedProblems.length) {
        return (
            <Card className="w-full bg-card/20 backdrop-blur-md border-border/40 rounded-[2.5rem]">
                <CardContent className="flex flex-col items-center justify-center py-20 space-y-4">
                    <div className="p-4 rounded-full bg-muted/20 border-2 border-dashed border-border">
                        <Trophy className="w-8 h-8 text-muted-foreground/40" />
                    </div>
                    <div className="text-center">
                        <h3 className="text-xl font-bold font-man italic">
                            No Trophies Yet
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            Conquer challenges to see them in your arena logs.
                        </p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="w-full bg-card/20 backdrop-blur-xl border-border/40 rounded-[2.5rem] overflow-hidden">
            <CardHeader className="border-b border-border/20 bg-muted/5 pb-6">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <CardTitle className="text-2xl font-man font-black tracking-tight flex items-center gap-2">
                            <Trophy className="w-6 h-6 text-primary" />
                            Mastered Challenges
                        </CardTitle>
                        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">
                            Arena Victories
                        </p>
                    </div>
                    <Badge
                        variant="outline"
                        className="rounded-lg font-mono px-3">
                        Total: {solvedProblems.length}
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="p-0">
                <ScrollArea className="h-125 w-full px-6 py-4">
                    <div className="space-y-6 relative">
                        <div className="absolute left-4.75 top-4 bottom-4 w-px bg-border/40" />

                        {solvedProblems.map((problem) => (
                            <div
                                key={problem.id}
                                className="relative pl-12 group">
                                <div className="absolute left-0 top-1 w-10 h-10 rounded-xl border-4 border-background flex items-center justify-center z-10 transition-all duration-500 group-hover:scale-110 bg-emerald-500 text-white">
                                    <CheckCircle2 className="w-5 h-5" />
                                </div>

                                <div className="bg-muted/30 border border-border/40 rounded-2xl p-5 transition-all duration-300 group-hover:border-emerald-500/30 group-hover:bg-muted/50">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-3">
                                                <h4 className="text-lg font-black font-man tracking-tight text-foreground group-hover:text-primary transition-colors">
                                                    {problem.problem.title}
                                                </h4>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary italic">
                                            <Calendar className="w-3 h-3" />
                                            {formatDistance(
                                                new Date(problem.createdAt),
                                                new Date(),
                                                { addSuffix: true },
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-background border border-border/50">
                                                <Activity className="w-4 h-4 text-emerald-500" />
                                            </div>
                                            <div>
                                                <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40">
                                                    Status
                                                </p>
                                                <p className="text-sm font-bold font-man uppercase">
                                                    Solved
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-background border border-border/50">
                                                <Activity className="w-4 h-4 text-primary" />
                                            </div>
                                            <div>
                                                <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40">
                                                    Difficulty
                                                </p>
                                                <p className="text-sm font-bold font-man uppercase">
                                                    {problem.problem.difficulty}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 md:justify-end">
                                            <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20 cursor-pointer hover:bg-primary text-primary hover:text-primary-foreground transition-all duration-300">
                                                <ChevronRight className="w-4 h-4" />
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

export default SolvedProblems;
