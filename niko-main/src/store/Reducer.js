import { Colors } from "../Assets";
import { caclulatePrice } from "../helpers/general";
import { actions } from "./Actions";

export const reducer = (state, action) => {
    switch (action.type) {
      case actions.TOGGLE_LIGHT: {
        return {...state, lightOn: action.lightState };
      }
      case actions.TOGGLE_BACKGROUND: {
        return {...state, backgroundDay: action.backgroundState };
      }
      case actions.CHANGE_FONT: {
        return {...state, font: action.newFont};
      }
      case actions.CHANGE_COLOR: {
        let newMeasurements = state.measurements;
        let price = 0;
        const materialPrice = Colors[action.newColor] ? Colors[action.newColor].price : 0;
        const materialShipping = Colors[action.newColor] ? Colors[action.newColor].shipping : 0;

        price = caclulatePrice(newMeasurements.widthCm,newMeasurements.heightCm,materialPrice,materialShipping)

        return {...state, color: action.newColor,totalPrice:price};
      }
      case actions.CHANGE_TEXT: {
        return {...state, text: action.newText};
      }
      case actions.CHANGE_SIZE: {
        return {...state, size: action.newSize};
      }

      case actions.CHANGE_ACTIVE_OVERLAY: {
        return {...state, activeOverlay: action.newOverlay};
      }
      case actions.CHANGE_ACTIVE_MENU: {
        let options = state.options.map((option)=>{
          if(option.name == action.newMenu){
            return {...option,isVisited:true}
          }
          return option;
        });
        return {...state, activeMenu: action.newMenu,options};
      }
      case actions.CHANGE_ACTIVE_POPUP: {
        return {...state, activePopup: action.newState};
      }
      case actions.CHANGE_IS_FINAL: {
        return {...state, isFinal: action.newFinal};
      }
      case actions.CHANGE_ADD_TO_CART: {
        return {...state, addToCart: action.newState};
      }
      case actions.CHANGE_MEASUREMENTS_LOADINGS: {
        let loadings = {}, updating = false;
        if(action.payload.type === 'width'){
          loadings = {height:false,width:true};
          updating = true;
        }else if(action.payload.type === 'height'){
          loadings = {width:false,height:true};
          updating = true;
        }else{
          loadings = {height:false,width:false};
          updating = false;
        }
        return {...state, loadings, updating}
      }
      case actions.CHANGE_FONT_PROPERTIES: {
        return {...state, fontProperties: action.newFontProperties};
      }
      case actions.CHANGE_MEASUREMENTS: {
        let newMeasurements = state.measurements;
        let price = 0;

        if(action.payload.type === 'width'){
          newMeasurements = {...state.measurements,widthCm:action.payload.width,heightCm:action.payload.height}
        }else if(action.payload.type === 'height'){
          newMeasurements = {...state.measurements,heightCm:action.payload.height,widthCm:action.payload.width}
        }
        const materialPrice = Colors[state.color] ? Colors[state.color].price : 0;
        const materialShipping = Colors[state.color] ? Colors[state.color].shipping : 0;

        price = caclulatePrice(newMeasurements.widthCm,newMeasurements.heightCm,materialPrice,materialShipping)
        return {...state, measurements: newMeasurements,totalPrice:price};
      }

      case actions.CHANGE_DEFAULT_PROPERTIES: {
        let newMeasurements = state.measurements;
        let price = 0;

        newMeasurements = {...state.measurements,widthCm:action.payload.measurements.width,heightCm:action.payload.measurements.height}
        const materialPrice = Colors[state.color] ? Colors[state.color].price : 0;
        const materialShipping = Colors[state.color] ? Colors[state.color].shipping : 0;

        price = caclulatePrice(newMeasurements.widthCm,newMeasurements.heightCm,materialPrice,materialShipping)

        return {
          ...state, 
          font: action.payload.font, 
          color: action.payload.color, 
          text: action.payload.text,
          measurements: newMeasurements,
          totalPrice: price
        }
      }

      case actions.CHANGE_FREQUENT_SIZES: {
        return {...state,frequent_sizes: action.payload.sizes}
      }
      default:
        return state;
    }
};