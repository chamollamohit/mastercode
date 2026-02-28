"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
    Bookmark,
    TrashIcon,
    Search,
    CheckCircle2,
    Circle,
    ChevronLeft,
    ChevronRight,
    Hash,
    Terminal,
    Plus,
    BookmarkCheck,
    Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/components/provider/auth-provider";
import CreatePlaylistModal from "@/modules/playlist/components/create-playlist";
import {
    addToPlaylist,
    createPlaylist,
    removeProblemFromPlaylist,
} from "@/modules/playlist/actions";
import { toast } from "sonner";
import AddToPlaylistModal from "@/modules/playlist/components/add-to-playlist";
import { useParams, useRouter } from "next/navigation";
import { deleteProblemById } from "../actions";

export interface Problem {
    id: string;
    title: string;
    tags: string[];
    difficulty: string;
    description: string;
    codeSnippets: { JAVA: string; PYTHON: string; JAVASCRIPT: string }[];
    testCases: { input: string; output: string }[];
    examples: { input: string; output: string; explanation: string }[];
    constraints: string[];
    refrencedSolutions: { JAVA: string; PYTHON: string; JAVASCRIPT: string }[];
    editorial: string;
    hints: string[];
    solvedBy?: {
        id: string;
        userId: string;
        problemId: string;
    }[];
}

interface ProblemTableProps {
    problems: Problem[];
    mode?: "default" | "playlist";
}

