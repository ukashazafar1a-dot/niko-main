import React,{useContext, useEffect} from 'react';
import styled from 'styled-components';
import {useMediaQuery} from 'react-responsive';
import ScrollContainer from 'react-indiana-drag-scroll';
import {FinalImages} from '../Assets';
import { AppContext } from '../store/Index';
import fitty from 'fitty';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column-reverse;
    background-color: rgb(45, 48, 63);
    max-width: 100%;
    padding: 15px 20px 0px;

    @media screen and (min-width: 1025px){
        display: block;
        padding: 50px 20px 30px;
        width: calc(100vw - 420px);
        overflow-y: scroll;
        z-index: 4;
    }
`;

const Header = styled.div`
    -webkit-box-align: center;
    align-items: center;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    margin: 0px auto;
    max-width: 85%;
    padding: 10px 0px;

    h1{
        color: rgb(255, 255, 255);
        font-family: Raleway, Arial, Helvetica, sans-serif;
        font-size: 28px;
        font-weight: bold;
        margin: 0px;
        text-align: center;
        display: none;
    }

    @media screen and (min-width: 1025px){
        -webkit-box-pack: justify;
        justify-content: space-between;
        border-bottom: 1px solid rgb(87, 89, 100);
        margin: 0px auto 35px;
        h1 {
            display: block;
        }
    }
`;

const Button = styled.div`
    color: var(--secondary-colour);
    cursor: pointer;
    font-family: "Sofia Pro", Arial, Helvetica, sans-serif;
    font-size: 14px;
    font-weight: bold;
    padding: 10px 0px;
    text-align: center;

    svg {
        display: inline-block;
        margin-right: 3px;
    }

    @media screen and (min-width: 1025px){
        border: 0px;
    }
`;

const ImgsWrapper = styled.div`
    display: flex;
    margin: 0px -20px;
    max-width: calc(100% + 40px);
    overflow-x: scroll;
    padding-left: 20px;
    cursor: grab;

    &.isDragging{
        cursor: grabbing;
    }
    &::-webkit-scrollbar {
        display: none;
    }

    @media screen and (min-width: 1025px){
        padding-left: calc(12.5% - 40px);
    }
`;

const Image = styled.div`
    margin-right: 10px;
    position: relative;
    background-size: cover;
    background-position: center center;
    border-radius: 5px;
    width: 60vw;
    min-width: 60vw;
    height: 100vw;
    max-height: calc(42vw);
    user-select: none;
    pointer-events: none;

    @media screen and (min-width: 1025px){
        max-width: 32vw;
        min-width: 32vw;
        height: 100vw;
        max-height: 23vw;
    }
`;

const TextWrapper = styled.div`
    -webkit-box-align: center;
    align-items: center;
    display: flex;
    height: 53%;
    -webkit-box-pack: center;
    justify-content: center;
    left: 0px;
    position: absolute;
    text-align: center;
    top: 10%;
    width: 100%;
    white-space: pre;

    div {
        width: 35%;
    }
`;

// text-shadow: ${props=>props.shadow ? '0px 0px 40px rgba(calc(var(--red) + 40),calc(var(--green) + 40),calc(var(--blue) + 40),0.5),0px 0px 20px rgba(var(--red),var(--green),var(--blue),0.5),0px 0px 60px rgba(255,255,255,0.5),0px 0px 30px rgba(calc(var(--red) + 10),calc(var(--green) + 10),calc(var(--blue) + 10),0.5),0px 0px 150px rgba(255,255,255,0.5),0px 0px 4px rgba(255,255,255,0.5)' : 'none'};

const Text = styled.div`
    text-shadow: ${props=>props.shadow ? '0 2px 0 #562b00,0 3px 0 #1c0e00,0 4px 0 #562b00,5px 5px 5px rgba(0,0,0,.4),0 1px 0 #2e2e2e,0 6px 0 #2c2c2c,0 7px 0 #2c2c2c,3px 7px 15px rgba(0,0,0,.6)' : 'none'};
    transition: text-shadow 0.1s ease 0s;
    color: var(--sign-colour);
    line-height: var(--sign-lineheight);
    font-size: var(--sign-show-size);
    font-family: var(--sign-font);
    word-spacing: var(--sign-word-spacing);
    position: relative;
    z-index: 1;
    text-align: var(--sign-alignment);
    display: flex;
    font-weight: 500;
    letter-spacing: 0px;

    @media screen and (max-width: 767px){
        font-size: var(--sign-show-size-mobile);
    }
