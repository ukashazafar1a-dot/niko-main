import React,{useContext} from 'react';
import styled from 'styled-components';

import {AppContext} from '../store/Index';

const Wrapper = styled.div`
    position: absolute;
    top: 10px;
    width: 90%;
`;

const SVG = styled.svg`
    color: white;

    .frame-preview.background--day & {
        color: rgb(153, 153, 153);
    }
`;

const FinishButton = styled.button`
    border: 0px;
    background: none;
    color: rgb(153, 153, 153);
    font-size: 16px;
    font-weight: bold;
    line-height: 1.5;
    opacity: ${props=>props.active == 'yes' ? '0.5': '1'};
    pointer-events: ${props=>props.active == 'yes' ? 'none' : 'auto'};
`;

function Topbar() {
    const {changeActiveOverlay, changeIsFinal,text} = useContext(AppContext);
    const handleChange = function(){
        changeActiveOverlay(true);
    };
    const handleChangeFinal = function(){
        changeIsFinal(true);
    };
    return (
      <Wrapper>
        <div className="flex items-center justify-between">
            <div className="w-1/3">
                <SVG width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={handleChange}>
                    <path d="M8.24609 15.9844L8.49219 15.7383C8.66797 15.5625 8.66797 15.3164 8.49219 15.1406L2.23438 8.84766H15.4531C15.6641 8.84766 15.875 8.67188 15.875 8.42578V8.07422C15.875 7.86328 15.6641 7.65234 15.4531 7.65234H2.23438L8.49219 1.39453C8.66797 1.21875 8.66797 0.972656 8.49219 0.796875L8.24609 0.550781C8.07031 0.375 7.82422 0.375 7.64844 0.550781L0.230469 7.96875C0.0546875 8.14453 0.0546875 8.39062 0.230469 8.56641L7.64844 15.9844C7.82422 16.1602 8.07031 16.1602 8.24609 15.9844Z" fill="currentColor"></path>
                </SVG>
            </div>
            
            <div className="w-1/3 text-right">
                <FinishButton onClick={handleChangeFinal} active={text.length < 3 ? 'yes':'no'}>Finish</FinishButton>
            </div>
        </div>
      </Wrapper>
    )
}

export default Topbar
