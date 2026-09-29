import React,{useContext,useEffect,useRef,useState} from 'react';
import styled from 'styled-components';
import { AppContext } from '../store/Index';

const Wrapper = styled.div`
    position: absolute;
    transition: opacity 0.5s ease 0s;
    inset: 0px;
    opacity: ${props=>props.active ? '1' : '0'};
    pointer-events: ${props=>props.active ? 'auto' : 'none'};
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    width: 100%;
    z-index: 999;
`;

const Overlay = styled.div`
    -webkit-box-align: center;
    align-items: center;
    background: rgb(45, 48, 63);
    display: flex;
    height: 100%;
    -webkit-box-pack: center;
    justify-content: center;
    left: 0px;
    opacity: 0.95;
    position: absolute;
    top: 0px;
    width: 100%;
    z-index: 1000;
`;

const Wrapper02 = styled.div`
    -webkit-box-align: center;
    align-items: center;
    background-color: transparent;
    display: flex;
    flex-direction: column;
    height: auto;
    padding: 0px 15px;
    position: relative;
    z-index: 1001;
    width: 100%;
    border-top: 1px solid rgb(255, 255, 255);
    border-bottom: 1px solid rgb(255, 255, 255);
`;

// text-shadow: ${props=>props.active ? '0px 0px 40px rgba(calc(var(--red) + 40),calc(var(--green) + 40),calc(var(--blue) + 40),0.5),0px 0px 20px rgba(var(--red),var(--green),var(--blue),0.5),0px 0px 60px rgba(255,255,255,0.5),0px 0px 30px rgba(calc(var(--red) + 10),calc(var(--green) + 10),calc(var(--blue) + 10),0.5),0px 0px 150px rgba(255,255,255,0.5),0px 0px 4px rgba(255,255,255,0.5)':'none'};

const TextArea = styled.textarea`
    text-shadow: ${props=>props.active ? '0 2px 0 #562b00,0 3px 0 #1c0e00,0 4px 0 #562b00,5px 5px 5px rgba(0,0,0,.4),0 1px 0 #2e2e2e,0 6px 0 #2c2c2c,0 7px 0 #2c2c2c,3px 7px 15px rgba(0,0,0,.6)':'none'};
    transition: text-shadow 0.1s ease 0s;
    color: #ffffff;
    line-height: var(--sign-lineheight);
    font-size: var(--sign-size);
    font-family: var(--sign-font);
    word-spacing: var(--sign-word-spacing);
    background: transparent;
    border: 0px;
    width: 100%;
    padding: 50px 0px;
    text-align: center;
    outline: 0px;
    letter-spacing: 0px;
    font-weight: 500;

    @media only screen and (max-width: 768px) {
        font-size: 30px !important;
    }
`;

function TextPopup() {
    const {activePopup,changeActivePopup,text,changeText,lightOn} = useContext(AppContext);
    const [textValue, setTextValue] = useState(text);
    const textareaRef = useRef(null)
    const handleChange = function(active){
        changeText(textValue);
        changeActivePopup(active);
    }
    const handleTextChange = function(e){
        setTextValue(e.target.value);
    };

    useEffect(()=>{
        setTextValue(text)
    },[text])

    useEffect(()=>{
        if(activePopup && textareaRef.current){
            textareaRef.current.focus();
        }
    },[activePopup])
    return (
        <Wrapper active={activePopup}>
           <Overlay onClick={()=>handleChange(false)} ></Overlay>
           <Wrapper02>
              <div className="items-center flex flex-col py-2">
                  <TextArea ref={textareaRef} active={lightOn} onChange={(e)=>handleTextChange(e)} value={textValue} />
              </div>
           </Wrapper02>
        </Wrapper>
    )
}

export default TextPopup
