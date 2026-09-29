import React,{useContext} from 'react';

import {AppContext} from '../store/Index';

import styled from 'styled-components';
import TextIcon from '../images/Text.svg';
import FontIcon from '../images/Font.svg';
import ColorIcon from '../images/Color.svg';
import SizeIcon from '../images/Size.svg';

const Wrapper = styled.div`
    display: flex;
    max-width: 100%;
    overflow-x: scroll;
    padding: 30px 15px;
`;

const Button = styled.button`
    -webkit-box-align: center;
    align-items: center;
    background: none;
    border: 0px;
    color: var(--primary-colour);
    display: flex;
    flex-direction: column;
    font-weight: bold;
    margin-right: 10px;
    padding: 0px;
`;

function Menu() {
  const {changeActiveMenu} = useContext(AppContext);
  const handleChange = (item) => {
    changeActiveMenu(item);
  };
    return (
        <Wrapper>
            <Button onClick={()=>handleChange('Text')}>
                <span className="inline mb-2">Text</span>
                <span className="inline mb-2">
                  <TextIcon />
                </span>
            </Button>
            <Button onClick={()=>handleChange('Font')}>
              <span className="inline mb-2">Font</span>
              <span className="inline mb-2">
                  <FontIcon/>
              </span>
            </Button>
            <Button onClick={()=>handleChange('Colour')}>
              <span className="inline mb-2">Colour</span>
              <span className="inline mb-2">
                  <ColorIcon />
              </span>
            </Button>
            <Button onClick={()=>handleChange('Size')}>
              <span className="inline mb-2">Size</span>
              <span className="inline mb-2">
                <SizeIcon />
              </span>
            </Button>
        </Wrapper>
    )
}

export default Menu
