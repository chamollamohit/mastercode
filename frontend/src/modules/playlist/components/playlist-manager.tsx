"use client";

import { useState } from "react";
import { Plus, FolderHeart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PlaylistCard, Playlist } from "./playlist-card";
import CreatePlaylistModal from "./create-playlist";
import { createPlaylist } from "@/modules/playlist/actions";
import { toast } from "sonner";

export default function PlaylistManager({
    initialPlaylists,
}: {
    initialPlaylists: Playlist[];
}) {
    const [isOpen, setIsOpen] = useState(false);
    const handleCreate = async (data: {
        name: string;
        description: string;
    }) => {
        const res = await createPlaylist(data);
        if (res.success) {
            toast.success(res.message);
            setIsOpen(false);
        } else {
            toast.error(res.message || "Failed to create");
        }
    };

    return (
        <div className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-primary font-bold tracking-widest uppercase text-xs">
                        <FolderHeart className="w-4 h-4" /> Your Collections
                    </div>
                    <h1 className="text-4xl font-man font-black tracking-tight">
                        Curated Playlists
                    </h1>
                </div>

                <Button
                    onClick={() => setIsOpen(true)}
                    className="rounded-xl font-bold h-12 px-6 shadow-lg shadow-primary/20 gap-2">
                    <Plus className="w-5 h-5" /> New Playlist
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {initialPlaylists.length > 0 ? (
                    initialPlaylists.map((playlist) => (
                        <PlaylistCard
                            key={playlist.id}
                            playlist={playlist}
                        />
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center border-2 border-dashed border-border rounded-[2.5rem] bg-muted/5">
                        <p className="text-muted-foreground font-medium">
                            No playlists found. Start your journey by creating
                            one!
                        </p>
                    </div>
                )}
            </div>

            <CreatePlaylistModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onSubmit={handleCreate}
            />
        </div>
    );
}
