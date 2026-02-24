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
            className={`group relative bg-card/40 backdrop-blur-xl border border-border/50 rounded-[2.5rem] p-7 hover:border-primary/40 transition-all duration-500 ${
                isDeleting ? "opacity-50 grayscale pointer-events-none" : ""
            }`}>
            <div className="absolute inset-0 overflow-hidden rounded-[2.5rem] pointer-events-none">
                <div className="absolute -right-12 -top-12 w-40 h-40 bg-primary/10 blur-[60px] rounded-full group-hover:bg-primary/20 transition-all duration-700" />
            </div>

            <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-8">
                    <div className="w-14 h-14 rounded-4xl bg-background border border-border/50 flex items-center justify-center group-hover:border-primary/50 transition-all duration-500 shadow-inner">
                        <ListOrdered className="w-7 h-7 text-primary" />
                    </div>

                    <DropdownMenu modal={false}>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="relative z-50 rounded-full hover:bg-muted/50 transition-colors">
                                <MoreVertical className="w-5 h-5 text-muted-foreground" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align="end"
                            sideOffset={8}
                            className="z-100 rounded-2xl p-2 min-w-40 bg-popover shadow-2xl border border-border/50">
                            <DropdownMenuItem
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete();
                                }}
                                className="text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer font-bold rounded-xl p-3">
                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                                Playlist
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div className="space-y-3 mb-8">
                    <h3 className="text-2xl font-man font-black tracking-tight group-hover:text-primary transition-colors">
                        {playlist.name}
                    </h3>
                    <p className="text-sm text-muted-foreground/80 leading-relaxed line-clamp-2 min-h-10 font-medium">
                        {playlist.description ||
                            "No description provided for this collection."}
                    </p>
                </div>

                <div className="mt-auto pt-6 border-t border-border/20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                            <div className="w-6 h-6 rounded-full border-2 border-background bg-muted flex items-center justify-center overflow-hidden">
                                <BookOpen className="w-3 h-3 text-primary/60" />
                            </div>
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">
                            {playlist.problems.length} Problems
                        </span>
                    </div>

                    <Button
                        size="sm"
                        variant="secondary"
                        className="rounded-xl font-bold gap-2 px-5 py-5 hover:bg-primary hover:text-primary-foreground transition-all">
                        {isDeleting ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <>
                                <Play className="w-3 h-3 fill-current" />
                                <span>Start</span>
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}
