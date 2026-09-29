// import React,{useState,useContext} from 'react';
// import styled from 'styled-components';

// import {AppContext} from '../../store/Index';

// import {Colors} from '../../Assets';
// import { useMediaQuery } from 'react-responsive';

// const SectionLabel = styled.label`
//     color: #000;
//     display: flex;
//     position: relative;
//     align-items: baseline;
//     margin-bottom: 10px;
//      font-weight: 700 !important;
//     letter-spacing: 0.2px !important;
//    font-family: 'Inter' ;
//    font-size:13px !important;
//     & .selected-color-value{
//         font-weight: bold;
//         margin-left: 3px;
//              text-transform: capitalize;
//     }
//     & span.info-icon{
//         position: relative;
//         margin-left: 0.75rem;
//     }

//     & .info-icon:hover .tooltip-wrapper {
//         display: inline-block;
//     }
// `;

// const ToolTip = styled.span`
//     display: none;
//     font-weight: 400;
//     font-size: 10px;
//     color: var(--primary-colour);
//     position: absolute;
//     background: white;
//     border: 1px solid #e8e8e1;
//     padding: 5px;
//     width: 9rem;

//     &[data-position='right']{
//         left: calc(100% + 12px);
//         top: 0;
//     }

//     &[data-position='top']{
//         bottom: calc(100% + 12px);
//         right: 12px;
//         transform: translateX(50%);
//     }

//     & .tooltip-anchor {
//         position: absolute;
//         width: 0;
//         height: 0;
//         border: 10px;
//         border-style: solid;

//     }

//     & .tooltip-text {
//         display: block;
//     }

//     &[data-position='top'] .tooltip-anchor{
//         border-color: #e8e8e1 transparent transparent transparent;
//         bottom: 0;
//         transform: translate(-50%, 100%);
//         left: 50%;
//     }
//     &[data-position='right'] .tooltip-anchor{
//         border-color: transparent #e8e8e1 transparent transparent;
//         top: 0px;
//         left: -20px;
//     }
//     @media (min-width: 1025px){
//         font-size: 12px;
//         white-space: initial;
//     }
// `;

// const Wrapper = styled.div`
//     display: flex;
//     flex-wrap: nowrap;
//     margin: 0px -15px;
//     max-width: calc(100% + 30px);
//     overflow: scroll hidden;
//     width: calc(100% + 30px);
//     padding-top: 7px;
//     align-items: center;
//     justify-content:flex-start;
//     gap: 0.8em;
//     @media screen and (min-width: 1025px) {
//         flex-wrap: wrap;
//         max-width: 100%;
//         margin: 0px;
//         overflow-x: hidden;
//     }
// `;

// const Button = styled.button`
//     background: none;
//     border: 0px;
//     padding: 5px 6px 5px;
//     margin: 0 3px;

//     &:first-of-type {
//         margin-left: 15px;

//     }

//     @media (min-width: 1025px){
//         align-items: flex-start;
//         border: 0px;
//         color: rgb(179, 179, 179);
//         cursor: pointer;
//         display: flex;
//         height: auto;
//         margin: 0px;
//         padding: 10px 0px;
//         position: relative;
//         text-transform: capitalize;

//         text-align: center;
//         -webkit-box-pack: center;
//         justify-content: center;

//         &:first-of-type {
//             margin-left: 3px;
//         }
//     }
// `;

// const ColorSwatch = styled.span`
//     border: 0.5px solid rgb(159, 159, 159);
//     border-radius: 50%;
//     display: inline-block;
//     height: 45px;
//     background: ${props =>
//         props.$isGlassy
//             ? `-webkit-linear-gradient(top, transparent, transparent) 0% 0% / cover text, url("https://cdn.shopify.com/s/files/1/0765/1301/8186/files/neon-${props.$overlay}-overlay.jpg?v=1720720703") center center no-repeat`
//             : props.$color || 'none'};
//     background-size: cover;
//     position: relative;

//     width: 45px;

//     @media (min-width: 1025px) {
//         height: 40px;
//         width: 40px;
//     }
// `;

