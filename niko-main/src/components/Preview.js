import React, { useState, useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import { AppContext } from "../store/Index";
import fitty from "fitty";

import TextPopup from "./TextPopup";
import { Colors, Fonts } from "../Assets";
import {
  getFontLineHeight,
  getMaxFontSize,
  getMinFontSize,
  getSectionSettings,
} from "../helpers/general";
import { formatMoney } from "../utils/formatMoney";

const PreviewWrapper = styled.div((props) => ({
  WebkitBoxAlign: "center",
  alignItems: "center",
  display: "flex",
  background:
    "radial-gradient(circle, rgb(69, 73, 93) 0%, rgb(45, 48, 63) 100%)",
  backgroundImage:
    'url("https://cdn.shopify.com/s/files/1/0765/1301/8186/files/neon-background.jpg?v=1721922283")',
  backgroundSize: "cover",
  height: "100%",
  WebkitBoxPack: "center",
  justifyContent: props.$isMobile ? "start" : "center",
  minHeight: "60vh",
  maxWidth: "calc(100% - 420px)",
  overflow: "hidden",
  position: "relative",
  width: "100%",

  "& .isPreviewScrollable": {
    overflow: "auto",
    width: "100%",
    minHeight: "16vh",
    maxHeight: "32vh",
    display: "flex",
    alignItems: "center",
  },

  "@media screen and (max-width: 1024px)": {
    WebkitBoxFlex: 1,
    flexGrow: 1,
    maxWidth: "100%",
    minHeight: "45vh",
    position: "sticky",
    top: 0,
    zIndex: 5,
    padding: "3.2rem 0",
  },

  "> button": {
    background: "rgb(48, 53, 63)",
    border: "1px solid rgba(255, 255, 255, 0.05)",
  },

  "&.background--day > button": {
    background: "rgba(48, 53, 63, 0.1)",
  },

  "&.background--day": {
    background: "rgb(245, 245, 249)",
  },

  "&.previewSticky--opening": {
    transform: "translateZ(0)",
    transition: "transform .4s cubic-bezier(.165,.84,.44,1)",
  },

  "&.previewSticky": {
    "@media screen and (max-width: 768px)": {
      top: props.$headerHeight,
    },
  },
}));

const MainTextWrapper = styled.div`
  width: 100%;
  padding: 0.75rem 1rem;

  .text--shorten & {
    width: 100%;
  }
  @media screen and (min-width: 768px) {
    padding: 1.25rem 1.5rem;
    .text--shorten & {
      width: 55%;
    }
  }

  @media screen and (min-width: 1025px) {
    width: 90%;
    .text--shorten & {
      width: 70%;
    }
  }

  @media screen and (max-width: 1024px) {
    max-height: 32vh;
    min-height: 20vh;
    align-content: center;
    overflow: ${(props) => (props.isText ? "auto" : "none")};
  }
`;

const MainText = styled.div((props) => ({
  color: "var(--sign-colour)",
  lineHeight: "var(--sign-lineheight)",
  fontSize: "var(--sign-size)",
  fontFamily: "var(--sign-font)",
  wordSpacing: "var(--sign-word-spacing)",
  textAlign: "var(--sign-alignment)",
  display: "flex",
  width: "100%",
  fontWeight: 500,
  letterSpacing: "0px",
  zIndex: "2",
  position: "absolute",
  top: "50%",
  left: "0",
  transform: "translateY(-50%)",

  // '.text-shorten &':{
  //     textShadow: `${props.$color === 'Weiß' ? '4px 3px 5px rgba(0, 0, 0, .4), 2px 2px 0 #dff3fe, 2px 3px 0 #bde7fd, 1px 4px 0 #c9e6f5, 7px 8px 7px rgba(0, 0, 0, .8)' : '0 2px 0 #0000006b, 0 3px 0 #101010, 0 4px 0 #000000, 5px 5px 5px rgba(0, 0, 0, .4), 0 1px 0 #121212, 0 6px 0 #17191a, 0 7px 0 #28292b, 3px 7px 15px rgba(0, 0, 0, .6)'}`,
  // },

  "&:after": {
    // textShadow: `${props.$color === 'Weiß' ? '0 2px 0 #bfbfbf, 0 3px 0 #c1c1c1, 0 4px 0 #cfcfcf, 5px 5px 5px rgba(0, 0, 0, .4), 0 1px 0 #cfcfcf, 0 6px 0 #959595, 0 7px 0 #717171, 3px 7px 15px rgba(0, 0, 0, .6)' : '0 2px 0 #3b3b3b, 0 3px 0 #393939, 0 4px 0 #373737, 5px 5px 5px rgba(0, 0, 0, .4), 0 1px 0 #373737, 0 6px 0 #393939, 0 7px 0 #3b3b3b, 3px 7px 15px rgba(0, 0, 0, .6)'}`,
    transition: "text-shadow 0.1s ease 0s",
    content: "attr(data-text)",
    position: "absolute",
    zIndex: "-1",
    left: 0,
    width: "100%",
    fontSize: "var(--after-text-size, 16px)",
    whiteSpace: "var(--after-text-wrap, nowrap)",
    lineHeight: props.$isMobile ? getFontLineHeight(props.$font) : "inherit",
    overflowWrap: props.$isMobile ? "break-word" : "",
    wordBreak: props.$isMobile ? "break-word" : "",
  },
  ".frame-preview.light--off &": {
    textShadow: "none",
  },
  "& span": {
    lineHeight: props.$isMobile ? getFontLineHeight(props.$font) : "inherit",
    whiteSpace: props.$isMobile ? "pre-wrap" : "no-wrap",
    overflowWrap: props.$isMobile ? "break-word" : "",
    wordBreak: props.$isMobile ? "break-word" : "",
  },
  "@media screen and (max-width: 767px)": {
    fontSize: "var(--sign-size-mobile)",
    position: "relative",
    top: "unset",
    left: "unset",
    transform: "none",
  },
}));

const TextArea = styled.textarea((props) => ({
  color: "transparent",
  lineHeight: getFontLineHeight(props.$font),
  fontSize: "var(--after-text-size, 16px) !important",
  whiteSpace: "var(--after-text-wrap, nowrap)",
  fontFamily: "var(--sign-font)",
  wordSpacing: "var(--sign-word-spacing)",
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  caretColor: props.$color === 2 ? "#ffffff" : "#000000",
  padding: 0,
  zIndex: 1,
  height: "100%",
  minHeight: "50px",
  textAlign: "var(--sign-alignment)",
  width: "100%",
  fontWeight: 500,
  letterSpacing: "0px",
  background: "none",
  border: "none",
  overflow: "hidden",
  resize: "none",
  "&:active,&:focus": {
    border: "none",
  },
}));

const MainTextOverlay = styled.span((props) => ({
  background: props.$isGlassy
    ? `-webkit-linear-gradient(top, transparent, transparent) 0% 0% / cover text, url("https://cdn.shopify.com/s/files/1/0765/1301/8186/files/neon-${props.$overlay}-overlay.jpg?v=1720720703") center center no-repeat`
    : "none",
  backgroundSize: "cover",
  color: "transparent",
  WebkitTextFillColor: "transparent",
  textShadow: "none",
  WebkitBackgroundClip: "text",
}));

const MainTextPlaceholder = styled.span((props) => ({
  color: "var(--sign-colour)",
  fontFamily: "var(--sign-font)",
  letterSpacing: "0px",
  fontSize: "90px",
  fontWeight: "600",
  textShadow: "none",
  "@media screen and (max-width: 767px)": {
    fontSize: "37px",
  },
}));

const Size = styled.div`
  position: absolute;
  padding: 10px;
  color: #850a0a;
  font-size: 1rem;
  font-weight: 800;
  text-transform: uppercase;
  text-align: center;
  line-height: 18px;
`;

const Measurements = styled(Size)`
  top: 0;
  left: 0;
  text-align: left;

  & span {
    color: var(--colorPrice);
  }
`;

const Prices = styled(Size)`
  color: var(--colorPrice);
  top: 0;
  right: 0;
  text-align: right;
  text-transform: none;
  font-weight: 500;

  .prices---wrapper {
    font-weight: 800;
    font-size: 1.2rem;
  }
  .price {
    color: #008b10;
  }
  .discounted-price {
    text-decoration: line-through;
    color: red;
  }
`;

const Note = styled.div`
  bottom: 0px;
  color: rgb(0, 0, 0);
  font-family: "Sofia Pro", Arial, Helvetica, sans-serif;
  font-size: 12px;
  opacity: 0.8;
  position: absolute;
  right: 5px;
  @media screen and (max-width: 600px) {
    width: 100%;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    padding: 0 1rem;
  }
  .frame-preview.background--day & {
    color: var(--primary-colour);
  }
`;

function Preview() {
  const previewWrapperRef = useRef(null);
  const previewElem = useRef(null);
  const mainElem = useRef(null);
  const textareaRef = useRef(null);
  const parentElemRef = useRef(null);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  const {
    totalPrice,
    changeActivePopup,
    lightOn,
    backgroundDay,
    text,
    changeText,
    font,
    color,
    measurements,
    changeMeasurements,
    loadings,
  } = useContext(AppContext);
  const [inputInFocus, setInputInFocus] = useState(false);
  const [discountEnabled, setDiscountEnabled] = useState(false);
  const [discountedPriceDollar, setDiscountedPriceDollar] = useState(0);
  const [discountedPricePer, setDiscountedPricePer] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const [stickyActive, setStickyActive] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);

  const onChangeFitListener = function (e) {
    // log the detail property to the console
    const { newValue } = e.detail;
    //Set shadow for black text(small)
    const colorHandle = Colors[color].handle;
    if (colorHandle == "black" || colorHandle == "matt-black") {
      let shadow = "";
      if (newValue < 50) {
        shadow =
          "0 1px 0 #3b3b3b,0 2px 0 #373737,2px 2px 2px rgba(0,0,0,.4),0 3px 0 #373737,0 3px 0 #3b3b3b,1px 3px 9px rgba(0,0,0,.6)";
      } else if (newValue >= 50 && newValue <= 80) {
        shadow =
          "0 2px 0 #3b3b3b,0 3px 0 #373737,4px 4px 4px rgba(0,0,0,.4),0 4px 0 #373737,0 5px 0 #3b3b3b,2px 5px 12px rgba(0,0,0,.6)";
      } else {
        shadow =
          "0 2px 0 #3b3b3b, 0 3px 0 #393939, 0 4px 0 #373737, 5px 5px 5px rgba(0, 0, 0, .4), 0 1px 0 #373737, 0 6px 0 #393939, 0 7px 0 #3b3b3b, 3px 7px 15px rgba(0, 0, 0, .6)";
      }
      e.target.parentElement.style.textShadow = shadow;
    } else if (colorHandle == "white" || colorHandle == "matt-white") {
      let shadow = "";
      if (newValue < 50) {
        shadow =
          "0 1px 0 #bfbfbf, 0 2px 0 #cfcfcf, 2px 2px 2px rgba(0, 0, 0, .4), 0 3px 0 #cfcfcf, 0 3px 0 #717171, 1px 3px 9px rgba(0, 0, 0, .6)";
      } else if (newValue >= 50 && newValue <= 80) {
        shadow =
          "0 2px 0 #bfbfbf, 0 3px 0 #cfcfcf, 4px 4px 4px rgba(0, 0, 0, .4), 0 4px 0 #cfcfcf, 0 5px 0 #717171, 2px 5px 12px rgba(0, 0, 0, .6)";
      } else {
        shadow =
          "0 2px 0 #bfbfbf, 0 3px 0 #c1c1c1, 0 4px 0 #cfcfcf, 5px 5px 5px rgba(0, 0, 0, .4), 0 5px 0 #cfcfcf, 0 6px 0 #959595, 0 7px 0 #717171, 3px 7px 15px rgba(0, 0, 0, .6)";
      }
      e.target.parentElement.style.textShadow = shadow;
    } else if (colorHandle == "birke") {
      let shadow = "";
      if (newValue < 50) {
        shadow =
          "rgb(181 164 129) 0px 1px 0px, rgb(199 181 144) 0px 2px 0px, rgba(216, 199, 164, 0.4) 2px 2px 2px, rgb(199 181 145) 0px 3px 0px, rgb(89 80 64) 0px 3px 0px, rgba(0, 0, 0, 0.6) 1px 3px 9px";
      } else if (newValue >= 50 && newValue <= 80) {
        shadow =
          "rgb(195 176 139) 0px 2px 0px, rgb(185 168 135) 0px 3px 0px, rgba(216, 199, 164, 0.4) 4px 4px 4px, rgb(185 168 134) 0px 4px 0px, rgb(149 135 107) 0px 5px 0px, rgba(0, 0, 0, 0.6) 2px 5px 12px";
      } else {
        shadow =
          "0 2px 0 #cbb88f, 0 3px 0 #c2ae84, 0 4px 0 #baa57b, 5px 5px 5px rgba(216, 199, 164, 0.4), 0 5px 0 #baa57b, 0 6px 0 #c2ae84, 0 7px 0 #cbb88f, 3px 7px 15px rgba(0, 0, 0, 0.6)";
      }
      e.target.parentElement.style.textShadow = shadow;
    } else if (colorHandle == "pappel") {
      let shadow = "";
      if (newValue < 50) {
        shadow =
          "0 1px 0 #e8deb9, 0 2px 0 #ede3c1, 2px 2px 2px rgba(243, 236, 209, 0.4), 0 3px 0 #ede3c1, 0 3px 0 #b3a57d, 1px 3px 9px rgba(0, 0, 0, 0.6)";
      } else if (newValue >= 50 && newValue <= 80) {
        shadow =
          "0 2px 0 #e8deb9, 0 3px 0 #ede3c1, 4px 4px 4px rgba(243, 236, 209, 0.4), 0 4px 0 #ede3c1, 0 5px 0 #b3a57d, 2px 5px 12px rgba(0, 0, 0, 0.6)";
      } else {
        shadow =
          "0 2px 0 #e3d8b3, 0 3px 0 #ddd1a9, 0 4px 0 #d6ca9f, 5px 5px 5px rgba(243, 236, 209, 0.4), 0 5px 0 #d6ca9f, 0 6px 0 #c5b78f, 0 7px 0 #b3a57d, 3px 7px 15px rgba(0, 0, 0, 0.6)";
      }
      e.target.parentElement.style.textShadow = shadow;
    } else if (colorHandle === "hdf") {
      let shadow = "";
      if (newValue < 50) {
        shadow =
          "0 1px 0 #bb9d88, 0 2px 0 #b19380, 2px 2px 2px rgba(199, 169, 147, 0.4), 0 3px 0 #b19380, 0 3px 0 #8d6f5d, 1px 3px 9px rgba(0, 0, 0, 0.6)";
      } else if (newValue >= 50 && newValue <= 80) {
        shadow =
          "0 2px 0 #bb9d88, 0 3px 0 #b19380, 4px 4px 4px rgba(199, 169, 147, 0.4), 0 4px 0 #b19380, 0 5px 0 #8d6f5d, 2px 5px 12px rgba(0, 0, 0, 0.6)";
      } else {
        shadow =
          "0 2px 0 #b19380, 0 3px 0 #a78976, 0 4px 0 #9d7f6e, 5px 5px 5px rgba(199, 169, 147, 0.4), 0 5px 0 #9d7f6e, 0 6px 0 #8d6f5d, 0 7px 0 #7f6454, 3px 7px 15px rgba(0, 0, 0, 0.6)";
      }
      e.target.parentElement.style.textShadow = shadow;
    } 
    
    else if (colorHandle === 'gold-mat') {
    let shadow = '';

    if (newValue < 50) {
        shadow = `
            0 1px 0 #d5ad5b,
            0 2px 0 #ad7f45,
            1px 2px 0 #8f6748,
            2px 3px 2px rgba(80, 54, 37, 0.35),
            2px 4px 6px rgba(0, 0, 0, 0.35)
        `;
    } else if (newValue >= 50 && newValue <= 80) {
        shadow = `
            0 1px 0 #d8b15f,
            0 2px 0 #b9894b,
            0 3px 0 #9a7049,
            1px 4px 0 #805b40,
            3px 4px 3px rgba(91, 61, 40, 0.4),
            3px 6px 8px rgba(0, 0, 0, 0.4)
        `;
    } else {
        shadow = `
            0 1px 0 #dbb563,
            0 2px 0 #bf8f4e,
            0 3px 0 #a67749,
            0 4px 0 #916542,
            1px 5px 0 #7c563c,
            2px 6px 0 #684632,
            4px 6px 4px rgba(89, 57, 36, 0.45),
            4px 8px 10px rgba(0, 0, 0, 0.45)
        `;
    }

    e.target.parentElement.style.textShadow = shadow;
}

else if (colorHandle === 'beig') {
    let shadow = '';

    e.target.parentElement.style.color = '#ad9282';

    if (newValue < 50) {
        shadow = `
            0 1px 0 #9f8272,
            0 2px 0 #8f7162,
            1px 2px 0 #7e6153,
            2px 3px 2px rgba(105, 79, 65, 0.35),
            2px 4px 6px rgba(0, 0, 0, 0.30)
        `;
    } else if (newValue >= 50 && newValue <= 80) {
        shadow = `
            0 1px 0 #9f8272,
            0 2px 0 #917364,
            0 3px 0 #826456,
            1px 4px 0 #735548,
            3px 4px 3px rgba(94, 69, 57, 0.40),
            3px 6px 8px rgba(0, 0, 0, 0.36)
        `;
    } else {
        shadow = `
            0 1px 0 #9f8272,
            0 2px 0 #927465,
            0 3px 0 #846658,
            0 4px 0 #76584b,
            1px 5px 0 #684b40,
            2px 6px 0 #593d34,
            4px 6px 4px rgba(76, 53, 44, 0.43),
            4px 8px 10px rgba(0, 0, 0, 0.40)
        `;
    }

    e.target.parentElement.style.textShadow = shadow;
}
    const fontSize = parseFloat(
      window.getComputedStyle(previewElem.current).fontSize,
    );
    if (isTabletOrMobile && previewElem.current) {
      if (fontSize > getMinFontSize(Fonts[font].name)) {
        previewElem.current.style.whiteSpace = "nowrap"; // Prevent wrapping
        parentElemRef.current.style.setProperty("--after-text-wrap", "nowrap");
      } else {
        previewElem.current.style.whiteSpace = "normal"; // Allow wrapping
        parentElemRef.current.style.setProperty("--after-text-wrap", "normal");
      }
    }

    if (parentElemRef.current)
      parentElemRef.current.style.setProperty(
        "--after-text-size",
        fontSize + "px",
      );
    if (textareaRef.current)
      textareaRef.current.style.fontSize = fontSize + "px !important";
  };

  const handlePopup = (active) => {
    changeActivePopup(active);
    if (textareaRef.current) textareaRef.current.focus();
    setInputInFocus(true);
  };

  const renderDiscountNote = function (price, compare_at_price) {
    const saved_amount = compare_at_price - price;
    let amount = theme.Currency.formatMoney(
      saved_amount,
      theme.settings.moneyFormat,
    );
    return (
      <span className="discount-note---wrapper">
        {discountedPricePer}% Rabatt – du sparst{" "}
        <span className="price">{amount}</span>
      </span>
    );
  };

  const handleTextChange = function (e) {
    let value = e.target.value;
    // Replace multiple spaces with a single space
    value = value.replace(/\s{2,}/g, " ");

    // Remove new lines
    value = value.replace(/\n/g, "");

    changeText(value);
  };

  useEffect(() => {
    let maxSize = isTabletOrMobile ? getMaxFontSize(Fonts[font].name) : 200;
    let minSize = isTabletOrMobile ? getMinFontSize(Fonts[font].name) : 10;
    const fittlyElements = fitty(".fit-text", {
      minSize,
      maxSize,
      multiLine: isTabletOrMobile ? true : false,
    });

    fittlyElements[0].element.addEventListener("fit", onChangeFitListener);

    return () => {
      fittlyElements[0].element.removeEventListener("fit", onChangeFitListener);
    };
  }, [text, font, color]);

  // useEffect(() => {
  //     changeMeasurements(30,'height');
  // }, [])

  useEffect(() => {
    const data = getSectionSettings();
    if (data?.settings?.discount_enable) {
      setDiscountEnabled(data.settings.discount_enable);
      if (data?.settings?.discount) {
        setDiscountedPricePer(data.settings.discount);
        setDiscountedPriceDollar(
          totalPrice + (totalPrice * data.settings.discount) / 100,
        );
      } else {
        setDiscountedPricePer(0);
        setDiscountedPriceDollar(0);
      }
    }
  }, [totalPrice]);

  function scrollHandler() {
    if (window.scrollY > 250) {
      if (stickyActive) return;
      setStickyActive(true);

      previewWrapperRef.current.classList.add("previewSticky");
      // Add open transition class after element is set to fixed
      // so CSS animation is applied correctly
      setTimeout(function () {
        previewWrapperRef.current.classList.add("previewSticky--opening");
      }, 100);
    } else {
      if (stickyActive) return;
      setStickyActive(false);

      previewWrapperRef.current.classList.remove("previewSticky");
      previewWrapperRef.current.classList.remove("previewSticky--opening");
    }
  }

  function stickyHeaderScroll() {
    requestAnimationFrame(scrollHandler);
  }

  useEffect(() => {
    const siteHeader = document.querySelector("#SiteHeader");
    if (!siteHeader) return;
    setHeaderHeight(siteHeader.offsetHeight);
    const stickyEnabled = siteHeader.dataset.sticky === "true";
    if (
      !siteHeader ||
      !stickyEnabled ||
      !theme?.utils ||
      !previewWrapperRef.current
    )
      return;
    window.on("scroll", theme.utils.throttle(20, stickyHeaderScroll));
  }, []);

  return (
    <PreviewWrapper
      $isMobile={isTabletOrMobile}
      $headerHeight={headerHeight}
      ref={previewWrapperRef}
      className={`frame-preview ${showControls ? "controls--show" : ""} ${text.length < 8 ? "text--shorten" : ""} ${lightOn ? "" : "light--off"} ${backgroundDay ? "background--day" : ""}`}
    >
      <MainTextWrapper
        className="inline-block text-white text-md relative whitespace-pre-wrap"
        isText={text.length > 0 ? true : false}
      >
        <div ref={parentElemRef}>
          <div style={{ position: "relative" }}>
            {text.length === 0 && !inputInFocus && (
              <MainText
                $font={Fonts[font].name}
                onClick={() => handlePopup(true)}
              >
                <MainTextPlaceholder>Text hier eingeben</MainTextPlaceholder>
              </MainText>
            )}
            <MainText
              $isMobile={isTabletOrMobile}
              $font={Fonts[font].name}
              onClick={() => handlePopup(true)}
              $color={Colors[color].name}
              data-text={text}
            >
              <MainTextOverlay
                $isGlassy={Colors[color].glassy}
                $overlay={Colors[color].handle}
                className="relative fit-text"
                ref={previewElem}
                style={{
                  whiteSpace: isTabletOrMobile ? "pre-wrap" : "nowrap",
                  display: "block",
                }}
              >
                {text}
              </MainTextOverlay>
              <TextArea
                ref={textareaRef}
                value={text}
                onFocus={() => setInputInFocus(true)}
                onBlur={() => setInputInFocus(false)}
                onChange={(e) => handleTextChange(e)}
                $font={Fonts[font].name}
                $color={Colors[color].id}
              >
                {text}
              </TextArea>
            </MainText>
            {/* <MainText $font={Fonts[font].name} $color={Colors[color].name} $isMobile={isTabletOrMobile}>
                    <span className="relative fit-text" ref={mainElem}
                            style={{whiteSpace: isTabletOrMobile ? "pre-wrap" : "nowrap", display: "block"}}>{text}</span>
                </MainText> */}
          </div>
        </div>
      </MainTextWrapper>
      {/* {!isTabletOrMobile && <TextPopup />} */}
      {/* <TextPopup/> */}
      <div>
        <Measurements>
          {"Breite  "}
          {loadings.width ? (
            <span>...</span>
          ) : (
            <span>{measurements.widthCm}cm</span>
          )}
          {isTabletOrMobile ? <br /> : " | "}
          {"Höhe  "}
          {loadings.height ? (
            <span>...</span>
          ) : (
            <span>{measurements.heightCm}cm</span>
          )}
        </Measurements>
        <Prices>
          <span className="prices---wrapper">
            {discountEnabled && (
              <span className="discounted-price">
                {formatMoney(
                  discountedPriceDollar,
                  "{{amount_with_comma_separator}}€",
                )}
              </span>
            )}{" "}
            <span className="price">
              {formatMoney(totalPrice, "{{amount_with_comma_separator}}€")}
            </span>
          </span>
          <br />
          {discountEnabled &&
            renderDiscountNote(totalPrice, discountedPriceDollar)}
        </Prices>
      </div>
      {/* <Note>Der Text ist zur besseren Darstellung auf mehrere Zeilen verteilt. Die angezeigten Maße gelten jedoch, als stünde der Text in einer einzigen Zeile.</Note> */}
    </PreviewWrapper>
  );
}

export default Preview;
