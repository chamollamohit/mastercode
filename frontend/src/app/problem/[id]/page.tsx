"use client";

import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Play,
    FileText,
    Lightbulb,
    Trophy,
    ArrowLeft,
    Loader2,
    Zap,
    Activity,
    Terminal,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { getJudge0LanguageId } from "@/lib/judge0";
import { toast } from "sonner";
import {
    executeCode,
    getAllSubmissionByCurrentUserForProblem,
    getProblemById,
} from "@/modules/problems/actions";
import { TestCaseTable } from "@/modules/problems/components/test-case-table";
import { SubmissionHistory } from "@/modules/profile/components/submission-history";
import { useNextTheme } from "@space-man/react-theme-animation";
import { useRouter } from "next/navigation";

export type Difficulty = "EASY" | "MEDIUM" | "HARD";
export type Language = "JAVASCRIPT" | "JAVA" | "PYTHON";

export interface Example {
    input: string;
    output: string;
    explanation?: string;
}

export interface Problem {
    id: string;
    title: string;
    description: string;
    difficulty: Difficulty;
    tags: string[];
    constraints: string[];
    hints: string[];
    editorial?: string;
    examples: Example[];
    testCases: Array<{ input: string; output: string }>;
    codeSnippets: Record<Language, string>;
}

export interface ExecutionResult {
    id: string;
    language: string;
    memory: string[];
    problemId: string;
    sourceCode: string;
    status: "REJECTED" | "ACCEPTED";
    testCases: Array<{
        id: string;
        passed: boolean;
        time: string;
        stdout: string;
        expected: string;
        input: string;
        output: string;
        expectedOutput: string;
        status: string;
        runtime: string;
        memory: string;
    }>;
}

const getDifficultyColor = (difficulty: Difficulty) => {
    switch (difficulty) {
        case "EASY":
            return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
        case "MEDIUM":
            return "bg-amber-500/10 text-amber-500 border-amber-500/20";
        case "HARD":
            return "bg-red-500/10 text-red-500 border-red-500/20";
        default:
            return "bg-muted text-muted-foreground";
    }
};

