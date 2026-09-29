import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { AppContext } from '../../store/Index';
import { GetErrorMessage } from '../../helpers/general';
import { Fonts } from '../../Assets';
import { useMediaQuery } from 'react-responsive';
import SizeGuide from '../Snippets/SizeGuide';

const SliderContainer = styled.div`
    position: relative;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction:column;
    background-color: inherit;
    border-radius: 0px;
    overflow: hidden;
    padding: 8px 10px;

    & .slider-header{
        display: flex;
        justify-content: space-between;
        padding: 0.7rem 1rem;
        width: 100%;
    }

    @media screen and (max-width: 767px) {
        margin-bottom: 1rem;
    }
`;

const SliderControlsWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    opacity: ${props=>props.active == 'yes' ? '1': '0.5'};

    & svg{
        width: 16px;
        height: 12px;
    }
`;

const Slider = styled.input`
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    max-width: 78%;
    width: 100%;
    background-color: transparent;
    border:none;
    pointer-events: ${props=>props.active == 'yes' ? 'auto' : 'none'};

    &:focus {
      outline-color: #f8b195;
    }

    &::-webkit-slider-runnable-track {
        -webkit-appearance: none;
        appearance: none;
        height: 3px;
        background: rgb(246, 114, 128);
        background: -webkit-linear-gradient(
            left,
            var(--primary-colour) 0%,
            var(--primary-colour) 50%,
            var(--primary-colour) 100%
        );
        background: linear-gradient(
            to right,
            var(--primary-colour) 0%,
            var(--primary-colour) 50%,
            var(--primary-colour) 100%
        );
        filter: progid:DXImageTransform.Microsoft.gradient(
            startColorstr="#f67280",
            endColorstr="#355c7d",
            GradientType=1
        );
    }

    &::-moz-range-track {
        -moz-appearance: none;
        appearance: none;
        height: 3px;
        background: rgb(246, 114, 128);
        background: -moz-linear-gradient(
        left,
        var(--primary-colour) 0%,
        var(--primary-colour) 50%,
        var(--primary-colour) 100%
        );
        background: linear-gradient(
        to right,
        var(--primary-colour) 0%,
        var(--primary-colour) 50%,
        var(--primary-colour) 100%
        );
        filter: progid:DXImageTransform.Microsoft.gradient(
            startColorstr="#f67280",
            endColorstr="#355c7d",
            GradientType=1
        );
    }
  
    &::-ms-track {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        height: 3px;
        background: rgb(246, 114, 128);
        background: -moz-linear-gradient(
            left,
            var(--primary-colour) 0%,
            var(--primary-colour) 50%,
            var(--primary-colour) 100%
        );
        background: -webkit-linear-gradient(
            left,
            var(--primary-colour) 0%,
            var(--primary-colour) 50%,
            var(--primary-colour) 100%
        );
        background: linear-gradient(
            to right,
            var(--primary-colour) 0%,
            var(--primary-colour) 50%,
            var(--primary-colour) 100%
        );
        filter: progid:DXImageTransform.Microsoft.gradient(
            startColorstr="#f67280",
            endColorstr="#355c7d",
            GradientType=1
        );
    }

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        border: 2px solid var(--primary-colour);
        border-radius: 50%;
        height: 20px;
        width: 20px;
        position: relative;
        bottom: 8px;
        background: var(--primary-colour);
        background-size: 50%;
        box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.4);
        cursor: grab;
            
        &:active {
            cursor: grabbing;
        }
    }


    &::-moz-range-thumb {
        -moz-appearance: none;
        appearance: none;
        border: 2px solid var(--primary-colour);
        border-radius: 50%;
        height: 20px;
        width: 20px;
        position: relative;
        bottom: 8px;
        background: var(--primary-colour);
        background-size: 50%;
        box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.4);
        cursor: grab;
        
        &:active {
            cursor: grabbing;
        }
    }

    &::-ms-thumb {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        border: 2px solid var(--primary-colour);
        border-radius: 50%;
        height: 20px;
        width: 20px;
        position: relative;
        bottom: 8px;
        background: var(--primary-colour);
        background-size: 50%;
        box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.4);
        cursor: grab;
        
        &:active {
            cursor: grabbing;
        }
    }
`;

const Label = styled.label`
    color: #000;
    display: flex;
    position: relative;
    align-items: baseline;
font-family: 'Inter' ;
    margin-bottom: 10px;
        font-weight: 700 !important;
    letter-spacing: 0.2px !important;
    font-size:13px !important;

    & b{
        margin-left: 3px;
        text-transform: capitalize;
    }

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
    font-size: 9px;
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

