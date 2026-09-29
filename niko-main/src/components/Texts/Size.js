import React, { useState, useContext } from 'react';
import styled from 'styled-components';

import {AppContext} from '../../store/Index';

import {Sizes} from '../../Assets';

const Label = styled.label`
    color: rgb(62, 62, 62);
    display: inline-block;
    font-size: 14px;
    margin-bottom: 10px;
    font-weight: bold;
    font-size:13px !important;
   
`;

const Wrapper = styled.div`
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    flex-wrap: wrap;

    > * {
        width: calc(50% - 10px);
    }
`;

const Swatch = styled.div`
    border: 1px solid rgb(221, 221, 221);
    border-radius: 4px;
    cursor: pointer;
    padding: 13px 15px 16px;
    background: transparent;
`;

const ActiveSwatch = styled.div`
    border-width: 1px;
    border-style: solid;
    border-image: initial;
    border-radius: 4px;
    cursor: pointer;
    padding: 13px 15px 16px;
    background: rgb(250, 250, 250);
    border-color: var(--secondary-colour);
`;

function Size({option}) {
    const {size,changeSize} = useContext(AppContext);

    const handleChange = function(event,position){
        changeSize(position);
        const data = event.currentTarget.dataset;
        // handleVariantChange(data.name,data.value);
    }
    return (
        <div className="relative lg:mt-4">
        <Label>Choose a size</Label>
        <Wrapper>
            {option.values.map((value,index)=>{
                let Item = Sizes.find(Size=>Size.name==value);
                if(Item){
                    if(index == size){
                    return <ActiveSwatch className="flex justify-between items-center mb-3" onClick={(e)=>handleChange(e,index)} key={index} data-name={option.name} data-value={value}>
                        <span>
                        <p className="font-bold text-primary text-sm mb-2">{Item.name}</p>
                        <p className="text-primary text-xxs">Maximum {Item.value}cm ({Math.ceil(((Item.value*0.393700) / 12))}ft) in length</p>
                        </span>
                    </ActiveSwatch>
                    }else{
                    return <Swatch className="flex justify-between items-center mb-3" onClick={(e)=>handleChange(e,index)} key={index} data-name={option.name} data-value={value}>
                        <span>
                        <p className="font-bold text-primary text-sm mb-2">{Item.name}</p>
                        <p className="text-primary text-xxs">Maximum {Item.value}cm ({Math.ceil(((Item.value*0.393700) / 12))}ft) in length</p>
                        </span>
                    </Swatch>
                    }
                }
            })}
        </Wrapper>
     </div>
    )
}

export default Size
