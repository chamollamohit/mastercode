"use client";

import {
    Trophy,
    Users,
    Zap,
    ChevronRight,
    Play,
    Star,
    Terminal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/components/provider/auth-provider";
import Link from "next/link";

export default function Home() {
    const { user } = useAuth();

    const features = [
        {
            icon: <Terminal className="w-6 h-6" />,
            title: "Interactive Coding",
            description:
                "Practice with real-world challenges and get instant feedback in our high-performance IDE.",
        },
        {
            icon: <Trophy className="w-6 h-6" />,
            title: "Track Progress",
            description:
                "Monitor your improvement with detailed analytics and achievement systems.",
        },
        {
            icon: <Users className="w-6 h-6" />,
            title: "Global Community",
            description:
                "Learn from thousands of developers worldwide and share your knowledge.",
        },
        {
            icon: <Zap className="w-6 h-6" />,
            title: "Real-time Feedback",
            description:
                "Get instant feedback on your solutions with detailed algorithmic explanations.",
        },
    ];

    const stats = [
        { number: "50K+", label: "Problems Solved" },
        { number: "10K+", label: "Active Developers" },
        { number: "25+", label: "Languages" },
        { number: "98%", label: "Success Rate" },
    ];

    return (
        <div className="flex flex-col gap-24 py-12 font-mont space-y-10">
            <section className="flex flex-col justify-center items-center text-center mt-20 mb-20 px-4">
                <Badge
                    variant="secondary"
                    className="mb-8 px-4 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 font-man font-bold uppercase tracking-wider text-[10px]">
                    <Star className="w-3 h-3 mr-2 fill-current" />
                    The Ultimate Tech Prep Platform
                </Badge>

                <h1 className="text-4xl md:text-7xl font-black text-foreground leading-tight mb-8 font-man">
                    Master{" "}
                    <span className="relative inline-block mx-2">
                        <span className="relative z-10 px-6 py-1 bg-amber-500 dark:bg-amber-400 text-white dark:text-gray-900 rounded-2xl transform -rotate-2 inline-block shadow-xl">
                            Problem
                        </span>
                    </span>{" "}
                    Solving
                    <br />
                    with{" "}
                    <span className="relative inline-block mx-2">
                        <span className="relative z-10 px-6 py-1 bg-indigo-600 dark:bg-indigo-500 text-white rounded-2xl transform rotate-2 inline-block shadow-xl">
                            Master Code
                        </span>
                    </span>
                </h1>

                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
                    Level up your technical skills with our industry-standard
                    coding environment. Prepare for your next big engineering
                    role with curated challenges.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                    <Button
                        size="lg"
                        asChild
                        className="bg-amber-500 hover:bg-amber-600 text-white font-man font-bold h-12 px-8 shadow-lg transition-all hover:-translate-y-1">
                        <Link href="/problems">
                            <Play className="w-4 h-4 mr-2 fill-current" />
                            Start Coding
                            <ChevronRight className="w-4 h-4 ml-2" />
                        </Link>
                    </Button>
                    {!user && (
                        <Button
                            variant="outline"
                            size="lg"
                            asChild
                            className="border-2 font-man font-bold h-12 px-8 border-indigo-500/20 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/20">
                            <Link href="/register">Browse Community</Link>
                        </Button>
                    )}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-4xl w-full mx-auto border-t pt-12 border-border/50">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="flex flex-col gap-1">
                            <span className="text-3xl md:text-4xl font-black font-man text-foreground">
                                {stat.number}
                            </span>
                            <span className="text-xs uppercase tracking-widest font-bold text-muted-foreground">
                                {stat.label}
                            </span>
                        </div>
                    ))}
                </div>
            </section>

            <section className="container mx-auto px-4">
                <div className="text-center mb-16 flex flex-col gap-4">
                    <h2 className="text-3xl md:text-5xl font-black font-man">
                        Built for{" "}
                        <span className="text-indigo-500">Performance</span>
                    </h2>
                    <p className="text-muted-foreground max-w-xl mx-auto">
                        Everything you need to crush your next technical
                        interview in one place.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <Card
                            key={index}
                            className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all group">
                            <CardHeader>
                                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    {feature.icon}
                                </div>
                                <CardTitle className="font-man font-bold">
                                    {feature.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-sm leading-relaxed">
                                    {feature.description}
                                </CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            <section className="container mx-auto px-4 pb-20">
                <div className="relative overflow-hidden bg-indigo-600 dark:bg-indigo-500 rounded-[2rem] p-12 text-center text-white shadow-2xl">
                    <div className="relative z-10 flex flex-col items-center gap-6">
                        {user ? (
                            <>
                                <h2 className="text-3xl md:text-5xl font-black font-man max-w-2xl">
                                    Ready to solve your next challenge?
                                </h2>
                                <p className="text-indigo-100 text-lg max-w-md">
                                    You&apos;re already part of the community.
                                    Jump back into the problems and keep that
                                    streak alive!
                                </p>
                                <Button
                                    size="lg"
                                    variant="secondary"
                                    className="font-man font-bold h-12 px-10 bg-white text-indigo-600 hover:bg-indigo-50 shadow-xl"
                                    asChild>
                                    <Link href="/problems">
                                        Explore Problems
                                    </Link>
                                </Button>
                            </>
                        ) : (
                            <>
                                <h2 className="text-3xl md:text-5xl font-black font-man max-w-2xl">
                                    Ready to start your coding journey?
                                </h2>
                                <p className="text-indigo-100 text-lg max-w-md">
                                    Join 10,000+ developers who are sharpening
                                    their skills every single day.
                                </p>
                                <Button
                                    size="lg"
                                    variant="secondary"
                                    className="font-man font-bold h-12 px-10 bg-white text-indigo-600 hover:bg-indigo-50 shadow-xl"
                                    asChild>
                                    <Link href="/register">
                                        Get Started for Free
                                    </Link>
                                </Button>
                            </>
                        )}
                    </div>

                    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-white/30 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-amber-400/40 rounded-full blur-3xl" />
                </div>
            </section>
        </div>
    );
}
