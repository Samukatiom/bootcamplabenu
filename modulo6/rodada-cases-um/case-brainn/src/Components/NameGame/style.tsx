import styled from "styled-components"

export const FigureGame = styled.figure`
        color: #FFFFFF;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        font-size: 1.7vw;
        font-weight: 700;
        line-height: 36.57px;

        img {
            margin-bottom: 0;
            margin-right: 1vw;
        }

        @media (max-width: 900px) {
            font-size: 4vw;
            width: 100vw;
            flex-direction: column;
            img {
                margin-bottom: 1.2vh;
                margin-right: 0;
            }
        }
`