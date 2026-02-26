import axios from "axios";

export const getJudge0LanguageId = (language) => {
    const languageMap = {
        PYTHON: 71,
        JAVASCRIPT: 63,
        JAVA: 62,
    };
    return languageMap[language.toUpperCase()];
};

export const getLanguageName = (languageId) => {
    const languageNames = {
        71: "PYTHON",
        63: "JAVASCRIPT",
        62: "JAVA",
    };
    return languageNames[languageId];
};

export const submitBatch = async (submissions) => {
    const result = await axios.post(
        `${process.env.JUDGE0_API_URL}/submissions/batch`,
        { submissions },
        {
            headers: {
                "Content-Type": "application/json",
                "x-rapidapi-key": process.env.RAPIDAPI_KEY,
                "x-rapidapi-host": process.env.RAPIDAPI_HOST,
            },
        },
    );

    return result.data;
};

export const sleep = (time) =>
    new Promise((resolve) => setTimeout(resolve, time));

export const pollBatchResults = async (tokens) => {
    while (true) {
        const { data } = await axios.get(
            `${process.env.JUDGE0_API_URL}/submissions/batch?`,
            {
                params: {
                    tokens: tokens.join(","),
                    base64_encoded: false,
                },
                headers: {
                    "x-rapidapi-key": process.env.RAPIDAPI_KEY,
                    "x-rapidapi-host": process.env.RAPIDAPI_HOST,
                },
            },
        );
        const results = data.submissions;

        const isAllDone = results.every((result) => result.status.id >= 3);

        if (isAllDone) return results;

        await sleep(3000);
    }
};