// const ActiveColorSwatch = styled(ColorSwatch)`
//     &::before {
//         content: " ";
//         position: absolute;
//           width: 23px;
//           height: 23px;
//         background: #000;
//         top: -11px;
//         right: -2px !important;
//         border-radius: 50%;
//         color: #fff;
//         text-align: center;
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         z-index: 1;
//         background-image: url("https://cdn.shopify.com/s/files/1/0765/1301/8186/files/hd-white-tick-mark-icon-transparent-background-701751695051247opp5aqwrto-removebg-preview.png?v=1739264316");
//         background-size: 60%;
//         background-repeat: no-repeat;
//         background-position: center;
//         padding: 5px;
//         border: 1px solid #fff;
//     }
//     @media (min-width: 1025px) {
//         &::before {
//             width: 23px;
//             height: 23px;

//         }
//     }
// `;

// const Label = styled.span`
//     font-weight: 400;
//     padding-top: 7px;
//     font-size: 10px;
//     text-transform: capitalize;
//     color: #000;
//     white-space: nowrap;
//     letter-spacing: 0px;

//     @media (min-width: 1025px){
//         font-size: 14px;
//         white-space: initial;
//     }
// `;

// const ActiveLabel = styled(Label)`
//     font-weight: bold;
// `;

// function Color() {

//     const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' });

//     const {color,changeColor} = useContext(AppContext);

//     const handleChange = function(position){
//         changeColor(position);
//     }

//     return (

//         <div className="relative lg:mt-4 mt-5">

//         <div className="flex justify-between items-center">
//             <SectionLabel>MATERIAL —<span className='selected-color-value'>{Colors[color].name}</span>
//                 {/* <span className='info-icon'>
//                     <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--secondary-colour)"><path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
//                     <ToolTip className='tooltip-wrapper' data-position={isTabletOrMobile ? 'top' : 'right'}>
//                         <span className='tooltip-text'>Some text inside the tooltip for informational purpose.</span>
//                         <span className='tooltip-anchor'></span>
//                     </ToolTip>
//                 </span> */}
//             </SectionLabel>
//         </div>
//         <Wrapper>
//             {Colors.map((item,index)=>{

//                 if(index == color){
//                     return <Button onClick={()=>handleChange(index)} key={index}>
//                         <div className="flex flex-col items-center  ">
//                           <ActiveColorSwatch $isGlassy={item.glassy} $overlay={item.handle} $color={item.code} style={{backgroundColor: item.code, boxShadow:'0 0 0 2px #000', border:'none'}}></ActiveColorSwatch>
//                           {/* <ActiveLabel>{item.name}</ActiveLabel> */}
//                         </div>
//                     </Button>
//                 }else{
//                     return <Button onClick={()=>handleChange(index)} key={index}>
//                         <div className="flex flex-col items-center">
//                           <ColorSwatch $isGlassy={item.glassy} $overlay={item.handle} $color={item.code} style={{backgroundColor: item.code}}  ></ColorSwatch>
//                           {/* <Label>{item.name}</Label> */}
//                         </div>
//                     </Button>
//                 }
//             })}
//         </Wrapper>
//      </div>
//     )
// }

// export default Color

import React, { useContext, useMemo, useState } from "react";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";

import { AppContext } from "../../store/Index";
import { Colors } from "../../Assets";

const SectionLabel = styled.label`
  color: #000;
  display: flex;
  position: relative;
  align-items: baseline;
  margin-bottom: 10px;
  font-weight: 700 !important;
  letter-spacing: 0.2px !important;
  font-family: "Inter";
  font-size: 13px !important;

  & .selected-color-value {
    font-weight: bold;
    margin-left: 3px;
    text-transform: capitalize;
  }

  & span.info-icon {
    position: relative;
    margin-left: 0.75rem;
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
  width: 9rem;
  z-index: 10;

  &[data-position="right"] {
    left: calc(100% + 12px);
    top: 0;
  }

  &[data-position="top"] {
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

  &[data-position="top"] .tooltip-anchor {
    border-color: #e8e8e1 transparent transparent transparent;
    bottom: 0;
    transform: translate(-50%, 100%);
    left: 50%;
  }

  &[data-position="right"] .tooltip-anchor {
    border-color: transparent #e8e8e1 transparent transparent;
    top: 0;
    left: -20px;
  }

  @media (min-width: 1025px) {
    font-size: 12px;
    white-space: initial;
  }
`;

/* New material tabs */

const MaterialTabs = styled.div`
  display: flex;
  gap: 10px;
  margin: 0 0 16px;
  overflow-x: auto;
  padding: 2px 1px 5px;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 1025px) {
    flex-wrap: wrap;
    overflow: visible;
  }
`;

