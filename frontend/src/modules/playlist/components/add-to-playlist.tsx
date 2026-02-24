"use client";

import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ListPlus, FolderPlus, Loader2, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { getAllPlaylist } from "../actions";

type PlaylistType = {
    id: string;
    name: string;
    description: string;
};

const AddToPlaylistModal = ({
    isOpen,
    onClose,
    onSubmit,
}: {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (playlistId: string) => void;
}) => {
    const [playlists, setPlaylists] = useState<PlaylistType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        const loadPlaylists = async () => {
            setIsFetching(true);

            const response = await getAllPlaylist();

            if (!response.success) {
                setIsFetching(false);
                toast.error("Failed to load playlists");
            }
            setPlaylists(response.data);
            setIsFetching(false);
        };

        if (isOpen) {
            loadPlaylists();
        }
    }, [isOpen]);

    const handleAddToPlaylist = async (playlistId: string) => {
        setIsLoading(true);
        await onSubmit(playlistId);
        setIsLoading(false);
        onClose();
    };

    return (
        <Dialog
            open={isOpen}
            onOpenChange={onClose}>
            <DialogContent className="sm:max-w-105 p-0 overflow-hidden border-none bg-background shadow-2xl rounded-[1.5rem]">
                <div className="pt-8 pb-4 px-8">
                    <DialogHeader className="flex flex-row items-center gap-4 space-y-0">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                            <FolderPlus className="w-6 h-6" />
                        </div>
                        <div>
                            <DialogTitle className="text-xl font-bold tracking-tight">
                                Save To Playlist
                            </DialogTitle>
                            <DialogDescription className="text-xs font-medium">
                                Choose a playlist for this problem
                            </DialogDescription>
                        </div>
                    </DialogHeader>
                </div>
                <div className="p-6 pt-0">
                    <ScrollArea className="max-h-80 w-full pr-4 mt-2">
                        {isFetching ? (
                            <div className="flex flex-col items-center justify-center py-12 space-y-3">
                                <Loader2 className="h-8 w-8 animate-spin text-primary/40" />
                                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                                    Loading Collections
                                </p>
                            </div>
                        ) : playlists.length > 0 ? (
                            <div className="grid gap-2 pb-4">
                                {playlists.map((playlist) => (
                                    <button
                                        key={playlist.id}
                                        onClick={() =>
                                            handleAddToPlaylist(playlist.id)
                                        }
                                        disabled={!!isLoading}
                                        className="flex items-center justify-between p-4 rounded-2xl border border-border/50 bg-muted/20 hover:bg-primary/5 hover:border-primary/30 transition-all group text-left">
                                        <div className="space-y-1">
                                            <h3 className="font-bold text-sm group-hover:text-primary transition-colors">
                                                {playlist.name}
                                            </h3>
                                            <p className="text-[11px] text-muted-foreground font-medium line-clamp-1">
                                                {playlist.description ||
                                                    "No description provided"}
                                            </p>
                                        </div>
                                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-background border group-hover:border-primary/50 transition-all">
                                            {isLoading ? (
                                                <Loader2 className="h-4 w-4 animate-spin text-primary" />
                                            ) : (
                                                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-10 space-y-4">
                                <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                                    <ListPlus className="w-6 h-6 text-muted-foreground" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-bold">
                                        No Playlists Found
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        Start by creating your first collection.
                                    </p>
                                </div>
                                <Button
                                    variant="outline"
                                    className="rounded-xl font-bold text-xs h-9"
                                    onClick={onClose}>
                                    Create New Playlist
                                </Button>
                            </div>
                        )}
                    </ScrollArea>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AddToPlaylistModal;
