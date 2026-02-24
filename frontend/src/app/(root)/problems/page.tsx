import ProblemsTable from "@/modules/problems/components/problem-table";

import { getAllProblems } from "@/modules/problems/actions";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Code Arena | MasterCode",
    description:
        "Browse hundreds of coding challenges across various topics like Arrays, DP, and Graphs.",
};

const ProblemPage = async () => {
    const data = await getAllProblems();
    const problems = data.success ? data.data : [];

    if (!data.success) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <h2 className="text-2xl font-bold">
                    Unable to load challenges
                </h2>
                <p className="text-muted-foreground">Please try again later.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-15">
            <ProblemsTable problems={problems} />
        </div>
    );
};

export default ProblemPage;