const Error = styled.p`
    color: #fb485e;
    font-size: 12px;
    margin-bottom: 10px;
    font-weight: bold;
`;

const Wrapper = styled.div`
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    flex-wrap: wrap;

    > * {
        width: calc(100% - 10px);
    }
`;

const FrequentSizesWrapper = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    width: calc(100% + 30px);
    max-width: calc(100% + 30px);
    padding-block:10px;
    margin: 0 -15px;
    overflow: scroll hidden;

    @media screen and (min-width: 1025px) {
        flex-wrap: wrap;
        overflow: unset;
        margin: 0 -5px;
    }
    
    & .frequent-sizes--item {
        cursor: pointer;
        padding: 10px;
        border: 1px solid rgb(221, 221, 221);
        margin: 0 8px 5px 3px;
        font-size: calc(var(--typeBaseSize)* .92);
        font-weight: 400;
        &.custom-item {
            width: calc(100% - 30px);

            & .selection--img{
                line-height: 1;
                font-size: 0.6875em;
                padding-top: 4px;
                text-align: center;
                margin: 0;
                &::after {
                    content:"";
                    display: inline-block;
                    width: 32px;
                    height: 32px;
                    background-image: url(https://cdn.shopify.com/s/files/1/0498/2145/0397/files/finger-png-43089.png?v=1715454684);
                    background-repeat: no-repeat;
                    background-size: cover;
                }
            }
        }
    }

    & .frequent-sizes--item.disabled{
        opacity: 0.5;
        pointer-events: none;
    }
    & .frequent-sizes--item.selected{
        position: relative;
        border-width: 1px;
        border-style: solid;
        border-image: initial;
        box-shadow: 0 0 0 2px var(--colorTextBody);
    }
    & .frequent-sizes--item.selected::before{
        content: " ";
        position: absolute;
        width: 23px;
        height: 23px;
        background: #000;
        top: -11px;
        right: -15px !important;
        border-radius: 50%;
        color: #fff;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1;
        background-image: url(https://cdn.shopify.com/s/files/1/0765/1301/8186/files/hd-white-tick-mark-icon-transparent-background-701751695051247opp5aqwrto-removebg-preview.png?v=1739264316);
        background-size: 60%;
        background-repeat: no-repeat;
        background-position: center;
        padding: 5px;
    }
    & .frequent-sizes-label {
        text-align: center;
        margin: 0;
        white-space: nowrap;
    }
    & .frequent-sizes-value {
        text-align: center;
        font-size: 13px;
        color: var(--secondary-colour);
        margin: 0;
    }
`;

const sizeLabels = ['S','M','L','XL','XXL','2XL']

function SizeControls({length,height,setLength,setHeight}) {
    const {updating,loadings,font,text,frequent_sizes} = useContext(AppContext);
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' });

    const [configureSize,setConfigureSize] = useState(false)
    const [selectedSize,setSelectedSize] = useState('custom')

    const handleChangeHeight = function(value){
        setHeight(value)
    }

    const handleChangeWidth = function(value){
        setLength(value)
    }

    const isCustomSize = function(sizes,height){
        let selectedSize = sizes.find((size)=>size.height/10 === height);
        if(selectedSize) return false;
        return true;
    }

    const handleChangeSize = function(value,label){
        setHeight(value)
        setSelectedSize(label)
    }

    const renderErrorMessage = function(){
        const error = GetErrorMessage(length,height,Fonts[font].name,text);
        return error ? <Error>{error}</Error> : '';
    }

    const renderFrequentSizes = function(sizes) {
        let index = 0;
        return sizes.map((item)=>{
            if(item.width/10 < 30 || item.width/10 > 400) return ''
            const label = sizeLabels[index];
            index++;
            return <div className={`frequent-sizes--item${(selectedSize === label) ? ' selected' : ''}${updating ? ' disabled':''}`} onClick={(e)=>handleChangeSize((item.height/10),label)}>
                <p className='frequent-sizes-label'>
                    {label}{" ("}{(item.width/10)}{"cm"}{" x "}{item.height/10}{"cm"}{")"}
                </p>
            </div>
        })
    }

    // S = 8cm
    // M = 10cm
    // L = 12cm
    // XL = 15cm
    // XXL = 18cm
    // 2XL = 20cm

    useEffect(() => {
        setConfigureSize(isCustomSize(frequent_sizes,height))
    },[height,frequent_sizes])

  return (
    <div className="relative lg:mt-4 mt-5">
        <Label>{'Größe —'}<b>{length}{"x"}{height}{"cm"}</b>
            <span className='info-icon'>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--secondary-colour)"><path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>    
                <ToolTip className='tooltip-wrapper' data-position={isTabletOrMobile ? 'left' : 'left'}>
                    <span className='tooltip-text'>Die Maße beziehen sich auf den Text, als wäre er in einer einzigen Zeile dargestellt, auch wenn er auf mehrere Zeilen verteilt angezeigt wird. Die Texthöhe wird durch die oberste Stelle des höchsten und die unterste Stelle des niedrigsten Buchstabens definiert. Fertigungstoleranzen können zu geringfügigen Abweichungen führen.</span>
                    <span className='tooltip-anchor'></span>
                </ToolTip>
            </span>
            <SizeGuide/>
        </Label>
        {frequent_sizes.length > 0 && <FrequentSizesWrapper>
            {renderFrequentSizes(frequent_sizes)}
        </FrequentSizesWrapper>}
        {<FrequentSizesWrapper>
            <div className={`frequent-sizes--item custom-item ${selectedSize === 'custom' ? ' selected' : '' }${updating ? ' disabled':''}`} onClick={(e)=>setSelectedSize('custom')}>
            <p className='frequent-sizes-label'>
                Eigene Maßeinstellungen konfigurieren
            </p>
            <p className='selection--img'></p>
        </div></FrequentSizesWrapper>}
        {text.length > 0 ? renderErrorMessage() : ''} 
           
        <Wrapper style={{display: selectedSize === 'custom' ? 'block' : 'none'}}>
            <SliderContainer>
                <div className='slider-header'>
                    <div className='slider-title'>
                        <span>Länge</span>
                    </div>
                    <div className='slider-value'>{loadings.width ? ('...') : (length+' cm')}</div>
                </div>
                <SliderControlsWrapper active={(text.length > 0 && !updating) ? 'yes' : 'no'}>
                    <button type="button" aria-label="Artikelmenge um eins reduzieren" style={{border: '1px solid #e6e6e6',padding: '5px', pointerEvents: (text.length > 0 && !updating) ? 'auto' : 'none'}} onClick={(e)=>handleChangeWidth(length-1)}>
                        <svg aria-hidden="true" focusable="false" role="presentation" className="icon icon-minus" viewBox="0 0 20 20">
                            <path fill="#444" d="M17.543 11.029H2.1A1.032 1.032 0 0 1 1.071 10c0-.566.463-1.029 1.029-1.029h15.443c.566 0 1.029.463 1.029 1.029 0 .566-.463 1.029-1.029 1.029z"></path>
                        </svg>
                    </button>
                    <Slider type="range" min="30" max="400" step={'1'} value={length} active={(text.length > 0 && !updating) ? 'yes' : 'no'} onChange={(e)=>handleChangeWidth(e.currentTarget.value)}/>
                    <button type="button" aria-label="Artikelmenge um eins erhöhen" style={{border: '1px solid #e6e6e6',padding: '5px', pointerEvents: (text.length > 0 && !updating) ? 'auto' : 'none'}} onClick={(e)=>handleChangeWidth(length+1)}>
                        <svg aria-hidden="true" focusable="false" role="presentation" className="icon icon-plus" viewBox="0 0 20 20">
                            <path fill="#444" d="M17.409 8.929h-6.695V2.258c0-.566-.506-1.029-1.071-1.029s-1.071.463-1.071 1.029v6.671H1.967C1.401 8.929.938 9.435.938 10s.463 1.071 1.029 1.071h6.605V17.7c0 .566.506 1.029 1.071 1.029s1.071-.463 1.071-1.029v-6.629h6.695c.566 0 1.029-.506 1.029-1.071s-.463-1.071-1.029-1.071z"></path>
                        </svg> 
                    </button>
                </SliderControlsWrapper>
                
            </SliderContainer>
            {/* <SliderContainer>
                <div className='slider-header'>
                    <div className='slider-title'>
                        <span>Höhe</span>
                    </div>
                    <div className='slider-value'>{loadings.height ? ('...') : (height+' cm')}</div>
                </div>
                <Slider type="range" min="5" max="50" step={'.5'} value={height} onChange={(e)=>handleChangeHeight(e.currentTarget.value)}/>
            </SliderContainer> */}
        </Wrapper>
    </div>
  )
}

export default SizeControls