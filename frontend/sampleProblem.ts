

export const sampleProblem = {
    "title": "Longest Palindromic Substring",
    "description": "Given a string `s`, return the longest palindromic substring in `s`.",
    "difficulty": "HARD" as const,
    "tags": ["string", "dynamic-programming", "two-pointers"],
    "examples": [
        {
            "input": "babad",
            "output": "bab",
            "explanation": "bab is the longest palindromic substring. aba is also valid."
        }
    ],
    "constraints": [
        "1 <= s.length <= 1000",
        "s consist of only digits and English letters."
    ],
    "testCases": [
        { "input": "babad", "output": "bab" },
        { "input": "cbbd", "output": "bb" },
        { "input": "racecar", "output": "racecar" }
    ],
    "codeSnippets": {
        "PYTHON": "import sys\ns = sys.stdin.read().strip()\n# Write your solution here",
        "JAVASCRIPT": "const s = require('fs').readFileSync('/dev/stdin','utf8').trim();\n// Write your solution here",
        "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.nextLine().trim();\n        // Write your solution here\n    }\n}"
    },
    "referenceSolutions": {
        "PYTHON": "import sys\ns = sys.stdin.read().strip()\ndef expand(l, r):\n    while l >= 0 and r < len(s) and s[l] == s[r]:\n        l -= 1\n        r += 1\n    return s[l+1:r]\nresult = ''\nfor i in range(len(s)):\n    odd = expand(i, i)\n    even = expand(i, i+1)\n    result = max(result, odd, even, key=len)\nprint(result)",
        "JAVASCRIPT": "const s = require('fs').readFileSync('/dev/stdin','utf8').trim();\nfunction expand(l, r) {\n  while (l >= 0 && r < s.length && s[l] === s[r]) { l--; r++; }\n  return s.slice(l+1, r);\n}\nlet result = '';\nfor (let i = 0; i < s.length; i++) {\n  const odd = expand(i, i);\n  const even = expand(i, i+1);\n  if (odd.length > result.length) result = odd;\n  if (even.length > result.length) result = even;\n}\nconsole.log(result);",
        "JAVA": "import java.util.*;\npublic class Main {\n    static String s;\n    static String expand(int l, int r) {\n        while (l >= 0 && r < s.length() && s.charAt(l) == s.charAt(r)) { l--; r++; }\n        return s.substring(l+1, r);\n    }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        s = sc.nextLine().trim();\n        String result = \"\";\n        for (int i = 0; i < s.length(); i++) {\n            String odd = expand(i, i);\n            String even = expand(i, i+1);\n            if (odd.length() > result.length()) result = odd;\n            if (even.length() > result.length()) result = even;\n        }\n        System.out.println(result);\n    }\n}"
    },
    "hints": [
        "Expand around each character as the center of a palindrome.",
        "Handle both odd-length and even-length palindromes separately."
    ],
    "editorial": "Use the expand around center approach. For each index, try expanding outward for both odd-length (single center) and even-length (two centers) palindromes. Track the longest found. Time complexity O(n²), space O(1)."
}
