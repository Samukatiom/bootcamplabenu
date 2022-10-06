import styled from "styled-components"

export const ContestInformation = styled.section`
    color: #FFFFFF;
    display: flex;
    flex-direction: column;
    align-items:flex-start;
    width: 100%;

    div {
        display: flex;
        font-weight: 700;
    }
    
    .p__contests {
        text-transform: uppercase;
        font-size: 1.3vw;
        margin-bottom: 0.5vw;
    }

    .hyphen {
        margin-left: 0.5vw;
        margin-right: 0.5vw;
    } 

    .mobile__n {
        display: none;
    }
    
    @media (max-width: 900px) {
            flex-direction: row;
            font-weight: 500;
            line-height: 17px;

            div {
                font-weight: 500;
            }

            .p__contests {
                text-transform: none;
                font-size: 4vw;
                margin-bottom: 0;
            }

            .hyphen , .date{
                display: none;
            }
            .mobile__n{
            display: inline;
            margin: 0 0.3rem 0 0.3rem;
        }
    }
`