const ProblemIdPage = ({ params }: { params: Promise<{ id: string }> }) => {
    const router = useRouter();
    const [problem, setProblem] = useState<Problem | null>(null);
    const [selectedLanguage, setSelectedLanguage] =
        useState<Language>("JAVASCRIPT");
    const [code, setCode] = useState<string>("");
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [submissionHistory, setSubmissionHistory] = useState([]);
    const [executionResponse, setExecutionResponse] =
        useState<ExecutionResult | null>(null);
    const { theme } = useNextTheme();

    useEffect(() => {
        const initPage = async () => {
            const resolvedParams = await params;
            const [problemRes, historyRes] = await Promise.all([
                getProblemById(resolvedParams.id),
                getAllSubmissionByCurrentUserForProblem(resolvedParams.id),
            ]);

            if (problemRes.success && problemRes.data) {
                const data = problemRes.data as Problem;
                setProblem(data);
                if (!code) {
                    setCode(data.codeSnippets[selectedLanguage] || "");
                }
            }
            if (historyRes.success) setSubmissionHistory(historyRes.data);
        };
        initPage();
    }, [params]);

    const handleRun = async () => {
        if (!problem) return;

        setIsRunning(true);
        const language_id = getJudge0LanguageId(selectedLanguage);
        const stdin = problem.testCases.map((tc) => tc.input);
        const expected_outputs = problem.testCases.map((tc) => tc.output);
        const currentCode = code;
        const res = await executeCode({
            code: currentCode,
            language_id,
            stdin,
            expected_outputs,
            problemId: problem.id,
        });

        setExecutionResponse(res.data);
        if (res.success) {
            setIsRunning(false);
            toast.success("Execution Complete");
        } else {
            toast.error(res.message);
            setIsRunning(false);
        }
    };

    if (!problem)
        return (
            <div className="h-screen flex items-center justify-center bg-background">
                <Loader2 className="animate-spin size-8 text-primary" />
            </div>
        );

    return (
        <div className="min-h-screen bg-background font-man transition-colors duration-300">
            <div className="max-w-400 mx-auto p-4 lg:p-8">
                <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                        <Button
                            onClick={() => router.back()}
                            variant="outline"
                            size="icon"
                            className="rounded-xl border-border/40">
                            <ArrowLeft className="size-4" />
                        </Button>
                        <div className="space-y-1">
                            <div className="flex items-center gap-3">
                                <h1 className="text-3xl font-black uppercase">
                                    {problem.title}
                                </h1>
                                <Badge
                                    variant="outline"
                                    className={cn(
                                        "px-3 py-0.5 font-black text-[10px]",
                                        getDifficultyColor(problem.difficulty),
                                    )}>
                                    {problem.difficulty}
                                </Badge>
                            </div>
                            <div className="flex gap-2">
                                {problem.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-[10px] font-bold uppercase bg-secondary rounded-lg p-1 tracking-widest text-muted-foreground/50">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="px-4 py-2 rounded-xl bg-muted/30 border border-border/40 flex items-center gap-3">
                            <Activity className="size-4 text-primary" />
                            <span className="text-xs font-black uppercase tracking-widest">
                                Arena Status: Live
                            </span>
                        </div>
                        <ThemeToggle />
                    </div>
                </header>

                <div className="grid lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-5 space-y-6">
                        <Card className="bg-card/20 backdrop-blur-xl border-border/40 rounded-[2rem] overflow-hidden">
                            <Tabs
                                defaultValue="desc"
                                className="w-full">
                                <TabsList className="w-full justify-start h-14 bg-muted/20 border-b border-border/20 rounded-none px-6 gap-8">
                                    <TabsTrigger
                                        value="desc"
                                        className="data-[state=active]:bg-transparent data-[state=active]:text-primary font-black uppercase text-[10px] tracking-widest gap-2">
                                        <FileText className="size-3" />{" "}
                                        Description
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="history"
                                        className="data-[state=active]:bg-transparent data-[state=active]:text-primary font-black uppercase text-[10px] tracking-widest gap-2">
                                        <Trophy className="size-3" /> My Logs
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="intel"
                                        className="data-[state=active]:bg-transparent data-[state=active]:text-primary font-black uppercase text-[10px] tracking-widest gap-2">
                                        <Lightbulb className="size-3" /> Intel
                                    </TabsTrigger>
                                </TabsList>

                                <ScrollArea className="h-[calc(100vh-250px)]">
                                    <TabsContent
                                        value="desc"
                                        className="p-8 mt-0 space-y-8">
                                        <div className="prose prose-zinc dark:prose-invert max-w-none">
                                            <p className="text-lg leading-relaxed text-foreground/80">
                                                {problem.description}
                                            </p>
                                        </div>

                                        <div className="space-y-4">
                                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary">
                                                Examples
                                            </h3>
                                            {problem.examples.map(
                                                (example, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="group relative p-6 rounded-2xl bg-muted/30 border border-border/40 space-y-4">
                                                        <span className="absolute right-4 top-4 text-xs font-black text-muted-foreground/20 ">
                                                            0{idx + 1}
                                                        </span>
                                                        <div className="space-y-2">
                                                            <p className="text-[10px] font-black uppercase tracking-widest text-amber-500/60">
                                                                Input Signal
                                                            </p>
                                                            <code className="block p-3 rounded-lg bg-secondary text-emerald-500 font-mono text-sm">
                                                                {example.input}
                                                            </code>
                                                        </div>
                                                        <div className="space-y-2">
                                                            <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500/60">
                                                                Expected Output
                                                            </p>
                                                            <code className="block p-3 rounded-lg bg-secondary text-primary font-mono text-sm">
                                                                {example.output}
                                                            </code>
                                                        </div>
                                                        {example.explanation && (
                                                            <p className="text-xs text-muted-foreground leading-relaxed  border-l-2 border-primary/20 pl-4">
                                                                {
                                                                    example.explanation
                                                                }
                                                            </p>
                                                        )}
                                                    </div>
                                                ),
                                            )}
                                        </div>

                                        <div className="space-y-4">
                                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary ">
                                                Constraints
                                            </h3>
                                            <ul className="grid grid-cols-1 gap-2">
                                                {problem.constraints.map(
                                                    (c, i) => (
                                                        <li
                                                            key={i}
                                                            className="flex items-center gap-3 text-xs font-mono text-muted-foreground bg-muted/20 p-3 rounded-lg border border-border/20">
                                                            <Zap className="size-3 text-primary" />{" "}
                                                            {c}
                                                        </li>
                                                    ),
                                                )}
                                            </ul>
                                        </div>
                                    </TabsContent>

                                    <TabsContent
                                        value="history"
                                        className="p-0 mt-0">
                                        <SubmissionHistory
                                            submissions={submissionHistory}
                                        />
                                    </TabsContent>

                                    <TabsContent
                                        value="intel"
                                        className="p-8 mt-0 space-y-8">
                                        <div className="space-y-4">
                                            <h3 className="text-xs font-black uppercase tracking-widest text-primary ">
                                                Editorial
                                            </h3>
                                            <p className="text-sm leading-relaxed text-muted-foreground bg-muted/20 p-6 rounded-2xl border border-border/20">
                                                {problem.editorial ||
                                                    "Classified information."}
                                            </p>
                                        </div>
                                        <div className="space-y-4">
                                            <h3 className="text-xs font-black uppercase tracking-widest text-primary ">
                                                Hints
                                            </h3>
                                            <div className="space-y-3">
                                                {problem.hints.map((h, i) => (
                                                    <div
                                                        key={i}
                                                        className="p-4 rounded-xl bg-primary/5 border border-primary/10 text-xs ">
                                                        {h}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </TabsContent>
                                </ScrollArea>
                            </Tabs>
                        </Card>
                    </div>
                    <div className="lg:col-span-7 space-y-6">
                        <Card className="bg-background border-border rounded-[2.5rem] overflow-hidden shadow-2xl transition-colors duration-300">
                            <CardHeader className="flex flex-row items-center justify-between bg-background border-b border-border/10 h-16 px-8">
                                <div className="flex items-center gap-2">
                                    <Terminal className="size-4 text-primary" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 ">
                                        Compiler_v2.04
                                    </span>
                                </div>
                                <Select
                                    value={selectedLanguage}
                                    onValueChange={(v: Language) => {
                                        setSelectedLanguage(v);
                                        if (problem?.codeSnippets?.[v]) {
                                            setCode(problem.codeSnippets[v]);
                                        }
                                    }}>
                                    <SelectTrigger className="w-36 h-9 bg-background border-border/50 rounded-lg text-xs font-black uppercase">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="JAVASCRIPT">
                                            JavaScript
                                        </SelectItem>
                                        <SelectItem value="PYTHON">
                                            Python
                                        </SelectItem>
                                        <SelectItem value="JAVA">
                                            Java
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </CardHeader>
                            <CardContent className="p-0 bg-background">
                                <Editor
                                    height="500px"
                                    language={selectedLanguage.toLowerCase()}
                                    value={code}
                                    onChange={(v) => setCode(v || "")}
                                    theme={
                                        theme === "dark" ? "vs-dark" : "light"
                                    }
                                    options={{
                                        minimap: { enabled: false },
                                        fontSize: 15,
                                        fontFamily: "var(--font-mono)",
                                        lineNumbers: "on",
                                        padding: { top: 20 },
                                        automaticLayout: true,
                                        scrollBeyondLastLine: false,
                                    }}
                                />
                                <div className="p-6 bg-background border-t border-border/10 flex gap-4">
                                    <Button
                                        onClick={handleRun}
                                        disabled={isRunning}
                                        variant="outline"
                                        className="h-12 px-8 rounded-xl border-border hover:bg-muted font-black uppercase text-xs tracking-widest gap-2">
                                        {isRunning ? (
                                            <Loader2 className="size-4 animate-spin" />
                                        ) : (
                                            <Play className="size-4" />
                                        )}
                                        Run Code
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                        {executionResponse && (
                            <Card className="bg-card/20 backdrop-blur-xl border-border/40 rounded-[2rem] p-8">
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 border-b border-border/20 pb-4">
                                        <div className="p-2 rounded-lg bg-primary/10">
                                            <Terminal className="size-4 text-primary" />
                                        </div>
                                        <h2 className="text-lg font-black uppercase  tracking-tight text-foreground">
                                            Execution Results
                                        </h2>
                                    </div>
                                    <div className="space-y-6">
                                        <TestCaseTable
                                            testCases={
                                                executionResponse.testCases
                                            }
                                        />
                                    </div>
                                </div>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProblemIdPage;
