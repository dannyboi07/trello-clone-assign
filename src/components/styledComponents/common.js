import styled from "styled-components";

const StyledPopover = styled.div`
    position: absolute;
    top: 2.75em;
    left: 0;

    width: 310px;
    /* min-height: 100px; */

    border-radius: 0.15em;

    transform: scale(0);

    background-color: white;
    
    transition: transform 0.25s;

    &[data-state="open"] {
        transform: scale(1);
    }

    &.top-left {
        transform-origin: top left;
    }

    border: 1px solid black;

    & > h4 {
        position: relative;
        font-size: 0.875rem;
        padding: 0.5em 0;

        font-weight: 400;
        text-align: center;
        color: darkslategray;

        &::after {
            position: absolute;
            left: 50%;
            bottom: 0;
            content: "";
            width: 90%;
            height: 1px;
            background-color: darkslategray;

            transform: translateX(-50%)
        }
    }

    & > div {
        font-size: 0.925rem;
        padding: 0.75em 0.9em;
        
        display: flex;
        flex-direction: column;

        & > i {
            align-self: center;
        }
    }

    & * {
        /* border: 1px solid black; */
    }
`

export {
    StyledPopover
}