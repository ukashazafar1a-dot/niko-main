import React, { useCallback } from "react";
import { debounce } from "lodash";
import { getSize } from "../utils/textSizes";
import {Fonts} from '../Assets'
import {actions} from './Actions'
import { reducer } from "./Reducer";

//Context and Provider

const initialState = {
    isFinal: false,
    updating: false,
    lightOn: true,
    backgroundDay: false,
    activeOverlay: false,
    activeMenu: 'Text',
    activePopup: false,
    text: "",
    font: 0,
    color: 0,
    size: 0,
    totalPrice: 0,
    fontProperties: {},
    frequent_sizes: [],
    measurements: {
      "widthCm": "0",
      "heightCm": "0",
      "widthIn": "0",
      "heightIn": "0",
    },
    loadings: {
        width: false,
        height: false
    },
    addToCart: false,
    options: [
      {
        name: 'Text',
        isVisited: true,
      },
      {
        name: 'Schriftart',
        isVisited: false
      },
      {
        name: 'Farbe',
        isVisited: false
      },
      {
        name: 'Größe',
        isVisited: false
      }
    ]
  };

  export const AppContext = React.createContext();

  export const Provider = ({ children }) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
  
    const debouncedGetSize = useCallback(
      debounce(async (text,value,type,font) => {
        try {
          const {width,height,sizes} = await getSize(text,value,type,font);
          if(type === 'height'){
            dispatch({type: actions.CHANGE_MEASUREMENTS,payload:{width,height,type}});
          }else if(type === 'width'){
            dispatch({type: actions.CHANGE_MEASUREMENTS,payload:{height,width,type}});
          }
          if(sizes && sizes.length > 0){
            dispatch({type: actions.CHANGE_FREQUENT_SIZES, payload: {sizes}})
          }
          dispatch({type:actions.CHANGE_MEASUREMENTS_LOADINGS, payload:{type:null}})
        } catch (error) {
          console.error(error)
          dispatch({type:actions.CHANGE_MEASUREMENTS_LOADINGS, payload:{type:null}})
        }
      }, 1000),
      []
    );
  
    const value = {
      isFinal: state.isFinal,
      lightOn: state.lightOn,
      updating: state.updating,
      backgroundDay: state.backgroundDay,
      font: state.font,
      color: state.color,
      text: state.text,
      size: state.size,
      fontProperties: state.fontProperties,
      frequent_sizes: state.frequent_sizes,
      activeOverlay: state.activeOverlay,
      activeMenu: state.activeMenu,
      activePopup: state.activePopup,
      measurements: state.measurements,
      loadings: state.loadings,
      addToCart: state.addToCart,
      totalPrice: state.totalPrice,
      options: state.options,
      toggleLight: (lightState) => {
          dispatch({type: actions.TOGGLE_LIGHT, lightState});
      },
      toggleBackground: (backgroundState) => {
          dispatch({type: actions.TOGGLE_BACKGROUND, backgroundState});
      },
      changeFont: async (newFont)=>{
        dispatch({type: actions.CHANGE_FONT, newFont});
        dispatch({type:actions.CHANGE_MEASUREMENTS_LOADINGS, payload:{type:'width'}})
        const font = Fonts[newFont].name;
        debouncedGetSize(state.text,state.measurements.heightCm,'width',font)
  
      },
      changeColor: (newColor)=>{
        dispatch({type: actions.CHANGE_COLOR, newColor});
      },
      changeText: async (newText) => {
        dispatch({type: actions.CHANGE_TEXT, newText});
        dispatch({type:actions.CHANGE_MEASUREMENTS_LOADINGS, payload:{type:'width'}})
        const font = Fonts[state.font].name;
        debouncedGetSize(newText,state.measurements.heightCm,'width',font)
      },
      changeSize: (newSize) => {
        dispatch({type: actions.CHANGE_SIZE, newSize});
      },
      
      changeActiveOverlay: (newOverlay) => {
        dispatch({type: actions.CHANGE_ACTIVE_OVERLAY, newOverlay});
      },
      changeActiveMenu: (newMenu) => {
        dispatch({type: actions.CHANGE_ACTIVE_MENU, newMenu});
      },
      changeActivePopup: (newState) => {
        dispatch({type: actions.CHANGE_ACTIVE_POPUP, newState});
      },
      changeIsFinal: (newFinal) => {
        dispatch({type: actions.CHANGE_IS_FINAL, newFinal});
      },
      changeAddToCart: (newState) => {
        dispatch({type: actions.CHANGE_ADD_TO_CART, newState});
      },
      changeMeasurements: async (value,type) => {
        const font = Fonts[state.font].name;
        dispatch({type:actions.CHANGE_MEASUREMENTS_LOADINGS, payload:{type}})
        if(type === 'width'){
          debouncedGetSize(state.text,value,'width',font)
        }else if(type === 'height'){
          debouncedGetSize(state.text,value,'height',font)
        }
      },

      changeMeasurementsForText: async (font,text,value,type) => {
        if(!font || !text || !value || !type) return;
        dispatch({type:actions.CHANGE_MEASUREMENTS_LOADINGS, payload:{type}})
        if(type === 'width'){
          debouncedGetSize(text,value,'width',font)
        }else if(type === 'height'){
          debouncedGetSize(text,value,'height',font)
        }
      },

      changeFontProperties: (newFontProperties) => {
        dispatch({type: actions.CHANGE_FONT_PROPERTIES, newFontProperties});
      },
      changeTotalPrice: () => {
        dispatch({type: actions.CHANGE_TOTAL_PRICE});
      },
      setDefaultProperties: (text,font,color,measurements) => {
        dispatch({type: actions.CHANGE_DEFAULT_PROPERTIES, payload:{text,font,color,measurements}})
      },
      setFrequentSizes: (sizes) => {
        dispatch({type: actions.CHANGE_FREQUENT_SIZES, payload: {sizes}})
      }
    };
  
    return (
      <AppContext.Provider value={value}>
        {children}
      </AppContext.Provider>
    );
  };