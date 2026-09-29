import React,{useContext, useEffect, useState} from 'react';
import styled from 'styled-components';
import { AppContext } from '../store/Index';

import {formatMoney} from '../utils/formatMoney';
import { GetErrorMessage, getSectionSettings } from '../helpers/general';
import { Fonts } from '../Assets';
import { useMediaQuery } from 'react-responsive';

const Wrapper = styled.div`
    background-color: inherit;
    bottom: 0px;
    left: -20px;
    padding: 10px 16px;
    border: 1px solid var(--colorBorder);
    position: sticky;
    right: -20px;
    z-index: 2;

    afterpay-placement {
        --logo-badge-width: 80px;
        margin-bottom: 0px;
    }
`;

const PriceWrapper = styled.div`
    display: flex;
    flex-direction: column;
    -webkit-box-align: start;
    align-items: start;

    p {
        margin-bottom: 8px;
    }
`;

const PriceReviews = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const Flex = styled.p`
    display: flex;
    flex-direction: row;
    align-items: baseline;
    margin-bottom: 0 !important;
`;

const PriceLabel = styled.span`
    color: rgb(0, 0, 0);
    display: block;
    font-size: 10px;
    font-weight: 600;
    line-height: 1.5;
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

const Button = styled.button`
    opacity: ${props=>props.active == 'yes' ? '0.5': '1'};
    pointer-events: ${props=>props.active == 'yes' ? 'none' : 'auto'};
`;

function PriceBar({wrapper}) {
    const {totalPrice,changeIsFinal,measurements,font,changeAddToCart,text,updating,loadings} = useContext(AppContext);
    const [discountEnabled,setDiscountEnabled] = useState(false)
    const [discountedPriceDollar,setDiscountedPriceDollar] = useState(0)
    const [discountedPricePer, setDiscountedPricePer] = useState(0)
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' });
    const handleChange = function(){
        changeIsFinal(true);
        wrapper.current.scrollTo({
          top: 0,
          behavior: "smooth"
        });
    };
    const handleCart = function(){
        changeAddToCart(true);
    };



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
      <Wrapper>
        
        <PriceWrapper>
            {/* <PriceReviews>
                <Flex>
                    {discountEnabled && <DiscountedPriceDollar>
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
                            <span className="money">{formatMoney(totalPrice,'{{amount_with_comma_separator}}€')}</span>
                        )}
                    </Price>
                    {discountEnabled && <DiscountedPricePercentage>{discountedPricePer}% RABATT</DiscountedPricePercentage>}
                </Flex>
                <PriceLabel>inkl. MwSt.</PriceLabel>
            </PriceReviews>
            {discountEnabled && renderDiscountNote(totalPrice,discountedPriceDollar)} */}
            {/* {renderShippingText()} */}
            
            
            <Button className="btn btn--full add-to-cart"    
                onClick={handleCart} 
                active={text.length <= 0 || updating || GetErrorMessage(measurements.widthCm,measurements.heightCm,Fonts[font].name,text) ? 'yes':'no'}>
                    In den Warenkorb legen
            </Button>
        </PriceWrapper>
      </Wrapper>
    )
}

export default PriceBar
