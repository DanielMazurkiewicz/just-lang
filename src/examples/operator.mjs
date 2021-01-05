export const operatorExample1 = `
    \\ + (a U32, b Point) || {  // operator plus valid for both orders of parameters (a, b) and (b, a)
        b.x += a;
        b.y += a;
        => b;
    }
`