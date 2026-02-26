export const getJudge0LanguageId = (language: "PYTHON" | "JAVASCRIPT" | "JAVA") => {
    const languageMap = {
        PYTHON: 71,
        JAVASCRIPT: 63,
        JAVA: 62,
    };
    return languageMap[language.toUpperCase()];
};