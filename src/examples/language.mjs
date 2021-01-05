export const languageDependantBlockExample1 = `

    SYS.LANG = \`en\`;

    message STR = ## \`uniqueId\` {\`Hello world\`};

    // translation that can be placed anywhere
    ##> \`uniqueId\` {
        en {
            \`Hello world\`
        }

        pl {
            \`Witaj świecie\`
        }
    }

`