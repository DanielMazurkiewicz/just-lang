export const KIND = {
    RESERVED            :-1,

    EMPTY               : 0,
    COMMENT             : 1,
    
    IF                  : 2,
    ELSE                : 3,
    LOOP                : 4,
    SWITCH              : 5,
    
    RETURN              : 7,
    INHERIT             : 8,
    
    STATIC              : 9,
    STATIC_THREAD       : 43,
    VARIABLE            : 10,
    PUBLIC              : 11,
    READ_ONLY           : 46,
    
    ACCESS              : 12,
    
    ZONE_A              : 13,
    ZONE_B              : 14,
    ZONE_C              : 15,
    
    MATH                : 16,
    MATH_SINGLE         : 17,
    
    LOGIC               : 18,
    LOGIC_SINGLE        : 19,
    
    BIT                 : 20,
    BIT_SINGLE          : 21,
    
    ASSIGN              : 22,
    COMPARE             : 23,
    
    SETTER              : 25,
    GETTER              : 26,
    
    CONSTRUCTOR         : 27,
    DESTRUCTOR          : 28,
    
    TEXT                : 29,
    
    SEPARATOR           : 30,
    NEW_LINE            : 31,
    
    MODIFIER            : 32,
    
    BREAK               : 33,
    CONTINUE            : 34,
    NAME                : 35,
    
    COMMENT_CONTENT     : 36,
    TEXT_CONTENT        : 37,
    
    NUMBER              : 38,
    IMPORT              : 39,
    
    ZONE_A_CONTENT      : 40,
    ZONE_B_CONTENT      : 41,
    ZONE_C_CONTENT      : 42,

    COMMENT_START       : 44,
    COMMENT_END         : 45,

    LANGUAGE_SWITCH     : 51,
    LANGUAGE_CASE       : 52,

    TRY                 : 53,
    CATCH               : 54,
    THROW               : 55,
    
    NEW                 : 56,
    DELETE              : 57,

    GLOBAL              : 58,

    NAMESPACE_NAME      : 47,
    ENUM_NAME           : 48,
    FUNCTION_NAME       : 49,
    CLASS_NAME          : 50,
    INTERFACE_NAME      : 66,

    NAMESPACE           : 63,
    ENUM                : 62,
    FUNCTION            : 64,
    CLASS               : 61,
    INTERFACE           : 65,

    OPERATOR            : 59,

}
// next available value 67


export const KIND_REVERSE = {};
for (let name in KIND) {
    const value = KIND[name];
    KIND_REVERSE[value] = name;
}

const keywordsForMathAndLogic = {
    '==':   KIND.COMPARE,
    '>':    KIND.COMPARE,
    '<':    KIND.COMPARE,
    '>=':   KIND.COMPARE,
    '<=':   KIND.COMPARE,
    '!=':   KIND.COMPARE,

    '=':    KIND.ASSIGN,
    '*=':   KIND.ASSIGN,
    '/=':   KIND.ASSIGN,
    '%=':   KIND.ASSIGN,
    '+=':   KIND.ASSIGN,
    '-=':   KIND.ASSIGN,

    '&=':   KIND.ASSIGN,
    '|=':   KIND.ASSIGN,
    '^=':   KIND.ASSIGN,
    '>>=':  KIND.ASSIGN,
    '<<=':  KIND.ASSIGN,

    '&&':   KIND.LOGIC,
    '||':   KIND.LOGIC,
    '!':    KIND.LOGIC_SINGLE,

    '*':    KIND.MATH,
    '/':    KIND.MATH,
    '%':    KIND.MATH,
    '+':    KIND.MATH,
    '-':    KIND.MATH,
    '++':   KIND.MATH_SINGLE,
    '--':   KIND.MATH_SINGLE,

    '&':    KIND.BIT,
    '|':    KIND.BIT,
    '^':    KIND.BIT,
    '~':    KIND.BIT_SINGLE,
    '>>':   KIND.BIT,
    '<<':   KIND.BIT,

}

