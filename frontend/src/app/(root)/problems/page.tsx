import ProblemsTable from "@/modules/problems/components/problem-table";

import { getAllProblems } from "@/modules/problems/actions";

const ProblemPage = async () => {
    const data = await getAllProblems();
    const problems = data.success ? data.data : [];

    return (
        <div className="container mx-auto py-20">
            <ProblemsTable problems={problems} />
        </div>
    );
};

export default ProblemPage;
