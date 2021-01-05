export const enumExample1 = `
    someNumber U8 = 32;     // const

    ENUM_NAME {
        |U8;                // enums must have a type
        A;
        B = someNumber;     // can be assigned same type const
        C = 4;              // can have preassigned number
        D = SYS.RND();      // can be preassigned random free number permanently at compile time
        E = SYS.NEXT();     // can be preassigned next available number permanently at compile time
        F = SYS.PREV();     // can be preassigned previous available number permanently at compile time

        ? someNumber == 32 {
            G = 1;
        } ! {
            G = 2;
        }

        namespaceName {
            A = 11;
        }
        // also can be assigned another enums property
        // can use "if" and "switch" instructions, but only if their result will be determinable at compile time 

        // enum is like namespace, but inherits numeric type or other enums
    }
`