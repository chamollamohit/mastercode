"use client";

import { useState } from "react";
import {
    Play,
    MoreVertical,
    ListOrdered,
    Trash2,
    Loader2,
    BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { deletePlaylist } from "@/modules/playlist/actions";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Problem } from "@/modules/problems/components/problem-table";
import { useRouter } from "next/navigation";

export interface Playlist {
    id: string;
    name: string;
    description: string;
    updatedAt: Date;
    problems: ProblemsInPlaylist[];
}

export interface ProblemsInPlaylist {
    id: string;
    playlistId: string;
    problemId: string;
    problem: Problem;
}

export function PlaylistCard({ playlist }: { playlist: Playlist }) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        const res = await deletePlaylist(playlist.id);
        if (res.success) {
            setIsDeleting(false);
            toast.success("Playlist deleted successfully");
        } else {
            toast.error(res.message || "Failed to delete");
            setIsDeleting(false);
        }
    };

    return (
        <div
            className={`group relative bg-card border border-border rounded-3xl p-5 hover:border-primary/50 hover:shadow-md transition-all duration-300 ${
                isDeleting ? "opacity-50 grayscale pointer-events-none" : ""
            }`}>
            <div className="relative z-10 flex flex-col gap-4">
                {/* Header: Icon and Dropdown */}
                <div className="flex justify-between items-center">
                    <div className="w-10 h-10 rounded-xl bg-muted border border-border flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                        <ListOrdered className="w-5 h-5 text-primary" />
                    </div>

                    <DropdownMenu modal={false}>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-lg hover:bg-muted transition-colors">
                                <MoreVertical className="w-4 h-4 text-muted-foreground" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align="end"
                            sideOffset={4}
                            className="z-100 rounded-xl p-1 min-w-32 bg-popover border border-border shadow-xl">
                            <DropdownMenuItem
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete();
                                }}
                                className="text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer font-bold rounded-lg py-2 text-xs">
                                <Trash2 className="mr-2 h-3.5 w-3.5" /> Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {/* Content: Title and Description */}
                <div className="space-y-1">
                    <h3 className="text-lg font-bold tracking-tight text-foreground line-clamp-1">
                        {playlist.name}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-1 font-medium">
                        {playlist.description || "No description provided."}
                    </p>
                </div>

                {/* Footer: Stats and Action */}
                <div className="flex items-center justify-between pt-3 border-t border-border/50">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">
                            {playlist.problems.length} Problems
                        </span>
                    </div>

                    <Button
                        size="sm"
                        onClick={() => router.push(`/playlists/${playlist.id}`)}
                        className="rounded-lg font-bold h-8 px-4 bg-primary text-primary-foreground hover:opacity-90 transition-all text-xs">
                        {isDeleting ? (
                            <Loader2 className="h-3 w-3 animate-spin" />
                        ) : (
                            <div className="flex items-center gap-1.5">
                                <Play className="w-3 h-3 fill-current" />
                                <span>Open</span>
                            </div>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}