const MaterialTab = styled.button`
  flex: 0 0 auto;
  min-width: 145px;
  padding: 11px 15px;
  border: 1px solid ${({ $active }) => ($active ? "#202326" : "#a7a7a7")};
  border-radius: 11px;
  background: ${({ $active }) => ($active ? "#202326" : "#ffffff")};
  color: ${({ $active }) => ($active ? "#ffffff" : "#222222")};
  cursor: pointer;
  text-align: left;
  transition:
    background-color 0.15s ease,
    color 0.15s ease,
    border-color 0.15s ease;

  &:hover {
    border-color: #202326;
  }

  &:focus-visible {
    outline: 2px solid #000;
    outline-offset: 2px;
  }
`;

const MaterialTabTitle = styled.span`
  display: block;
  font-family: "Inter", sans-serif;
  font-size: 13px;
  font-weight: 600;
  line-height: 1.2;
`;

const MaterialTabDescription = styled.span`
  display: block;
  margin-top: 4px;
  color: ${({ $active }) => ($active ? "#bfc1c3" : "#777777")};
  font-family: "Inter", sans-serif;
  font-size: 10px;
  line-height: 1.2;
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  margin: 0 -15px;
  max-width: calc(100% + 30px);
  overflow: scroll hidden;
  width: calc(100% + 30px);
  padding-top: 7px;
  align-items: center;
  justify-content: flex-start;
  gap: 0.8em;

  @media screen and (min-width: 1025px) {
    flex-wrap: wrap;
    max-width: 100%;
    margin: 0;
    overflow-x: hidden;
  }
`;

const Button = styled.button`
  background: none;
  border: 0;
  padding: 5px 6px;
  margin: 0 3px;

  &:first-of-type {
    margin-left: 15px;
  }

  @media (min-width: 1025px) {
    align-items: flex-start;
    border: 0;
    color: rgb(179, 179, 179);
    cursor: pointer;
    display: flex;
    height: auto;
    margin: 0;
    padding: 10px 0;
    position: relative;
    text-transform: capitalize;
    text-align: center;
    justify-content: center;

    &:first-of-type {
      margin-left: 3px;
    }
  }
`;

const ColorSwatch = styled.span`
  border: 0.5px solid rgb(159, 159, 159);
  border-radius: 50%;
  display: inline-block;
  height: 45px;

  background: ${(props) =>
    props.$isGlassy
      ? `-webkit-linear-gradient(
            top,
            transparent,
            transparent
          ) 0% 0% / cover text,
          url("https://cdn.shopify.com/s/files/1/0765/1301/8186/files/neon-${props.$overlay}-overlay.jpg?v=1720720703")
          center center no-repeat`
      : props.$color || "none"};

  background-size: cover;
  position: relative;
  width: 45px;

  @media (min-width: 1025px) {
    height: 40px;
    width: 40px;
  }
`;

const ActiveColorSwatch = styled(ColorSwatch)`
  &::before {
    content: "";
    position: absolute;
    width: 23px;
    height: 23px;
    background-color: #000;
    top: -11px;
    right: -2px;
    border-radius: 50%;
    z-index: 1;

    background-image: url("https://cdn.shopify.com/s/files/1/0765/1301/8186/files/hd-white-tick-mark-icon-transparent-background-701751695051247opp5aqwrto-removebg-preview.png?v=1739264316");
    background-size: 60%;
    background-repeat: no-repeat;
    background-position: center;

    padding: 5px;
    border: 1px solid #fff;
    box-sizing: border-box;
  }
`;

const MATERIAL_TYPES = [
  {
    id: "acrylic-3",
    title: "Acrylglas 3 mm",
    description: "Hochglanz / Matt",
    matches: (item) =>
      item.name.toLowerCase().includes("acrylglas") &&
      item.name.includes("(3 mm)"),
  },
  {
    id: "acrylic-5",
    title: "Acrylglas 5 mm",
    description: "Hochglanz / Matt",
    matches: (item) =>
      item.name.toLowerCase().includes("acrylglas") &&
      item.name.includes("(5 mm)"),
  },
  {
    id: "wood-3",
    title: "Holz 3 mm",
    description: "Birke / Pappel / HDF / Eiche",
    matches: (item) =>
      !item.name.toLowerCase().includes("acrylglas") &&
      item.name.includes("(3 mm)"),
  },
];

