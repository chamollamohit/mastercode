import { getUserProfile } from "@/modules/profile/actions/index";
import UserInfoCard from "@/modules/profile/components/user-info-card";
import ProfileStats from "@/modules/profile/components/profile-stat";
import SolvedProblems from "@/modules/profile/components/solved-problems";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Activity } from "lucide-react";
import { Playlist } from "@/modules/playlist/components/playlist-card";
import { Problem } from "@/modules/problems/components/problem-table";
import { User } from "@/components/provider/auth-provider";

export interface Submissions {
    userId: string;
    language: string;
    problemId: string;
    sourceCode: string;
    status: "ACCEPTED" | "REJECTED";
    stdin: string;
    stdout: string;
}

export interface SolvedProblems {
    id: string;
    problemId: Problem["id"];
    userId: User["id"];
    problem: Problem;
    createdAt: Date;
}

export interface UserDetails extends User {
    playlists: Playlist[];
    problems: Problem[];
    submissions: Submissions[];
    solvedProblems: SolvedProblems[];
}

export default async function ProfilePage() {
    const response = await getUserProfile();

    const { solvedProblems, submissions, ...userData }: UserDetails =
        response.data;

    return (
        <div className="container mx-auto py-10 px-4 max-w-7xl space-y-8 font-man">
            <UserInfoCard userData={userData} />

            <ProfileStats
                submissions={submissions}
                solvedCount={solvedProblems.length}
                playlistCount={userData.playlists.length}
            />

            <Tabs
                defaultValue="solved"
                className="w-full">
                <div className="flex items-center justify-between mb-8 border-b border-border/40 pb-4">
                    <TabsList className="bg-muted/50 p-1 rounded-2xl border border-border/40">
                        <TabsTrigger
                            value="solved"
                            className="rounded-xl gap-2 px-6 font-bold data-[state=active]:bg-background data-[state=active]:shadow-sm">
                            <Trophy className="w-4 h-4" /> Solved
                        </TabsTrigger>
                        <TabsTrigger
                            value="submissions"
                            className="rounded-xl gap-2 px-6 font-bold data-[state=active]:bg-background data-[state=active]:shadow-sm">
                            <Activity className="w-4 h-4" /> History
                        </TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent
                    value="solved"
                    className="mt-0 focus-visible:ring-0">
                    <SolvedProblems solvedProblems={solvedProblems} />
                </TabsContent>

                <TabsContent
                    value="submissions"
                    className="mt-0 focus-visible:ring-0">
                    <div className="p-12 text-center bg-card/20 rounded-[2rem] border-2 border-dashed border-border/40">
                        <p className="text-muted-foreground font-medium">
                            Detailed submission history coming soon.
                        </p>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
