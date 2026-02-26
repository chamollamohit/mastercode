export const getJudge0LanguageId = (language: "PYTHON" | "JAVASCRIPT" | "JAVA") => {
    const languageMap: Record<"PYTHON" | "JAVASCRIPT" | "JAVA", number> = {
        PYTHON: 71,
        JAVASCRIPT: 63,
        JAVA: 62,
    };

    const key = language.toUpperCase() as keyof typeof languageMap;

    return languageMap[key];
};