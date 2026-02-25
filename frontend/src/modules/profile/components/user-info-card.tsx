import { User, Mail, Calendar, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User as UserType } from "@/components/provider/auth-provider";
import { useMemo } from "react";
import { formatDate } from "date-fns";

const UserInfoCard = ({ userData }: { userData: UserType }) => {
    const initials =
        userData?.name
            ?.split(" ")
            .map((n) => n[0])
            .join("")
            .slice(0, 2)
            .toUpperCase() || "??";

    return (
        <Card className="relative overflow-hidden bg-card/40 backdrop-blur-2xl border-white/10 rounded-[2.5rem] shadow-2xl">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 blur-[80px] rounded-full " />

            <CardContent className="p-8 md:p-10 relative z-10">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
                    <div className="relative ">
                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl scale-90" />
                        <Avatar className="w-32 h-32 border-[6px] border-background shadow-xl relative z-10">
                            <AvatarFallback className="text-3xl font-black bg-linear-to-br from-primary/20 to-secondary/20 text-primary">
                                {initials}
                            </AvatarFallback>
                        </Avatar>

                        <div className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground rounded-2xl p-2.5 border-4 border-background shadow-lg z-20">
                            {userData.role === "ADMIN" ? (
                                <ShieldCheck className="w-5 h-5" />
                            ) : (
                                <User className="w-5 h-5" />
                            )}
                        </div>
                    </div>

                    <div className="flex-1 text-center md:text-left space-y-6">
                        <div className="space-y-2">
                            <div className="flex flex-wrap justify-center md:justify-start items-center gap-4">
                                <h1 className="text-4xl md:text-5xl font-black tracking-tight bg-linear-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
                                    {userData.name}
                                </h1>
                                <Badge
                                    className={`rounded-xl px-4 py-1 text-xs font-black uppercase tracking-widest border-2 ${
                                        userData.role === "ADMIN"
                                            ? "bg-destructive/10 text-destructive border-destructive/20"
                                            : "bg-primary/10 text-primary border-primary/20"
                                    }`}>
                                    {userData.role}
                                </Badge>
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-center md:justify-start gap-4">
                            <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-muted/30 border border-border/50">
                                <Mail className="w-4 h-4 text-muted-foreground transition-colors" />
                                <span className="text-sm font-bold text-muted-foreground">
                                    {userData.email}
                                </span>
                            </div>

                            <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-muted/30 border border-border/50">
                                <Calendar className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm font-bold text-muted-foreground">
                                    Joined On{" "}
                                    {formatDate(userData.createdAt, "MMM yyyy")}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default UserInfoCard;
