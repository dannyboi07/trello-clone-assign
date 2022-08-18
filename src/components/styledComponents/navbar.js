import styled from "styled-components";
import arrowDown from "../../assets/arrow-down.svg"

const StyledNavCtn = styled.div`
    width: 100%;
    /* border: 1px solid black; */
    padding: 0.5em 1.25em;

    display: flex;
    align-items: center;
    column-gap: 1.5em;
    /* height: 2em */

    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
`

const StyledNav = styled.nav`
    width: fit-content;
    

    & > ul {
        display: flex;
        column-gap: 1em;
        list-style-type: none;

        & > li {
            position: relative;
            padding: 0.35em 0.75em;
            border-radius: 0.25em;
            transition: backdrop-filter 0.25s;
            user-select: none;

            &::after {
                content: url("${arrowDown}");
                margin-left: 0.5em;
            }

            &.hover {
                cursor: pointer;
                backdrop-filter: contrast(80%)
            }

            &[data-state="active"] {
                backdrop-filter: contrast(50%)
            }
        }

        & * {
            /* border: 1px solid red */
        }
    }

    z-index: 999;
`

export {
    StyledNavCtn,
    StyledNav
}