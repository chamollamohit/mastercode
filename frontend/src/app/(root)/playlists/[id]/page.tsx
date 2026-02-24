import { getPlaylistById } from "@/modules/playlist/actions";
import {
    Playlist,
    ProblemsInPlaylist,
} from "@/modules/playlist/components/playlist-card";
import ProblemTable from "@/modules/problems/components/problem-table";
import { FolderOpen, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function PlaylistDetailPage({
    params,
}: {
    params: { id: string };
}) {
    const { id } = await params;
    const res = await getPlaylistById(id);
    const playlist: Playlist = res.data;

    const problems = playlist.problems.map(
        (p: ProblemsInPlaylist) => p.problem,
    );

    return (
        <div className="container mx-auto py-10 px-4">
            <div className="mb-10 space-y-4">
                <Link
                    href="/playlists"
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm font-bold">
                    <ArrowLeft className="w-4 h-4" /> Back to Playlists
                </Link>

                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center border border-primary/20">
                        <FolderOpen className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-man font-black tracking-tight">
                            {playlist.name}
                        </h1>
                        <p className="text-muted-foreground">
                            {playlist.description}
                        </p>
                    </div>
                </div>
            </div>

            <ProblemTable
                problems={problems}
                mode="playlist"
            />
        </div>
    );
}
