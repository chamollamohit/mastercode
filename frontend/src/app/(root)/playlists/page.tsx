import { getAllPlaylist } from "@/modules/playlist/actions";
import PlaylistManager from "@/modules/playlist/components/playlist-manager";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function PlaylistsPage() {
    const data = await getAllPlaylist();

    const playlists = data.data || [];

    return (
        <div className="container mx-auto py-10 px-4">
            <div className="mb-10 space-y-4">
                <Link
                    href="/problems"
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm font-bold">
                    <ArrowLeft className="w-4 h-4" /> Back to Problems
                </Link>
                <PlaylistManager initialPlaylists={playlists} />
            </div>
        </div>
    );
}
