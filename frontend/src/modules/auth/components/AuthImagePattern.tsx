"use client";

import { Code, Terminal, FileCode, Braces } from "lucide-react";
import { useEffect, useState } from "react";

const CodeBackground = ({
    title,
    subtitle,
}: {
    title: string;
    subtitle: string;
}) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const codeSnippets = [
        `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
        `class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

function reverseList(head) {
  let prev = null;
  let current = head;
  while (current) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  return prev;
}`,
        `function isValid(s) {
  const stack = [];
  const map = { '(': ')', '{': '}', '[': ']' };
  
  for (let i = 0; i < s.length; i++) {
    if (s[i] in map) {
      stack.push(s[i]);
    } else {
      const last = stack.pop();
      if (map[last] !== s[i]) return false;
    }
  }
  return stack.length === 0;
}`,
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % codeSnippets.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [codeSnippets.length]);

    return (
        <div className="hidden lg:flex flex-col items-center justify-center bg-slate-950 text-white p-12 relative overflow-hidden font-mont">
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-[10%] left-[15%] animate-pulse text-primary">
                    <Braces size={40} />
                </div>
                <div className="absolute top-[30%] left-[80%] animate-pulse delay-300 text-blue-500">
                    <FileCode size={50} />
                </div>
                <div className="absolute top-[70%] left-[20%] animate-pulse delay-700 text-purple-500">
                    <Terminal size={45} />
                </div>
                <div className="absolute top-[60%] left-[75%] animate-pulse delay-500 text-emerald-500">
                    <Code size={55} />
                </div>
            </div>

            <div className="z-10 max-w-md w-full flex flex-col items-center">
                <div className="w-full bg-slate-900/80 border border-slate-800 backdrop-blur-sm rounded-xl shadow-2xl mb-10 overflow-hidden">
                    <div className="bg-slate-800/50 px-4 py-3 flex items-center border-b border-slate-800">
                        <div className="flex space-x-2 mr-4">
                            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                        </div>
                        <div className="text-[10px] font-mono uppercase tracking-widest opacity-50 flex items-center gap-2">
                            <FileCode size={12} />
                            solution.js
                        </div>
                    </div>

                    <div className="p-6 font-mono text-xs sm:text-sm h-72 overflow-hidden relative">
                        <pre className="whitespace-pre-wrap text-blue-400 transition-all duration-700 ease-in-out">
                            {codeSnippets[activeIndex]
                                .split("\n")
                                .map((line, i) => (
                                    <div
                                        key={i}
                                        className="leading-relaxed">
                                        <span className="text-slate-600 mr-4 select-none">
                                            {i + 1}
                                        </span>
                                        <span
                                            className={
                                                line.includes("function") ||
                                                line.includes("class") ||
                                                line.includes("return")
                                                    ? "text-purple-400"
                                                    : "text-blue-300"
                                            }>
                                            {line}
                                        </span>
                                    </div>
                                ))}
                        </pre>

                        <div className="absolute bottom-6 left-12 w-2 h-4 bg-primary animate-pulse shadow-[0_0_8px_rgba(var(--primary),0.8)]"></div>
                    </div>
                </div>

                <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-primary/10 mb-2">
                        <Code className="w-8 h-8 text-primary" />
                    </div>

                    <h2 className="text-3xl font-extrabold tracking-tight font-man">
                        {title}
                    </h2>

                    <p className="text-slate-400 max-w-sm font-mont leading-relaxed">
                        {subtitle}
                    </p>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-slate-950 to-transparent pointer-events-none" />
        </div>
    );
};

export default CodeBackground;
