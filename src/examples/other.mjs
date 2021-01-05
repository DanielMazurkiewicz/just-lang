
export const otherExample1 = `
|~>name_space {
    |>  ifc (x [xType]; y U32; [justAType]) {

        name   TEXT = \`some_name\`;
        id     U128;
        pos    F64 = 1.01.0.toString();
        data   xType;

        ? x {

        } !? y {

        }

        @  {

        }

        # a {
            >= 5 <= 10 {

            }
            1 {

            }
            2 {

            }
        }

        => name;
    }
}
`
