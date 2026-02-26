import CreateProblemForm from "@/modules/problems/components/create-problem-form";

export default function CreateProblemPage() {
    return (
        <div className="min-h-screen bg-background relative overflow-x-hidden">
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] bg-size-[32px_32px] opacity-40" />
                <div className="absolute top-0 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 -right-24 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px]" />
            </div>
            <main className="pb-20">
                <CreateProblemForm />
            </main>
        </div>
    );
}
