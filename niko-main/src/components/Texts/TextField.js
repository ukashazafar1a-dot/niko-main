import React,{useState,useContext, useEffect} from 'react';
import styled from 'styled-components';
import {AppContext} from '../../store/Index';
import { useMediaQuery } from 'react-responsive';


const Label = styled.label`
    color: rgb(62, 62, 62);
    display: flex;
    position: relative;
    align-items: baseline;
    font-size: 14px;
    margin-bottom: 10px;
    font-weight: bold;

    & span.info-icon{
        position: relative;
        margin-left: 0.3rem;
    }

    & .info-icon:hover .tooltip-wrapper {
        display: inline-block;
    }
`;

const ToolTip = styled.span`
    display: none;
    font-weight: 400;
    font-size: 10px;
    color: var(--primary-colour);
    position: absolute;
    background: white;
    border: 1px solid #e8e8e1;
    padding: 5px;
    width: 12rem;
    z-index: 99;

    &[data-position='right']{
        left: calc(100% + 12px);
        top: 0;
    }

    &[data-position='left']{
        right: calc(100% + 12px);
        top: 0;
    }

    &[data-position='top']{
        bottom: calc(100% + 12px);
        right: 12px;
        transform: translateX(50%);
    }

    & .tooltip-anchor {
        position: absolute;
        width: 0;
        height: 0;
        border: 10px;
        border-style: solid;
 
    }

    & .tooltip-text {
        display: block;
    }

    &[data-position='top'] .tooltip-anchor{
        border-color: #e8e8e1 transparent transparent transparent;
        bottom: 0;
        transform: translate(-50%, 100%);
        left: 50%;
    }
    &[data-position='right'] .tooltip-anchor{
        border-color: transparent #e8e8e1 transparent transparent;
        top: 0px;
        left: -20px;
    }
    &[data-position='left'] .tooltip-anchor{
        border-color: transparent transparent transparent #e8e8e1;
        top: 0px;
        right: -20px;
    }
    @media (min-width: 1025px){
        font-size: 12px;
        white-space: initial;
    }
`;

const TextArea = styled.textarea`
    background: rgb(250, 250, 250);
    border: 0px;
    border-radius: 4px;
    font-size: 16px;
    font-family: inherit;
    word-spacing: var(--sign-word-spacing);
    line-height: var(--sign-lineheight);
    padding: 12px;
    color: var(--primary-colour);
    font-weight: 600;
    letter-spacing: 0px;
`;

function TextField() {
    const {changeText,text,changeMeasurements,changeFontProperties} = useContext(AppContext);
    const [textValue,setTextValue] = useState(text);
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' });

    const getStyle = function(el,styleprop){
            var dash = /-(.)/g;
            function toHump(a, b){return b.toUpperCase();};
            String.prototype.encamel = ()=>this.replace(dash, toHump);

            el = document.querySelector(el);
            if(window.getComputedStyle){
                return document.defaultView.getComputedStyle(el, null).getPropertyValue(styleprop);
            }
            else if(el.currentStyle){
                return el.currentStyle[styleprop.encamel()];
            }
            return null;
    }

    const handleChange = function(event){
        let value = event.target.value;
        let fontSize = document.querySelector('.fit-text').style.fontSize;
        let lineHeight = getStyle('.fit-text', 'line-height');
        setTextValue(value);
        changeText(value);
        changeFontProperties({fontSize,lineHeight});
        changeMeasurements();
    }

    useEffect(()=>{
        let fontSize = document.querySelector('.fit-text').style.fontSize;
        let lineHeight = getStyle('.fit-text', 'line-height');
        changeFontProperties({fontSize,lineHeight})
    },[]);

    useEffect(()=>{
        setTextValue(text)
    },[text])

    return (
        <div className="flex flex-col mb-3">
            <Label>{'GIB HIER DEINEN WUNSCHTEXT EIN'}
                <span className='info-icon'>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--secondary-colour)"><path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>    
                    <ToolTip className='tooltip-wrapper' data-position={isTabletOrMobile ? 'left' : 'left'}>
                        <span className='tooltip-text'>Teile, die nicht verbunden dargestellt werden, sind am Ende auch einzeln. Schriftzüge aus mehreren Wörtern können dementsprechend wie gewünscht platziert werden.</span>
                        <span className='tooltip-anchor'></span>
                    </ToolTip>
                </span>
            </Label>
            <TextArea onChange={handleChange} value={textValue} placeholder='Text hier eingeben' />
        </div>
    )
}

export default TextField