const keywords = {
    '':     KIND.NAME,
    '//':   KIND.COMMENT,
    '/*':   KIND.COMMENT_START,
    '*/':   KIND.COMMENT_END,

    '`':    KIND.TEXT,

    '\t':   KIND.EMPTY,
    ' ':    KIND.EMPTY,
    '\r':   KIND.EMPTY,

    ';':    KIND.SEPARATOR,
    ',':    KIND.SEPARATOR,

    '\n':   KIND.NEW_LINE,

    '>>':   KIND.IMPORT,                    // `./janek` >> {*; bronek = *;  kamil = jurek.official}

    '?':    KIND.IF,                        // if          ? condition {}
    '#':    KIND.SWITCH,                    // switch      # variableOrConst { caseValueConditions {} !# {}}
    '##':   KIND.LANGUAGE_SWITCH,           // ## {} will be at compile time converted to ## `uniqueIdentifier` {}
    '##>':  KIND.LANGUAGE_CASE,             // ##> `uniqueIdentifier` { { ... code to translate ...} langName { ... code translated ...}}
    '!':    KIND.ELSE, 
    '@':    KIND.LOOP,                      // for         @ loopConditions {}
    '=>':   KIND.RETURN,                    // return      =>                                          => variableOrConst;
    '->':   KIND.BREAK,                     // break       ->                                          -> variableOrConst;
    '->@':  KIND.CONTINUE,

    '??':   KIND.TRY,                       // ??{ ... code to try ...}(errorInfoReturned){... code to run on error ...}
    '->>>': KIND.THROW,

    '+++':  KIND.NEW,                       // & ClassOrInterfaceName(){}

    '$':    KIND.STATIC,                    // STATIC per app      // static
    '$$':   KIND.STATIC_THREAD,             // STATIC per thread,  // static

    '+':    KIND.CONSTRUCTOR,
    '-':    KIND.DESTRUCTOR,

    '|':    KIND.INHERIT,
    '&':    KIND.GLOBAL,
    '^':    KIND.PUBLIC,
    '~':    KIND.VARIABLE,
    '*':    KIND.READ_ONLY,

    '>':    KIND.SETTER,
    '<':    KIND.GETTER,

    '\\':   KIND.OPERATOR,

    '.':    KIND.ACCESS,                    // access

    '{':    KIND.ZONE_A,
    '}':    KIND.ZONE_A,
    '(':    KIND.ZONE_B,
    ')':    KIND.ZONE_B,
    '[':    KIND.ZONE_C,
    ']':    KIND.ZONE_C,

    '0':    KIND.NUMBER,
    '1':    KIND.NUMBER,
    '2':    KIND.NUMBER,
    '3':    KIND.NUMBER,
    '4':    KIND.NUMBER,
    '5':    KIND.NUMBER,
    '6':    KIND.NUMBER,
    '7':    KIND.NUMBER,
    '8':    KIND.NUMBER,
    '9':    KIND.NUMBER,

}

// fill up missing keywords
for (let keyword in keywordsForMathAndLogic) {
    if (!keywords[keyword]) keywords[keyword] = keywordsForMathAndLogic[keyword];
}
// make sure all special characters are in keywords
const specialCharacters = `\`~!@#$%^&*()-+={}[]:";'<>?,./|\\\t\n\r`;
for (let i = 0; i < specialCharacters.length; i++) {
    const char = specialCharacters[i];
    if (!keywords[char]) keywords[char] = KIND.RESERVED;
}

const tokens = Object.keys(keywords).sort((a, b) => b.length - a.length);

const getToken = (text, processObj = {pos: 0}) => {
    let token, tokenLength;
    const pos = processObj.pos;
    for (let i = 0; i < tokens.length; i++) {
        token = tokens[i];
        tokenLength = token.length;
        if (text.substr(pos, tokenLength) === token) {
            processObj.pos += tokenLength;
            return token;
        }
    }
    return '';
}
const getCommentContent = (text, processObj = {pos: 0}) => {
    const pos = processObj.pos;
    const end = text.indexOf('\n', pos);
    if (end < 0) {
        processObj.pos = text.length;
        return text.substr(pos)
    } else {
        processObj.pos = end;
        return text.substring(pos, end);
    }
}
const getTextContent = (text, processObj = {pos: 0}) => {
    let pos = processObj.pos;
    const start = pos;

    while (pos <= text.length) {
        const char = text[pos] || '';

        if (char === '\\') pos++;
        else if (char === '') {
            processObj.pos = pos;
            return text.substr(start);
        } else if (char === '`') {
            processObj.pos = pos;
            return text.substring(start, pos);
        }
        pos++;
    }
}