const ProblemsTable = ({ problems, mode = "default" }: ProblemTableProps) => {
    const router = useRouter();
    const { user } = useAuth();
    const [search, setSearch] = useState("");
    const [difficulty, setDifficulty] = useState("ALL");
    const [currentPage, setCurrentPage] = useState(1);
    const [isPlaylistModalOpen, setIsPlaylistModalOpen] = useState(false);
    const [isAddToPlaylistModalOpen, setIsAddToPlaylistModalOpen] =
        useState(false);
    const [selectedProblemId, setSelectedProblemId] = useState("");
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const problemPerPage = 8;
    const { id: playlistId } = useParams();

    const { filteredProblems, totalPagesCount } = useMemo(() => {
        const filtered = problems.filter((p) => {
            const matchDiff =
                difficulty === "ALL" || p.difficulty === difficulty;
            const matchSearch = p.title
                .toLowerCase()
                .includes(search.toLowerCase());
            return matchDiff && matchSearch;
        });

        const start = (currentPage - 1) * problemPerPage;

        return {
            filteredProblems: filtered.slice(start, start + problemPerPage),
            totalPagesCount: Math.ceil(filtered.length / problemPerPage),
        };
    }, [difficulty, problems, search, problemPerPage, currentPage]);

    const getDifficultyStyles = (diff: string) => {
        switch (diff.toUpperCase()) {
            case "EASY":
                return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20 shadow-[0_0_15px_-3px_rgba(16,185,129,0.3)]";
            case "MEDIUM":
                return "bg-amber-500/10 text-amber-500 border-amber-500/20 shadow-[0_0_15px_-3px_rgba(245,158,11,0.3)]";
            case "HARD":
                return "bg-rose-500/10 text-rose-500 border-rose-500/20 shadow-[0_0_15px_-3px_rgba(244,63,94,0.3)]";
            default:
                return "bg-slate-500/10 text-slate-500 border-slate-500/20";
        }
    };

    const handleCreatePlaylist = async (data: {
        name: string;
        description: string;
    }) => {
        const res = await createPlaylist(data);
        if (!res.success) {
            toast.error(res.message);
        }
        toast.success(res.message);
    };

    const handleAddToPlaylist = async (playlistId: string) => {
        const res = await addToPlaylist(selectedProblemId, playlistId);

        if (!res.success) {
            toast.error(res.message);
        }
        toast.success(res.message);
    };

    const handleRemoveFromPlaylist = async (problemId: string) => {
        setDeletingId(problemId);
        const res = await removeProblemFromPlaylist(
            playlistId as string,
            problemId,
        );

        if (res.success) {
            toast.success(res.message);
            setDeletingId(null);
        } else {
            toast.error(res.message);
            setDeletingId(null);
        }
    };

    const deleteProblem = async (problemId: string) => {
        setDeletingId(problemId);
        const res = await deleteProblemById(problemId);
        console.log(res);

        if (res.success) {
            toast.success(res.message);
            setDeletingId(null);
        } else {
            toast.error(res.message);
            setDeletingId(null);
        }
    };

    return (
        <div className="w-full max-w-full mx-auto overflow-x-hidden space-y-8 p-6 font-mont relative">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-6">
                {mode === "default" ? (
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-primary font-man font-bold text-xs uppercase tracking-[0.2em]">
                            <Terminal className="w-4 h-4" />
                            Curated Problems
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black font-man tracking-tight">
                            Code{" "}
                            <span className="text-primary italic">Arena</span>
                        </h1>
                    </div>
                ) : null}

                <div className="flex items-center gap-3 bg-card/30 backdrop-blur-md p-2 rounded-2xl border border-border/40 shadow-sm">
                    <div className="flex flex-1 items-center gap-3 bg-card/30 backdrop-blur-md p-1 rounded-2xl ">
                        <div className="relative flex-1 min-w-0">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search by title..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-9 bg-transparent border-none focus-visible:ring-0 text-sm w-full"
                            />
                        </div>
                        <div className="h-8 w-px bg-border/40 mx-1 shrink-0" />
                        <Select
                            value={difficulty}
                            onValueChange={setDifficulty}>
                            <SelectTrigger className="w-32 border-none bg-transparent focus:ring-0 font-man font-bold text-xs uppercase shrink-0">
                                <SelectValue placeholder="Level" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ALL">All Levels</SelectItem>
                                <SelectItem value="EASY">Easy</SelectItem>
                                <SelectItem value="MEDIUM">Medium</SelectItem>
                                <SelectItem value="HARD">Hard</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                {mode === "default" ? (
                    <Button
                        className="gap-2"
                        onClick={() => setIsPlaylistModalOpen(true)}>
                        <Plus className="h-4 w-4" />
                        Create Playlist
                    </Button>
                ) : null}
            </div>
            <div className="relative group">
                <div className="rounded-[2rem] border border-border bg-card/20 backdrop-blur-xl overflow-x-auto shadow-xl">
                    <Table>
                        <TableHeader className="bg-muted/30">
                            <TableRow className="hover:bg-transparent border-border/40">
                                <TableHead className="w-25 text-center font-man font-bold uppercase text-[10px] tracking-widest py-6">
                                    Status
                                </TableHead>
                                <TableHead className="font-man font-bold uppercase text-[10px] tracking-widest">
                                    Problem Title
                                </TableHead>
                                <TableHead className="font-man font-bold uppercase text-[10px] tracking-widest">
                                    Topic Tags
                                </TableHead>
                                <TableHead className="w-37.5 font-man font-bold uppercase text-[10px] tracking-widest">
                                    Difficulty
                                </TableHead>
                                <TableHead className="w-25 text-center px-8 font-man font-bold uppercase text-[10px] tracking-widest">
                                    Action
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredProblems && filteredProblems.length > 0 ? (
                                filteredProblems?.map((problem, index) => (
                                    <TableRow
                                        key={problem.id}
                                        className={`group border-border/20 hover:bg-linear-to-r hover:from-primary/3 hover:to-transparent transition-all duration-300 ${
                                            deletingId === problem.id
                                                ? "opacity-50 grayscale pointer-events-none"
                                                : ""
                                        }`}>
                                        <TableCell className="text-center">
                                            {problem.solvedBy?.some(
                                                (u) => u.userId === user?.id,
                                            ) ? (
                                                <CheckCircle2 className="h-5 w-5 text-emerald-500 mx-auto drop-shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                                            ) : (
                                                <Circle className="h-5 w-5 text-muted-foreground/20 mx-auto group-hover:text-primary/40 transition-colors" />
                                            )}
                                        </TableCell>

                                        <TableCell>
                                            <Link
                                                href={`/problem/${problem.id}`}
                                                className="flex items-center gap-3 group/link">
                                                <span className="text-[10px] font-man font-bold text-muted-foreground/30 group-hover/link:text-primary/60 transition-colors">
                                                    {String(index + 1).padStart(
                                                        2,
                                                        "0",
                                                    )}
                                                </span>
                                                <span className="font-bold text-foreground group-hover/link:text-primary transition-colors">
                                                    {problem.title}
                                                </span>
                                            </Link>
                                        </TableCell>

                                        <TableCell>
                                            <div className="flex gap-2">
                                                {problem.tags
                                                    ?.slice(0, 2)
                                                    .map((tag: string) => (
                                                        <Badge
                                                            key={tag}
                                                            className="bg-primary/5 text-primary border-primary/10 hover:bg-primary/10 px-2 py-0 text-[10px] font-medium">
                                                            <Hash className="w-2 h-2 mr-1" />
                                                            {tag}
                                                        </Badge>
                                                    ))}
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <Badge
                                                className={`${getDifficultyStyles(problem.difficulty)} border px-3 py-1 rounded-full font-semibold text-[9px] tracking-tighter`}>
                                                {problem.difficulty.toUpperCase()}
                                            </Badge>
                                        </TableCell>

                                        <TableCell className="text-right px-8">
                                            <div className="flex justify-end gap-2 md:opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                                                {user?.role === "ADMIN" && (
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-destructive/60 hover:text-destructive hover:bg-destructive/10"
                                                        disabled={
                                                            deletingId ===
                                                            problem.id
                                                        }
                                                        onClick={() =>
                                                            deleteProblem(
                                                                problem.id,
                                                            )
                                                        }>
                                                        {deletingId ===
                                                        problem.id ? (
                                                            <Loader2 className="h-4 w-4 bg-pr text-black animate-spin" />
                                                        ) : (
                                                            <TrashIcon className="h-4 w-4" />
                                                        )}
                                                    </Button>
                                                )}
                                                {mode === "default" ? (
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => {
                                                            setSelectedProblemId(
                                                                problem.id,
                                                            );
                                                            setIsAddToPlaylistModalOpen(
                                                                true,
                                                            );
                                                        }}
                                                        className="h-8 w-8 text-primary hover:bg-primary/10">
                                                        <Bookmark className="h-4 w-4 bg-pr" />
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        disabled={
                                                            deletingId ===
                                                            problem.id
                                                        }
                                                        onClick={() =>
                                                            handleRemoveFromPlaylist(
                                                                problem.id,
                                                            )
                                                        }
                                                        className="h-8 w-8 text-primary hover:bg-primary/10">
                                                        {deletingId ===
                                                        problem.id ? (
                                                            <Loader2 className="h-4 w-4 bg-pr text-black animate-spin" />
                                                        ) : (
                                                            <BookmarkCheck className="h-4 w-4 bg-pr" />
                                                        )}
                                                    </Button>
                                                )}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={5}
                                        className="h-64 text-center">
                                        <div className="flex flex-col items-center justify-center space-y-3 opacity-60">
                                            <Terminal className="h-10 w-10 text-muted-foreground/40" />
                                            <p className="font-man font-bold uppercase text-[10px] tracking-[0.2em]">
                                                No problems found{" "}
                                                {mode === "playlist"
                                                    ? "in this playlist"
                                                    : "here"}
                                            </p>
                                            <Button
                                                variant="link"
                                                size="sm"
                                                onClick={() =>
                                                    mode === "default"
                                                        ? router.push(
                                                              "/problems",
                                                          )
                                                        : router.push(
                                                              "/playlists",
                                                          )
                                                }
                                                className="text-primary text-[10px] uppercase font-black">
                                                Browse{" "}
                                                {mode === "default"
                                                    ? "Arena"
                                                    : "Playlist"}
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            <div className="flex items-center justify-between px-2">
                <div className="text-[10px] font-man font-bold uppercase tracking-widest text-muted-foreground/60">
                    Showing{" "}
                    <span className="text-foreground">
                        {currentPage} - {totalPagesCount}
                    </span>{" "}
                    of {filteredProblems?.length} Results
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                            setCurrentPage((prev) =>
                                prev !== 1 ? prev + -1 : prev,
                            )
                        }
                        className="rounded-full hover:bg-primary/10">
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <div className="flex gap-1 items-center px-4">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        <span className="h-1.5 w-1.5 rounded-full bg-primary/20" />
                        <span className="h-1.5 w-1.5 rounded-full bg-primary/20" />
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                            setCurrentPage((prev) =>
                                prev < totalPagesCount ? prev + 1 : prev,
                            )
                        }
                        className="rounded-full hover:bg-primary/10">
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
            <CreatePlaylistModal
                isOpen={isPlaylistModalOpen}
                onClose={() => setIsPlaylistModalOpen(false)}
                onSubmit={handleCreatePlaylist}
            />
            <AddToPlaylistModal
                isOpen={isAddToPlaylistModalOpen}
                onClose={() => setIsAddToPlaylistModalOpen(false)}
                onSubmit={handleAddToPlaylist}
            />
        </div>
    );
};

export default ProblemsTable;
