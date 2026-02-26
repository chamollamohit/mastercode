"use client";

import { useState } from "react";
import { Editor } from "@monaco-editor/react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
    Plus,
    Trash2,
    Code2,
    FileText,
    Lightbulb,
    BookOpen,
    CheckCircle2,
    Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useNextTheme } from "@space-man/react-theme-animation";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createProblem } from "@/modules/problems/actions";
import { sampleProblem } from "../../../../sampleProblem";

const problemSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z
        .string()
        .min(10, "Description must be at least 10 characters"),
    difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),
    tags: z.array(z.object({ value: z.string().min(1, "Required") })).min(1),
    constraints: z
        .array(z.object({ value: z.string().min(1, "Required") }))
        .min(1),
    hints: z.array(z.object({ value: z.string().min(1, "Required") })).min(1),
    editorial: z.string().optional(),
    testCases: z
        .array(
            z.object({ input: z.string().min(1), output: z.string().min(1) }),
        )
        .min(1),
    examples: z
        .array(
            z.object({
                input: z.string().min(1),
                output: z.string().min(1),
                explanation: z.string().optional(),
            }),
        )
        .min(1),
    codeSnippets: z.object({
        JAVASCRIPT: z.string().min(1),
        PYTHON: z.string().min(1),
        JAVA: z.string().min(1),
    }),
    referenceSolutions: z.object({
        JAVASCRIPT: z.string().min(1),
        PYTHON: z.string().min(1),
        JAVA: z.string().min(1),
    }),
});

export interface Problemdata {
    tags: string[];
    constraints: string[];
    hints: string[];
    title: string;
    description: string;
    difficulty: "EASY" | "MEDIUM" | "HARD";
    testCases: {
        input: string;
        output: string;
    }[];
    examples: {
        input: string;
        output: string;
        explanation?: string | undefined;
    }[];
    codeSnippets: {
        JAVASCRIPT: string;
        PYTHON: string;
        JAVA: string;
    };
    referenceSolutions: {
        JAVASCRIPT: string;
        PYTHON: string;
        JAVA: string;
    };
    editorial?: string | undefined;
}

const CodeEditorWindow = ({
    value,
    onChange,
    language = "javascript",
    label,
}: {
    value: string;
    onChange: () => void;
    language: string;
    label: string;
}) => {
    const { theme } = useNextTheme();
    return (
        <div className="relative rounded-2xl border border-border/50 overflow-hidden bg-background shadow-2xl transition-colors duration-300">
            <div className="flex items-center justify-between px-4 py-2 bg-muted/50 dark:bg-zinc-900/50 border-b border-border/10 dark:border-white/5">
                <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-primary italic">
                    {label} — {language}
                </span>
            </div>

            <div className="bg-background">
                <Editor
                    height="320px"
                    defaultLanguage={language}
                    theme={theme === "dark" ? "vs-dark" : "light"}
                    value={value}
                    onChange={onChange}
                    options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        padding: { top: 20 },
                        lineNumbers: "on",
                        roundedSelection: false,
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                        tabSize: 2,
                        wordWrap: "on",
                        fontFamily: "var(--font-mono)",
                    }}
                />
            </div>
        </div>
    );
};

