import { BarChart3, Target, Clock, Award } from "lucide-react";
import { Submissions } from "@/app/(root)/profile/page";

const ProfileStats = ({
    submissions,
    solvedCount,
    playlistCount,
}: {
    submissions: Submissions[];
    solvedCount: number;
    playlistCount: number;
}) => {
    const acceptedCount = submissions.filter(
        (submission) => submission.status === "ACCEPTED",
    ).length;
    const successRate =
        submissions.length > 0
            ? Math.round((acceptedCount / submissions.length) * 100)
            : 0;

    const stats = [
        {
            label: "Success",
            value: `${successRate}%`,
            icon: Target,
            accent: "emerald",
        },
        {
            label: "Attempts",
            value: submissions.length,
            icon: BarChart3,
            accent: "blue",
        },
        {
            label: "Mastered",
            value: solvedCount,
            icon: Award,
            accent: "primary",
        },
        {
            label: "Collections",
            value: playlistCount,
            icon: Clock,
            accent: "purple",
        },
    ];

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, i) => (
                <div
                    key={i}
                    className="group relative p-px rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/10">
                    <div className="absolute inset-0 bg-linear-to-br from-border via-transparent to-border/50" />

                    <div className="relative h-full bg-card/40  backdrop-blur-2xl rounded-[2.5rem] p-8 flex flex-col justify-between overflow-hidden">
                        <div
                            className={`absolute -right-6 -top-6 w-32 h-32 bg-${stat.accent}-500/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
                        />

                        <div className="flex items-center justify-between mb-8">
                            <div className="p-3.5 rounded-2xl bg-background border border-border group-hover:border-primary/50 group-hover:shadow-[0_0_15px_rgba(var(--primary-rgb),0.2)] transition-all duration-500">
                                <stat.icon className="w-6 h-6 text-primary" />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <h3 className="text-4xl font-man font-black tracking-tighter text-foreground group-hover:text-primary transition-colors italic">
                                {stat.value}
                            </h3>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">
                                {stat.label}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProfileStats;
