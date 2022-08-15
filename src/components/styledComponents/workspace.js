import styled from "styled-components";

const StyledWorkspaceCtn = styled.div`
    padding: 2em 7em;
    font-size: 0.925rem;
    
    & * {
        /* border: 1px solid black; */
    }

    & > h1 {
        border-bottom: 1px solid black;
        padding-bottom: 0.25em;
    }

    // Show boards ctn
    & > div {
        margin-top: 1em;
        // Actual ctn displaying boards
        & > div {
            margin-top: 1em;
            display: flex;
            flex-wrap: wrap;
        }
    }
`

const StyledCreateBoard = styled.div`
    position: relative;
    height: 80px;
    width: 25%;
    max-width: 300px;
    min-width: fit-content;
    font-size: 0.825rem;

    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.25em;

    backdrop-filter: contrast(90%);
    transition: backdrop-filter 0.25s;

    &:hover {
        cursor: pointer;
        backdrop-filter: contrast(80%);
    }
    /* border: 1px solid black; */
`

// const 

export {
    StyledWorkspaceCtn,
    StyledCreateBoard
}