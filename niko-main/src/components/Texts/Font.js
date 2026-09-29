import React, { useState, useContext } from "react";
import styled from "styled-components";

import { AppContext } from "../../store/Index";

import { Fonts } from "../../Assets";

const Label = styled.label`
    color: #000;
    display: inline-block;
    font-family: 'Inter' ;
    margin-bottom: 10px;
    font-weight: 700 !important;
    letter-spacing: 0px !important;
    font-size:13px !important;
}
    & > span{
        font-weight: bold;
        text-transform: capitalize;
    }
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  margin: 0px -15px;
  max-width: calc(100% + 30px);
  overflow: scroll hidden;
  width: calc(100% + 30px);
  padding-block: 10px;

  @media screen and (min-width: 1025px) {
    flex-wrap: wrap;
    max-width: calc(100% + 10px);
    margin: 0px -5px;
    overflow-x: hidden;
  }
`;

const Button = styled.button`
  -webkit-box-align: center;
  align-items: center;
  border: 1px solid rgb(221, 221, 221);
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  height: 50px;
  line-height: 1;
  margin: 0px 3px;
  min-width: 100px;
  width: 150px;
  background: none;
  color: rgb(0, 0, 0);
  font-size: 18px;
  font-weight: 500 !important;
  letter-spacing: 0px;

  @media screen and (min-width: 1025px) {
    height: 50px;
    min-width: calc((100% - 30px) / 4);
    width: calc((100% - 30px) / 4);
    margin-bottom: 10px;
  }
`;

const ActiveButton = styled(Button)`
  position: relative;
  border-width: 1px;
  border-style: solid;
  border-image: initial;
  background: rgb(250, 250, 250);
  box-shadow: 0 0 0 2px var(--colorTextBody);
  font-size: 20px;
  font-weight: 700 !important;

  &::before {
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
`;

function Font() {
  const { font, changeFont } = useContext(AppContext);

  const handleChange = function (event, position) {
    changeFont(position);
    const data = event.currentTarget.dataset;
    // handleVariantChange(data.name,data.value);
  };

  const getLabelFontSize = function (fontName, type) {
    if (type === "active") {
      switch (fontName) {
        case "Hamburg":
          return "9px";
        case "Freiburg":
          return "13px";
        case "Regensburg":
        case "Koeln":
        case "Bremen":
          return "26px";
        case "Paderborn":
          return "15px";
        case "München":
          return "16px";
        case "Wuppertal":
          return "17px";
        default:
          return "22px";
      }
    } else {
      switch (fontName) {
        case "Hamburg":
          return "8px";
        case "Regensburg":
        case "Koeln":
        case "Bremen":
          return "25px";
        case "Freiburg":
          return "12px";
        case "München":
          return "15px";
        case "Paderborn":
          return "14px";
        case "Wuppertal":
          return "16px";
        default:
          return "20px";
      }
    }
  };
  return (
    <div className="relative lg:mt-4">
      <Label>
        Schriftart — <span>{Fonts[font].name}</span>
      </Label>
      <Wrapper>
        {Fonts.map((Item) => {
          if (Item.id == font) {
            return (
              <ActiveButton
                className="my-3"
                style={{
                  fontFamily: Item.font,
                  fontSize: getLabelFontSize(Item.name, "active"),
                }}
                onClick={(e) => handleChange(e, Item.id)}
                key={Item.id}
                data-name={Item.name}
                data-value={Item.id}
              >
                {Item.name}
              </ActiveButton>
            );
          } else {
            return (
              <Button
                className="my-3"
                style={{
                  fontFamily: Item.font,
                  fontSize: getLabelFontSize(Item.name, "normal"),
                }}
                onClick={(e) => handleChange(e, Item.id)}
                key={Item.id}
                data-name={Item.name}
                data-value={Item.id}
              >
                {Item.name}
              </Button>
            );
          }
        })}
      </Wrapper>
    </div>
  );
}

export default Font;
