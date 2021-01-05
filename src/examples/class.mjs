
export const classExample1 = `
^ Unsigned32 = U32;                     // alias for type - just an alias
^ EventCallback = FUN(a U32, b U64);    // alias for delegate - just an alias

ClassName () {
    ^ propName U32 = 1;                 // public const
    ~ propName U32 = 1;                 // private variable
    ^~delegate FUN(a U32, b U64);       // public variable 

    ^ toString(){}                      // public method

    + () {}                             // constructor
    - {}                                // destructor
}
`

export const classExample2 = `
ClassName () {
    |U32;           // inherits U32

    // when inheriting numeric type it is forbidden to define properties and other inherits

    ^ > name(param ParamType) {}        // setter
    ^ < name {}                         // getter

    + {}                                // constructor (non parametric)
    + (param ParamType) {}              // constructor overload

    - {}                                // destructor
}
`


export const classExample3 = `
Point () {
    ^posX U32
    ^posY U64
    ^transparency U8 = 2;
    +(x U32, y U32) {
        posX = x;
        posY = y;
    }
}

point Point = Point(2, 2);
point2 Point = Point(2, 2){transparency = 10};
`
