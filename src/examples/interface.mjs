export const interfaceExample1 = `
    InterfaceName () {
        ^posX U32
        ^posY U64

        // when only a public members it can be considered an interface and constructor can be ommited
    }
`

export const interfaceExample2 = `
    Point () {
        ^posX U32;
        ^posY U64=2;
        ^transparency U8 = 2;
    }

    point   Point   = +++Point{posX = 2};
    point2  Point   = +++Point(2, 2){transparency = 10};
    points  ARR(Point | NIL) = [{},{posY=3}];

    ---point;                                   // delete point object
    ---point2;                                  // delete point2 object
    @ (points, [point, index]) ---point;        // loop through array and delete each object in array
    ---points;                                  // delete array itself
`
