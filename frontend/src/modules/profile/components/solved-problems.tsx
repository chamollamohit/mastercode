import { Trophy, CheckCircle2, ChevronRight, Hash } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SolvedProblems as SolvedProblemsInterface } from "@/app/(root)/profile/page";
import { formatDistance } from "date-fns";

const SolvedProblems = ({
    solvedProblems,
}: {
    solvedProblems: SolvedProblemsInterface[];
}) => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
                        <Trophy className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="text-2xl font-man font-black tracking-tight">
                        Mastered Challenges
                    </h2>
                </div>
                <Badge
                    variant="secondary"
                    className="rounded-lg px-3 py-1 font-black italic">
                    Total: {solvedProblems.length}
                </Badge>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {solvedProblems.map((problem) => (
                    <Card
                        key={problem.id}
                        className="group bg-card/20 backdrop-blur-sm border-border/40 rounded-[1.5rem] hover:bg-primary/5 transition-all cursor-pointer">
                        <CardContent className="p-5">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                    <Badge
                                        variant="outline"
                                        className="text-[10px] font-mono border-border/60">
                                        #{problem.id.slice(-4).toUpperCase()}
                                    </Badge>
                                </div>
                                <ChevronRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary transition-colors" />
                            </div>

                            <div className="flex justify-between">
                                <h3 className="font-bold text-foreground mb-3 line-clamp-1 group-hover:text-primary transition-colors">
                                    {problem.problem.title}
                                </h3>

                                <span className="text-[10px] font-bold text-muted-foreground ">
                                    Sovled{" "}
                                    {formatDistance(
                                        problem.createdAt,
                                        new Date(),
                                        {
                                            addSuffix: true,
                                        },
                                    )}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default SolvedProblems;
