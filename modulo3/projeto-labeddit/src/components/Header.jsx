import styled from "styled-components"


const HeaderLab = styled.header`
    border-bottom: 1px solid cyan;
    box-shadow: 4px 1px 3px red;
    font-size: 1.2rem;
    text-shadow: red -2px 0, cyan 2px 0;

    padding: 5px;

    display: flex;
    align-items: center;

    .logo{
        margin-right: 7px;
        width: 3%;
        filter: drop-shadow(grey 1px 1px);
    }
`
export default function Header(){

    return(
        <HeaderLab>
            <h1>LabEddit</h1>
        </HeaderLab>
    )
}