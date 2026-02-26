import CreateProblemForm from "@/modules/problems/components/create-problem-form";
import { getUserProfile } from "@/modules/profile/actions";
import { ShieldAlert, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

export default async function CreateProblemPage() {
    const response = await getUserProfile();

    if (response?.data?.role !== "ADMIN") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background p-6">
                <div className="text-center space-y-6 p-10 rounded-[2.5rem] border border-destructive/20 bg-destructive/5 backdrop-blur-2xl max-w-md w-full">
                    <ShieldAlert className="w-16 h-16 text-destructive mx-auto animate-pulse" />
                    <div className="space-y-2">
                        <h1 className="text-3xl font-man font-black uppercase italic text-destructive tracking-tighter">
                            Access Denied
                        </h1>
                        <p className="text-sm text-muted-foreground font-medium uppercase tracking-widest">
                            Administrator Clearance Required
                        </p>
                    </div>
                    <div className="pt-4">
                        <Link href="/problems">
                            <Button
                                variant="outline"
                                className="rounded-xl border-destructive/20 hover:bg-destructive/10 text-destructive font-bold uppercase italic text-xs tracking-widest gap-2">
                                <ArrowLeft className="size-4" /> Return to
                                Problems
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background relative overflow-x-hidden font-man">
            <header className="relative z-20 max-w-7xl mx-auto px-6 py-8 flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <Link href="/problems">
                        <Button
                            variant="outline"
                            size="icon"
                            className="rounded-xl border-border/40">
                            <ArrowLeft className="size-4" />
                        </Button>
                    </Link>
                </div>
                <div className="flex items-center gap-4">
                    <ThemeToggle />
                </div>
            </header>

            <main className="relative z-10 pb-20 max-w-7xl mx-auto px-6">
                <CreateProblemForm />
            </main>
        </div>
    );
}