const CreateProblemForm = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof problemSchema>>({
        resolver: zodResolver(problemSchema),
        defaultValues: {
            title: "",
            description: "",
            difficulty: "EASY",
            tags: [{ value: "" }],
            constraints: [{ value: "" }],
            hints: [{ value: "" }],
            testCases: [{ input: "", output: "" }],
            examples: [{ input: "", output: "", explanation: "" }],
            codeSnippets: { JAVASCRIPT: "", PYTHON: "", JAVA: "" },
            referenceSolutions: { JAVASCRIPT: "", PYTHON: "", JAVA: "" },
        },
    });

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = form;

    const {
        fields: tagFields,
        append: appendTag,
        remove: removeTag,
    } = useFieldArray({ control, name: "tags" });

    const {
        fields: constraintFields,
        append: appendConstraint,
        remove: removeConstraint,
    } = useFieldArray({ control, name: "constraints" });

    const {
        fields: hintFields,
        append: appendHint,
        remove: removeHint,
    } = useFieldArray({ control, name: "hints" });

    const {
        fields: testCaseFields,
        append: appendTestCase,
        remove: removeTestCase,
    } = useFieldArray({ control, name: "testCases" });

    const {
        fields: exampleFields,
        append: appendExample,
        remove: removeExample,
    } = useFieldArray({ control, name: "examples" });

    const loadSampleData = () => {
        reset({
            ...sampleProblem,
            tags: sampleProblem.tags.map((tag) => ({ value: tag })),
            constraints: sampleProblem.constraints.map((constraint) => ({
                value: constraint,
            })),
            hints: sampleProblem.hints.map((hint) => ({ value: hint })),
        });
        toast.success("Sample Problem Loaded");
    };

    const onSubmit = async (values: z.infer<typeof problemSchema>) => {
        setIsLoading(true);
        const finalData = {
            ...values,
            tags: values.tags.map((t) => t.value),
            constraints: values.constraints.map((c) => c.value),
            hints: values.hints.map((h) => h.value),
        };

        const res = await createProblem(finalData);
        setIsLoading(false);
        if (res.success) {
            toast.success(res.message);
            router.push("/problems");
        } else {
            toast.error(res.message);
        }
    };

    return (
        <div className="container mx-auto py-8 px-4 max-w-7xl">
            <Card className="shadow-xl bg-border/25">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-3xl flex items-center gap-3">
                            <FileText className="w-8 h-8 text-amber-600" />
                            Create Problem
                        </CardTitle>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={loadSampleData}
                            className="gap-2">
                            <Download className="w-4 h-4" /> Load Sample
                        </Button>
                    </div>
                    <Separator className="mt-4" />
                </CardHeader>

                <CardContent className="p-6">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-8">
                        <div className="grid gap-6">
                            <div className="space-y-2">
                                <Label className="text-lg font-semibold">
                                    Title
                                </Label>
                                <Input
                                    {...register("title")}
                                    placeholder="Enter problem title"
                                    className="text-lg"
                                />
                                {errors.title && (
                                    <p className="text-sm text-red-500">
                                        {errors.title.message}
                                    </p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label className="text-lg font-semibold">
                                    Description
                                </Label>
                                <Textarea
                                    {...register("description")}
                                    placeholder="Enter the problem description..."
                                    className="min-h-32"
                                />
                                {errors.description && (
                                    <p className="text-sm text-red-500">
                                        {errors.description.message}
                                    </p>
                                )}
                            </div>
                            <div className="w-1/3">
                                <Label className="text-lg font-semibold">
                                    Difficulty
                                </Label>
                                <Controller
                                    name="difficulty"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}>
                                            <SelectTrigger className="mt-2">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="EASY">
                                                    Easy
                                                </SelectItem>
                                                <SelectItem value="MEDIUM">
                                                    Medium
                                                </SelectItem>
                                                <SelectItem value="HARD">
                                                    Hard
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>
                        </div>

                        <Card className="bg-amber-50/50 dark:bg-amber-950/10">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle className="text-xl flex items-center gap-2">
                                    <BookOpen className="w-5 h-5 text-amber-600" />{" "}
                                    Tags
                                </CardTitle>
                                <Button
                                    type="button"
                                    size="sm"
                                    onClick={() => appendTag({ value: "" })}>
                                    <Plus className="w-4 h-4" />
                                </Button>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {tagFields.map((field, index) => (
                                    <div
                                        key={field.id}
                                        className="flex gap-2">
                                        <Input
                                            {...register(`tags.${index}.value`)}
                                            placeholder="Tag name"
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            onClick={() => removeTag(index)}
                                            disabled={tagFields.length === 1}>
                                            <Trash2 className="w-4 h-4 text-red-500" />
                                        </Button>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card className="bg-slate-50 dark:bg-slate-900/40">
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <CardTitle className="text-lg">
                                        Constraints
                                    </CardTitle>{" "}
                                    <Button
                                        type="button"
                                        size="sm"
                                        onClick={() =>
                                            appendConstraint({ value: "" })
                                        }>
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    {constraintFields.map((field, index) => (
                                        <div
                                            key={field.id}
                                            className="flex gap-2">
                                            <Input
                                                {...register(
                                                    `constraints.${index}.value`,
                                                )}
                                            />{" "}
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                onClick={() =>
                                                    removeConstraint(index)
                                                }
                                                disabled={
                                                    constraintFields.length ===
                                                    1
                                                }>
                                                <Trash2 className="h-4 w-4 text-red-500" />
                                            </Button>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                            <Card className="bg-slate-50 dark:bg-slate-900/40">
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <CardTitle className="text-lg">
                                        Hints
                                    </CardTitle>{" "}
                                    <Button
                                        type="button"
                                        size="sm"
                                        onClick={() =>
                                            appendHint({ value: "" })
                                        }>
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    {hintFields.map((field, index) => (
                                        <div
                                            key={field.id}
                                            className="flex gap-2">
                                            <Input
                                                {...register(
                                                    `hints.${index}.value`,
                                                )}
                                            />{" "}
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                onClick={() =>
                                                    removeHint(index)
                                                }
                                                disabled={
                                                    hintFields.length === 1
                                                }>
                                                <Trash2 className="h-4 w-4 text-red-500" />
                                            </Button>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </div>

                        <Card className="bg-green-50/50 dark:bg-green-950/10">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle className="text-xl flex items-center gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-green-600" />{" "}
                                    Test Cases
                                </CardTitle>{" "}
                                <Button
                                    type="button"
                                    size="sm"
                                    onClick={() =>
                                        appendTestCase({
                                            input: "",
                                            output: "",
                                        })
                                    }>
                                    <Plus className="w-4 h-4" />
                                </Button>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {testCaseFields.map((field, index) => (
                                    <div
                                        key={field.id}
                                        className="grid grid-cols-2 gap-4 border p-4 rounded-md bg-background">
                                        <div>
                                            <Label className="pb-1.5">
                                                Input
                                            </Label>
                                            <Input
                                                {...register(
                                                    `testCases.${index}.input`,
                                                )}
                                            />
                                        </div>
                                        <div className="flex justify-between items-end gap-2">
                                            <div className="w-full">
                                                <Label className="pb-1.5">
                                                    Output
                                                </Label>
                                                <Input
                                                    {...register(
                                                        `testCases.${index}.output`,
                                                    )}
                                                    className=""
                                                />
                                            </div>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                onClick={() =>
                                                    removeTestCase(index)
                                                }
                                                disabled={
                                                    testCaseFields.length === 1
                                                }>
                                                <Trash2 className="h-4 w-4 text-red-500" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        <Card className="bg-blue-50/50 dark:bg-blue-950/10">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle className="text-xl flex items-center gap-2">
                                    <Lightbulb className="w-5 h-5 text-blue-600" />{" "}
                                    Examples
                                </CardTitle>{" "}
                                <Button
                                    type="button"
                                    size="sm"
                                    onClick={() =>
                                        appendExample({
                                            input: "",
                                            output: "",
                                            explanation: "",
                                        })
                                    }>
                                    <Plus className="w-4 h-4" />
                                </Button>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {exampleFields.map((field, index) => (
                                    <div
                                        key={field.id}
                                        className="grid grid-cols-1 md:grid-cols-3 gap-4 border p-4 rounded-md bg-background relative">
                                        <div>
                                            <Label className="pb-1.5">
                                                Input
                                            </Label>
                                            <Input
                                                {...register(
                                                    `examples.${index}.input`,
                                                )}
                                            />
                                        </div>
                                        <div>
                                            <Label className="pb-1.5">
                                                Output
                                            </Label>
                                            <Input
                                                {...register(
                                                    `examples.${index}.output`,
                                                )}
                                            />
                                        </div>
                                        <div>
                                            <Label className="pb-1.5">
                                                Explanation
                                            </Label>
                                            <Input
                                                {...register(
                                                    `examples.${index}.explanation`,
                                                )}
                                            />
                                        </div>
                                        <Button
                                            type="button"
                                            className="absolute top-2 right-2"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => removeExample(index)}
                                            disabled={
                                                exampleFields.length === 1
                                            }>
                                            <Trash2 className="h-4 w-4 text-red-500" />
                                        </Button>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {["JAVASCRIPT", "PYTHON", "JAVA"].map((lang) => (
                            <div
                                key={lang}
                                className="space-y-4 border p-6 rounded-2xl bg-muted/20">
                                <h3 className="font-bold flex items-center gap-2">
                                    <Code2 className="w-5 h-5" /> {lang}
                                </h3>
                                <Controller
                                    name={
                                        `codeSnippets.${lang}` as
                                            | "codeSnippets.JAVASCRIPT"
                                            | "codeSnippets.PYTHON"
                                            | "codeSnippets.JAVA"
                                    }
                                    control={control}
                                    render={({ field }) => (
                                        <CodeEditorWindow
                                            value={field.value}
                                            onChange={field.onChange}
                                            language={lang.toLowerCase()}
                                            label="Starter Template"
                                        />
                                    )}
                                />
                                <Controller
                                    name={
                                        `referenceSolutions.${lang}` as
                                            | "referenceSolutions.JAVASCRIPT"
                                            | "referenceSolutions.PYTHON"
                                            | "referenceSolutions.JAVA"
                                    }
                                    control={control}
                                    render={({ field }) => (
                                        <CodeEditorWindow
                                            value={field.value}
                                            onChange={field.onChange}
                                            language={lang.toLowerCase()}
                                            label="Reference Solution"
                                        />
                                    )}
                                />
                            </div>
                        ))}

                        <div className="flex justify-end">
                            <Button
                                type="submit"
                                variant={"default"}
                                size="lg"
                                disabled={isLoading}
                                className="gap-2 h-14 px-8 text-lg font-bold">
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <Plus className="w-6 h-6" />
                                )}
                                Create problem
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default CreateProblemForm;
