"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, ListPlus, TextQuote, Type } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const playlistSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z
        .string()
        .min(1, "Description is required")
        .max(300, "Description is too long"),
});

type PlaylistFormType = z.infer<typeof playlistSchema>;

const CreatePlaylistModal = ({
    isOpen,
    onClose,
    onSubmit,
}: {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: PlaylistFormType) => void;
}) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<PlaylistFormType>({
        resolver: zodResolver(playlistSchema),
    });

    const handleFormSubmit = async (data: PlaylistFormType) => {
        await onSubmit(data);
        reset();
        onClose();
    };

    return (
        <Dialog
            open={isOpen}
            onOpenChange={onClose}>
            <DialogContent className="sm:max-w-120 p-0 overflow-hidden border-none bg-background shadow-2xl rounded-[1.5rem]">
                <div className="from-primary/10 to-transparent pt-8 pb-6 px-8 border-b border-border/50">
                    <DialogHeader className="space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20">
                                <ListPlus className="w-5 h-5" />
                            </div>
                            <div>
                                <DialogTitle className="text-xl font-bold tracking-tight">
                                    New Playlist
                                </DialogTitle>
                                <DialogDescription className="text-xs font-medium">
                                    Organize your favorite problems into custom
                                    playlist.
                                </DialogDescription>
                            </div>
                        </div>
                    </DialogHeader>
                </div>

                <form
                    onSubmit={handleSubmit(handleFormSubmit)}
                    className="p-8 space-y-6">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 mb-1">
                            <Label
                                htmlFor="name"
                                className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                Playlist Name
                            </Label>
                        </div>
                        <Input
                            id="name"
                            {...register("name")}
                            placeholder="e.g., Dynamic Programming Mastery"
                            className={`rounded-xl border-border bg-muted/30 focus:bg-background transition-all h-11 ${
                                errors.name
                                    ? "border-destructive ring-destructive/20"
                                    : "focus:ring-primary/20"
                            }`}
                        />
                        {errors.name && (
                            <p className="text-[11px] font-medium text-destructive ml-1">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center gap-2 mb-1">
                            <Label
                                htmlFor="description"
                                className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                Short Description
                            </Label>
                        </div>
                        <Textarea
                            id="description"
                            {...register("description")}
                            placeholder="What's the goal of this collection?"
                            className={`rounded-xl border-border bg-muted/30 focus:bg-background transition-all min-h-25 resize-none ${
                                errors.description
                                    ? "border-destructive ring-destructive/20"
                                    : "focus:ring-primary/20"
                            }`}
                        />
                        {errors.description && (
                            <p className="text-[11px] font-medium text-destructive ml-1">
                                {errors.description.message}
                            </p>
                        )}
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                reset();
                                onClose();
                            }}
                            disabled={isSubmitting}
                            className="flex-1 rounded-xl h-11 font-semibold border-border ">
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-2 rounded-xl h-11 font-bold shadow-md hover:shadow-lg transition-all active:scale-[0.98]">
                            {isSubmitting ? (
                                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            ) : (
                                "Create Playlist"
                            )}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreatePlaylistModal;
