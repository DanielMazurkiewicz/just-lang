export const delegateExample1 = `
    DelegateClassName () {
        |FUN(posX U32, posX U64);
        // when inheriting function type it can be only that function
    }

    doSomething DelegateClassName = (){/* code here - code will reference */}

    doSomething(1, 2);
`


export const delegateExample2 = `
    delegateTypeName ([type]) {
        |FUN;       // delegate is a class that inherit function, parameters are provided as properties
        param1 U32,
        param2 type,

        => U32;     // return type of delegate
    }

    functionName1 delegateTypeName(U32) {
        /* some code here */
        => param1;                              // parameters names are defined in delegate type
    }

    functionName2 delegateTypeName(U32) {
        /* some code here */
    }

    ~someDelegate delegateTypeName(U32);        // delegate variable definition
    someDelegate = functionName1;
    someDelegate = functionName2;

    someDelegate(1, 2);                         // calling delegate
    // can not call a delegate before assigning a value to it, can not return empty delegate
`
