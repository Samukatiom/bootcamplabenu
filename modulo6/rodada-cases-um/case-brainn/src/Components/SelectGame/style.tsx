import styled from "styled-components";

export const GameSelect = styled.select`
    background: #FFFFFF;
    border: none;
    width: 15vw;
    height: 7vh;
    border-radius: 7px;
    padding: 12px;

    :focus {
        box-shadow: 0 0 0 0;
        border: 0 none;
        outline: 0;
    }

    @media (max-width: 900px) {
        width: 50vw;
        height: 5vh;
    }
`