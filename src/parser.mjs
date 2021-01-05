import { tokenizer, KIND, KIND_REVERSE } from  './tokenizer.mjs';
import { otherExample1 } from './examples/other.mjs'
import { classExample1 } from './examples/class.mjs'


const example = classExample1;
// example = '({}}'
// tokenizer(example).forEach(token => console.log(token))
// console.log(tokenize(example))


const toFilterOut = {
    [KIND.NEW_LINE]: 1,
    [KIND.COMMENT]: 1,
    [KIND.COMMENT_CONTENT]: 1,
    [KIND.EMPTY]: 1,
    [KIND.TEXT]: 1,
}

const tokens = tokenizer(example).filter((token, index) => {
    if (!toFilterOut[token.kind]) {
        token.index = index;
        token.kindName = KIND_REVERSE[token.kind];
        return token;
    }
});

const parseZones = (tokensInput) => {
    const stack = [];
    let tokens = [];


    const process = (token, opening, kind) => {
        if (token.token === opening) {
            const childTokens = [];
            const contentToken = {
                lineStart: token.line,
                lineEnd: -1,
                start: token.start,
                end: -1,
                indexStart: token.index,
                indexEnd: -1,
                kind,
                tokens: childTokens
            };
            contentToken.kindName = KIND_REVERSE[kind];
            tokens.push(contentToken);

            stack.push({
                contentToken,
                tokens,
                token
            });

            tokens = childTokens;

        } else {
            if (stack.length) {
                const stackElement = stack.pop();
                if (stackElement.token.kind === token.kind) {
                    const content = stackElement.contentToken;
                    content.lineEnd = token.line;
                    content.end = token.end;
                    content.indexEnd = token.index;

                    tokens = stackElement.tokens;
                } else {
                    stack.push(stackElement);
                    tokens.push(token);
                    token.error = 'missing opening token of given kind';
                }

            } else {
                token.error = 'missing opening token at all';
                tokens.push(token);
            }
        }

    }



    for (let i = 0; i < tokensInput.length; i++) {
        const token = tokensInput[i];
        switch (token.kind) {
            case KIND.ZONE_A:            
                process(token, '{', KIND.ZONE_A_CONTENT);
            break;
            case KIND.ZONE_B:            
                process(token, '(', KIND.ZONE_B_CONTENT);
            break;
            case KIND.ZONE_C:            
                process(token, '[', KIND.ZONE_C_CONTENT);
            break;

            default:
                tokens.push(token);

        }
    }


    while (stack.length) {
        const stackElement = stack.pop();
        stackElement.contentToken.error = 'missing closing token';
        stackElement.token.error = 'missing closing token';
        tokens = stackElement.tokens;
    }

    return tokens;
}



for(let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    console.log(token.kindName.padEnd(20, ' '), JSON.stringify(token.token))

}

console.log(JSON.stringify(parseZones(tokens), null, 3))
// console.log(parseZones(tokens))

// {)} // if closing doesnt match opening then ignore and error
// {}) // if too many closings ignore and error
// {{  // if missing closing error 