`;

function FinalDesign() {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' });
    const {changeIsFinal,text,lightOn,fontProperties} = useContext(AppContext);
    const handleChange = function(){
        changeIsFinal(false);
    };
    useEffect(()=>{
        fitty('.fit-text',{
            maxSize:512,
            minSize: isTabletOrMobile ? 8 : 12,
            multiLine: true
        });
    },[])
    return (
        <Wrapper>
          <Header>
            <h1>Your Neon</h1>
            <Button onClick={handleChange}>
              <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg" className="svelte-1kuplfa">
                <path d="M7.85156 1.89062C7.77344 1.8125 7.65625 1.8125 7.57812 1.89062L3.32031 6.14844L3.125 7.96484C3.08594 8.19922 3.30078 8.41406 3.53516 8.375L5.35156 8.17969L9.60938 3.92188C9.6875 3.84375 9.6875 3.72656 9.60938 3.64844L7.85156 1.89062ZM11.0156 1.44141L10.0586 0.484375C9.76562 0.191406 9.27734 0.191406 8.98438 0.484375L8.30078 1.16797C8.22266 1.24609 8.22266 1.36328 8.30078 1.44141L10.0586 3.19922C10.1367 3.27734 10.2539 3.27734 10.332 3.19922L11.0156 2.51562C11.3086 2.22266 11.3086 1.73438 11.0156 1.44141ZM7.5 7.02734V9H1.25V2.75H5.72266C5.80078 2.75 5.85938 2.73047 5.89844 2.69141L6.67969 1.91016C6.81641 1.75391 6.71875 1.5 6.50391 1.5H0.9375C0.410156 1.5 0 1.92969 0 2.4375V9.3125C0 9.83984 0.410156 10.25 0.9375 10.25H7.8125C8.32031 10.25 8.75 9.83984 8.75 9.3125V6.24609C8.75 6.03125 8.49609 5.93359 8.33984 6.07031L7.55859 6.85156C7.51953 6.89062 7.5 6.94922 7.5 7.02734Z" fill="currentColor"></path>
              </svg>Edit my design
            </Button>
          </Header>
              <ScrollContainer component={ImgsWrapper} vertical={false} 
              style={{userSelect: "none"}} draggingClassName='isDragging'>
            {FinalImages.map((img,index)=>{
                return <Image style={{backgroundImage:`url(${img})`}} key={index}>
                    <TextWrapper>
                        <Text shadow={lightOn}>
                        <span className="relative fit-text" style={{whiteSpace: "normal", display: "block", fontSize: fontProperties.fontSize}}>{text}</span>
                        </Text>
                    </TextWrapper>
                </Image>
            })}
            </ScrollContainer>
          {!isTabletOrMobile && <div className="mt-16">
            <div className="flex justify-between mt-16 mb-12 mx-auto w-3/4">
              <div className="flex items-center flex-col justify-between text-center w-1/5">
                <p className="text-sm text-gray-300">We ship your sign for FREE using Express International Shipping</p>
              </div>
              <div className="flex items-center flex-col justify-between text-center w-1/5">
                <p className="text-sm text-gray-300">Peace of mind with one year warranty</p>
              </div>
              <div className="flex items-center flex-col justify-between text-center w-1/5">
                <p className="text-sm text-gray-300">Tag us on Instagram so we can share!</p>
              </div>
            </div>
          </div>}
        </Wrapper>
    )
}

export default FinalDesign
