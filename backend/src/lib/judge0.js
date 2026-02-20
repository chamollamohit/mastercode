export const getJudge0LanguageId = (language) => {
    const languageMap = {
        PYTHON: 71,
        JAVASCRIPT: 102,
        JAVA: 91,
    };
    return languageMap[language.toUpperCase()];
};