const createCharList = (characters, list = {}) => {
    for (let i = 0; i < characters.length; i++) {
        list[characters[i]] = 1;
    }
    return list; 
}
const emptyFollowers = createCharList('\r\t ');
const getEmpty = (text, processObj = {pos: 0}) => {
    let pos = processObj.pos;
    const start = pos;

    while (pos <= text.length) {
        const char = text[pos] || '';
        if (!emptyFollowers[char]) {
            processObj.pos = pos;
            return text.substring(start, pos)
        }
        pos++;
    }
}

const digitLimiters = createCharList('0123456789');

const numberLimitersText = '\'`~!@#$%^&*()-+={}[]:";<>?,/\\| \n\r\t';
const numberLimiters = createCharList(numberLimitersText, {'':1});
const getNumber = (text, processObj = {pos: 0}) => {
    let pos = processObj.pos;
    const start = pos;

    while (pos <= text.length) {
        const char = text[pos] || '';
        if (numberLimiters[char] || (char === '.' && !digitLimiters[text[pos+1]])) {
            processObj.pos = pos;
            return text.substring(start, pos);
        }

        pos++;
    }
}

const nameLimiters = createCharList(numberLimitersText + `.`, {'':1});
const getName = (text, processObj = {pos: 0}) => {
    let pos = processObj.pos;
    const start = pos;

    while (pos <= text.length) {
        const char = text[pos] || '';
        if (nameLimiters[char]) {
            processObj.pos = pos;
            return text.substring(start, pos)
        }
        pos++;
    }
}


export const tokenizer = (text, processObj = {pos: 0}) => {
    let line = 0;
    const tokens = [];
    while (processObj.pos < text.length) {
        const start = processObj.pos;
        const token = getToken(text, processObj);
        const kind = keywords[token];

        switch (kind) {
            case KIND.NAME:
                const restOfTokenName = getName(text, processObj);
                tokens.push({
                    line,
                    start,
                    end: processObj.pos,
                    kind,
                    token: token + restOfTokenName
                });
                break;
            case KIND.NUMBER:
                const restOfTokenNumber = getNumber(text, processObj);
                tokens.push({
                    line,
                    start,
                    end: processObj.pos,
                    kind,
                    token: token + restOfTokenNumber
                });
                break;
            case KIND.EMPTY:
                const restOfTokenEmpty = getEmpty(text, processObj);
                tokens.push({
                    line,
                    start,
                    end: processObj.pos,
                    kind,
                    token: token + restOfTokenEmpty
                });
                break;
            default:
                tokens.push({
                    line,
                    start,
                    end: processObj.pos,
                    kind,
                    token
                });
        
                switch (kind) {
                    case KIND.COMMENT:
                        const startComment = processObj.pos;
                        const tokenComment = getCommentContent(text, processObj);
                        tokens.push({
                            line,
                            start: startComment,
                            end: processObj.pos,
                            kind: KIND.COMMENT_CONTENT,
                            token: tokenComment
                        });
                        break;
                    case KIND.TEXT:
                        const startText = processObj.pos;
                        const tokenText = getTextContent(text, processObj);
                        tokens.push({
                            line,
                            start: startText,
                            end: processObj.pos,
                            kind: KIND.TEXT_CONTENT,
                            token: tokenText
                        });
    
                        const startTextEnding = processObj.pos;
                        const tokenTextEnding = getToken(text, processObj);
                        const kindTextEnding = keywords[tokenTextEnding];
    
                        if (kindTextEnding === KIND.TEXT) {
                            tokens.push({
                                line,
                                start: startTextEnding,
                                end: processObj.pos,
                                kind: kindTextEnding,
                                token: tokenTextEnding
                            });    
                        }
    
                        break;
                    case KIND.NEW_LINE:
                        line++;
                        break;
                }    
        }
    }
    return tokens;
}

