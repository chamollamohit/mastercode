import { getAllPlaylist } from "@/modules/playlist/actions";
import PlaylistManager from "@/modules/playlist/components/playlist-manager";

export default async function PlaylistsPage() {
    const data = await getAllPlaylist();

    const playlists = data.data || [];

    return (
        <div className="container mx-auto py-10 px-4">
            <PlaylistManager initialPlaylists={playlists} />
        </div>
    );
}
