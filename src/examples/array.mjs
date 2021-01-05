export const arrayExample1 = `
    Point() {
        x U32;
        y U32;
    }
    array1 ARR(U32) = [10, 20, 30];
    array2 ARR(Point) = [{x = 10; y = 20}, {}, {}];
    array3 ARR(Point, 3) = [{x = 10; y = 20}, {}, {}];          // fixed size array
    array4 ARR(REF(Point)) = [{x = 10; y = 20}, {}, {}];        // array of references
    array5 ARR(REF(Point), 3) = [{x = 10; y = 20}, {}, {}];     // fixed array of references
`
