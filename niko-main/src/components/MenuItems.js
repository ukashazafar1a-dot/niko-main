import React,{useState, useContext, useEffect} from 'react';
import styled from 'styled-components';

import {AppContext} from '../store/Index';

import TextField from './Texts/TextField';
import Font from './Texts/Font';
import Color from './Texts/Color';
import SizeControls from './Texts/SizeControls';

import { useDebounce } from '../hooks/useDebounce';
import PriceBarMobile from './PriceBarMobile';

const TopBar = styled.div(props => ({
  WebkitBoxAlign: 'center',
  alignItems: 'center',
  borderBottom: '1px solid rgb(221, 221, 221)',
  display: 'flex',
  WebkitBoxPack: 'justify',
  justifyContent: 'space-between',
  padding: '10px'
}));

const TopBarItem = styled.span(props => ({
  border: '2px solid #e8e8e1',
  borderColor: props.$isVisited ? '#e8e8e1' : '#ff0000',
  padding: '5px 5px',
  flexGrow: 1,
  textAlign: 'center',
  margin: '5px 3px',

  '&.isActive': {
    borderColor: '#000000'
  }
}));


const Wrapper = styled.div`
    & p{
      margin-bottom: 7px;
    }
`;


function MenuItems() {
    const {options,activeMenu,changeActiveMenu,measurements,changeMeasurements} = useContext(AppContext);

    const [length,setLength] = useState(0)
    const [height,setHeight] = useState(0)
    const debouncedLength = useDebounce(length);
    const debouncedHeight = useDebounce(height);

    const renderSwitch = (param) => {
        switch(param) {
          case 'Text':
            return <TextField />;
          case 'Schriftart':
            return <Font/>;
          case 'Farbe':
            return <Color />
          case 'Größe':
            return <SizeControls length={length} height={height} setHeight={setHeight} setLength={setLength}/>
          default:
            return '';
        }
    }

    useEffect(() => {
      if (debouncedHeight !== measurements.heightCm) {
          changeMeasurements(debouncedHeight, 'width');
      }
    }, [debouncedHeight]);

    useEffect(() => {
        if (debouncedLength !== measurements.widthCm) {
            changeMeasurements(debouncedLength, 'height');
        }
    }, [debouncedLength]);

    useEffect(()=>{
        setLength(measurements.widthCm)
        setHeight(measurements.heightCm)
        console.log("Measurements",measurements)
    },[measurements])

    return (
        <Wrapper>
          {/* <TopBar>
            {options.map((option,index)=>{
              return <TopBarItem key={index} $isVisited={option.isVisited} className={option.name === activeMenu && 'isActive'} onClick={(e)=>changeActiveMenu(option.name)}>
                {option.name}
                </TopBarItem>
            })}
          </TopBar> */}
          <div className="px-5 pt-5">
            {/* {renderSwitch(activeMenu)} */}
            {/* <TextField /> */}
            <Font/>
            <Color />
            <SizeControls length={length} height={height} setHeight={setHeight} setLength={setLength}/>
          </div>
          <PriceBarMobile/>
        </Wrapper>
    )
}

export default MenuItems
