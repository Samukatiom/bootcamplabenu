import styled from "styled-components";

export const ListNumber = styled.ul`
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
    justify-self: center;
    position: relative;
    top: 10vw;

    li {
            background-color: #FFFFFF;
            padding: 1.5vw;
            border-radius: 100px;
            margin: 0.5vw;
    }

@media (max-width: 900px) {
    
    li {
            padding: 4.5vw;
            margin: 2vw;
    }
}

`