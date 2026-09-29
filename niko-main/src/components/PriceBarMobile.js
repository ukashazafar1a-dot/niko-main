import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components';
import { formatMoney } from '../utils/formatMoney';
import {AppContext} from '../store/Index';

import Header from './Header'
import { Fonts } from '../Assets';
import { GetErrorMessage, getSectionSettings, checkAllOptionsVisited } from '../helpers/general';
import DiscountNote from './Snippets/DiscountNote';


const Button = styled.button`
    opacity: ${props=>props.active == 'yes' ? '0.5': '1'};
    pointer-events: ${props=>props.active == 'yes' ? 'none' : 'auto'};
    &.btn {
      font-size: 12px !important;
    }

    @media screen and (max-width: 1024px){
        width: 100%;
    }
`;

const Flex = styled.p`
    display: flex;
    flex-direction: row;
    align-items: baseline;
    margin-bottom: 0 !important;
`;

const PriceReviews = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const Price = styled.span`
    color: var(--colorPrice);
    line-height: 1.5;
    font-size: 18px !important;
    font-weight: bold !important;
    padding-right: 5px;
    margin-right: 5px;

    &.on-sale{
        color: red;
    }
`;

const DiscountedPriceDollar = styled(Price)`
    text-decoration: line-through;
    margin-right: 5px;
`;

const DiscountedPricePercentage = styled.span`
    color: var(--colorTextSavings);
    background: var(--colorTextSavingsBody);
    white-space: nowrap;
    font-size: 12px;
    font-weight: 700;
    padding: 3px 8px;
`;

const AddToCartWrapper = styled.div`
    @media screen and (max-width: 1024px){
        padding: 10px;
        // position: sticky;
        // top:0;
        z-index: 6;
        background: #ffffff;
    }
`;

const PriceLabel = styled.span`
    color: rgb(0, 0, 0);
    display: block;
    font-size: 10px;
    font-weight: 600;
    line-height: 1.5;
    text-transform: uppercase;

    .frame-preview.background--day & {
        color: rgb(153, 153, 153);
    }
`;

function PriceBarMobile() {

    const {options,text,font,measurements,changeAddToCart,loadings,totalPrice,updating} = useContext(AppContext);
    const [discountEnabled,setDiscountEnabled] = useState(false)
    const [discountedPriceDollar,setDiscountedPriceDollar] = useState(0)
    const [discountedPricePer, setDiscountedPricePer] = useState(0)

    const handleCart = () => {
        changeAddToCart(true);
    };

    const renderDeliveryText = function(){
        const now = new Date();
        // Zweiter Liefertermin: 7 Tage ab heute
        const secondDeliveryDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);
        // Aktualisieren des Textinhalts im span-Tag
        const new_date = secondDeliveryDate.toLocaleDateString('de-DE', { day: 'numeric', month: 'long' });
        return <p id="delivery-text" className="w-full">Kostenlose Lieferung bis zum <span id="delivery-date">{new_date}</span></p>
    }

    const renderShippingText = function(){
        const data = getSectionSettings()
        if(data?.settings?.shipping_text){
            return <p style={{marginBottom:'0',marginTop:'10px'}}>{data?.settings?.shipping_text}</p>;
        }
        return '';
    }

    const renderDiscountNote = function(price,compare_at_price){
        const saved_amount = compare_at_price - price;
        let text = `du sparst aktuell ${saved_amount} Euro – nur für kurze`;
        let amount = theme.Currency.formatMoney(saved_amount,theme.settings.moneyFormat);
        if(theme?.strings && theme?.settings){
            text = theme.strings.savePriceNote.replace(
                "[saved_amount]",
                `<span style="color:#008b10;">${amount}</span>`
            );
        }

        return <div style={{marginTop: "0px"}}>
                <span className="product__price-savings-note" dangerouslySetInnerHTML={{__html: text}}/>
        </div>;
    }

    useEffect(()=>{
        const data = getSectionSettings()
        if(data?.settings?.discount_enable){
            setDiscountEnabled(data.settings.discount_enable);
            if(data?.settings?.discount){
                setDiscountedPricePer(data.settings.discount)
                setDiscountedPriceDollar(totalPrice + ((totalPrice * data.settings.discount) / 100))
            }else{
                setDiscountedPricePer(0);
                setDiscountedPriceDollar(0);
            }
        }
    },[totalPrice])

  return (
    <>
        <div className="flex justify-between flex-col px-5">
            {/* <Header/> */}
            
            {/* <PriceReviews>
                <Flex>
                    {discountEnabled && <DiscountedPriceDollar >
                        {(loadings.height || loadings.width) ? (
                            '...'
                        ) : (
                            <span className="money">{formatMoney(discountedPriceDollar,'{{amount_with_comma_separator}}€')}</span>
                        )}
                    </DiscountedPriceDollar>}
                    <Price className={discountEnabled && 'on-sale'}>
                        {(loadings.height || loadings.width) ? (
                            '...'
                        ) : (
                            <span className="money">{formatMoney(totalPrice)}</span>
                        )}
                    </Price>
                    {discountEnabled && <DiscountedPricePercentage>{discountedPricePer}% RABATT</DiscountedPricePercentage>}
                </Flex>
                <PriceLabel>Preis inkl. MwSt.</PriceLabel>
            </PriceReviews> */}
            {/* {discountEnabled && renderDiscountNote(totalPrice,discountedPriceDollar)} */}
            {/* {renderShippingText()} */}
            {renderDeliveryText()}
            <DiscountNote/>
        </div>
        <AddToCartWrapper>
            <Button className='btn' onClick={handleCart} 
                active={text.length <= 0 || updating || GetErrorMessage(measurements.widthCm,measurements.heightCm,Fonts[font].name,text) ? 'yes' : 'no'}>
                    In den Warenkorb legen
            </Button>
        </AddToCartWrapper>
    </>
  )
}

export default PriceBarMobile