module.exports = {
    root: true,
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true,
        },
    },
    settings: {
        react: {
            version: "detect",
        },
    },
    env: {
        es6: true,
        jest: true,
        browser: true,
        amd: true,
        node: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:prettier/recommended", // Make this the last element so prettier config overrides other formatting rules
    ],
    rules: {
        "no-unused-vars": ["warn", { vars: "all", args: "after-used", ignoreRestSiblings: false }],
        "prettier/prettier": ["warn", { endOfLine: "auto" }, { usePrettierrc: true }], // Use our .prettierrc file as source
        "react/react-in-jsx-scope": "off",
        // allow jsx syntax in js files
        "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
        "react/prop-types": "off",
    },
};
