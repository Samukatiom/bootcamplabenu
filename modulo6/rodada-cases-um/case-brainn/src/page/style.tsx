import styled from "styled-components"

export const FullStyle = styled.main`
#Color0{
        background-color: #6BEFA3;
    }
    #Color1{
        background-color: #8666EF;
    }
    #Color2{
        background-color: #DD7AC6;
    }
    #Color3{
        background-color: #FFAB64;
    }
    #Color4{
        background-color: #5AAD7D;
    }
    #Color5{
        background-color: #BFAF83;
    }


    .full__sreen {
        display: flex;
        height: 100vh;
    }

    .section__light {
        height: 100vh;
        width: 75vw;
        border-top-left-radius: 100px 400px;
        border-bottom-left-radius: 100px 400px;
        border-top-right-radius: 0;
        background-color: #EFEFEF;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;

        .p__end {
            text-align: center;
            width: 65%;
            font-style: normal;
            font-weight: 400;
            font-size: 1.3vw;
            line-height: 20px;
            color: #000000;
            opacity: 70%;
        }
    }

    .section__color {
        height: 100vh;
        width: 25vw;
        background-color: #6BEFA3;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
    
    }

    @media ( max-width: 900px ) {

    .full__sreen {
        flex-direction: column;
    }
    
    .section__light {
        height: 60vh;
        width: 100vw;
        border-bottom-left-radius: 0;
        border-top-left-radius: 200px 50px;
        border-top-right-radius: 200px 50px;

        .p__end {
            font-size: 3vw;
            line-height: 20.64px;
        }
    }
    
    .section__color {
        width: 100vw;
        height: 50vh;
        justify-content: space-around;
    }
}
`