function getMaterialTypeFromColor(item) {
  return (
    MATERIAL_TYPES.find((materialType) => materialType.matches(item)) ??
    MATERIAL_TYPES[0]
  );
}

function Color() {
  const isTabletOrMobile = useMediaQuery({
    query: "(max-width: 1024px)",
  });

  const { color, changeColor } = useContext(AppContext);

  /*
   * The starting tab follows the currently selected color.
   * This prevents the selected swatch from being hidden on initial render.
   */
  const initialMaterialType = getMaterialTypeFromColor(Colors[color]);

  const [selectedType, setSelectedType] = useState(initialMaterialType.id);

  const activeMaterialType =
    MATERIAL_TYPES.find((type) => type.id === selectedType) ??
    MATERIAL_TYPES[0];

  /*
   * Keep the original array index because changeColor expects
   * the position inside the complete Colors array.
   */
  const filteredColors = useMemo(() => {
    return Colors.map((item, originalIndex) => ({
      ...item,
      originalIndex,
    })).filter((item) => activeMaterialType.matches(item));
  }, [activeMaterialType]);

  const handleColorChange = (originalIndex) => {
    changeColor(originalIndex);
  };

  const handleTypeChange = (type) => {
    setSelectedType(type.id);

    const currentColorBelongsToTab = type.matches(Colors[color]);

    /*
     * When the current color is not available in the new tab,
     * automatically select the first color from that tab.
     */
    if (!currentColorBelongsToTab) {
      const firstMatchingColorIndex = Colors.findIndex(type.matches);

      if (firstMatchingColorIndex !== -1) {
        changeColor(firstMatchingColorIndex);
      }
    }
  };

  return (
    <div className="relative lg:mt-4 mt-5">
      <div className="flex justify-between items-center">
        <SectionLabel>
          MATERIAL 
          {/* — <span className="selected-color-value">{Colors[color].name}</span> */}
          {/* <span className='info-icon'>
                     <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--secondary-colour)"><path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>    
                     <ToolTip className='tooltip-wrapper' data-position={isTabletOrMobile ? 'top' : 'right'}>
                         <span className='tooltip-text'>Some text inside the tooltip for informational purpose.</span>
                         <span className='tooltip-anchor'></span>
                     </ToolTip>
                 </span> */}
        </SectionLabel>
      </div>

      <MaterialTabs role="tablist" aria-label="Material type">
        {MATERIAL_TYPES.map((type) => {
          const isActive = type.id === selectedType;

          return (
            <MaterialTab
              key={type.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              $active={isActive}
              onClick={() => handleTypeChange(type)}
            >
              <MaterialTabTitle>{type.title}</MaterialTabTitle>

              <MaterialTabDescription $active={isActive}>
                {type.description}
              </MaterialTabDescription>
            </MaterialTab>
          );
        })}
      </MaterialTabs>

      <div className="flex justify-between items-center">
        <SectionLabel>
          {/* MATERIAL — */} 
          Farbe: 
          <span className="selected-color-value font-bold">{Colors[color].name}</span>
          {/*
          <span className="info-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="var(--secondary-colour)"
            >
              <path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" />
            </svg>

            <ToolTip
              className="tooltip-wrapper"
              data-position={isTabletOrMobile ? "top" : "right"}
            >
              <span className="tooltip-text">
                Some text inside the tooltip.
              </span>
              <span className="tooltip-anchor" />
            </ToolTip>
          </span>
          */}
        </SectionLabel>
      </div>

      <Wrapper>
        {filteredColors.map((item) => {
          const isActive = item.originalIndex === color;

          return (
            <Button
              type="button"
              key={item.id}
              aria-label={item.name}
              aria-pressed={isActive}
              title={item.name}
              onClick={() => handleColorChange(item.originalIndex)}
            >
              <div className="flex flex-col items-center">
                {isActive ? (
                  <ActiveColorSwatch
                    $isGlassy={item.glassy}
                    $overlay={item.handle}
                    $color={item.code}
                    style={{
                      backgroundColor: item.code,
                      boxShadow: "0 0 0 2px #000",
                      border: "none",
                    }}
                  />
                ) : (
                  <ColorSwatch
                    $isGlassy={item.glassy}
                    $overlay={item.handle}
                    $color={item.code}
                    style={{
                      backgroundColor: item.code,
                    }}
                  />
                )}
              </div>
            </Button>
          );
        })}
      </Wrapper>
    </div>
  );
}

export default Color;
