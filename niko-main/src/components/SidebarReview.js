import React,{useContext} from 'react';
import styled from 'styled-components';
import { AppContext } from '../store/Index';
import {Colors,Fonts} from '../Assets';

const DetailsWrapper = styled.div`
    color: rgb(255, 255, 255);
    display: flex;
    flex-wrap: wrap;
    font-size: 14px;
    margin-top: 0px;
    padding: 15px 20px;
`;

const DetailsHeading = styled.h1`
    color: var(--primary-colour);
    font-size: 28px;
    font-style: normal;
    font-weight: bold;
    line-height: 1.1;
    @media screen and (min-width: 1025px){
        margin-bottom: 30px;
        margin-top: 19px;
    }
`;

const DetailsItem = styled.p`
    color: var(--primary-colour);
    font-weight: 400;
    font-size: 16px;
    line-height: 1.5;
    margin: 0px 0px 10px;
    text-transform: capitalize;
    width: 50%;
`;
const DetailsItemFull = styled(DetailsItem)`
    width: 100%;
`;

const IncludedWrapper = styled.div`
    display: flex;
    background-color: rgb(252, 42, 104);
    flex-direction: column;
    margin: 0px 0px 60px;
    padding: 20px 15px;
    @media screen and (min-width: 1025px){
        margin: 0px 0px 40px;
    }
`;

const IncludedHeading = styled.h4`
    color: rgb(255, 255, 255);
    font-size: 26px;
    line-height: 1.2;
    margin: 15px auto;
    max-width: 100%;
    text-align: center;
`;

const IncludedList = styled.ul`
    color: rgb(255, 255, 255);
    list-style-type: none;
    font-size: 15px;
    margin: 0px;
    padding: 0px;
    text-align: center;
    li {
        line-height: 1.5;
    }
`;

const Feature = styled.div`
    background-color: rgb(255, 255, 255);
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    box-sizing: border-box;
    padding: 40px 10px 20px;
    width: 100%;
    color: var(--primary-colour);
    &:first-child {
        padding-top: 5px;
    }
    &:nth-child(2n) {
        background-color: var(--bg-colour);
    }

    img {
        width: 100%;
        object-fit: cover;
        object-position: center top;
    }
    & .title {
        font-weight: bold;
        line-height: 1.15;
        margin-bottom: 10px;
        margin-top: 5px;
        font-size: 24px;
    }
    & .subtitle {
        font-size: 16px;
        line-height: 1.2;
        margin-bottom: 0px;
    }
`;

const InfoWrapper = styled.div`
    > div:nth-child(2n+1) {
        background-color: var(--bg-colour);
    }
`;

const InfoHeading = styled.h1`
    color: var(--primary-colour);
    font-size: 28px;
    font-style: normal;
    font-weight: bold;
    line-height: 1.1;
    @media screen and (min-width: 1025px){
        margin-bottom: 30px;
        margin-top: 19px;
    }
`;

const InfoItemHead = styled.div`
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    justify-content: space-between;

    h3 {
        color: var(--primary-colour);
        font-size: 18px;
        margin: 7px 0px 10px;
        font-weight: bold;
    }
`;

function SidebarReview() {
  const {text,font, color,measurements} = useContext(AppContext);
    return (
        <>
          <DetailsWrapper>
            <DetailsHeading color="var(--primary-colour)">Your neon sign details:</DetailsHeading>
            <DetailsItemFull><b>Size:</b> {measurements.widthCm}cm X {measurements.heightCm}cm</DetailsItemFull>
            <DetailsItem><b>Text:</b> {text}</DetailsItem>
            <DetailsItem><b>Font:</b> {Fonts[font].name}</DetailsItem>
            <DetailsItem><b>Colour:</b> {Colors[color].name}</DetailsItem>
          </DetailsWrapper>
          <IncludedWrapper>
            <IncludedHeading>What’s Included with your LED Neon Sign</IncludedHeading>
            <IncludedList>
              <li>Your Custom LED Neon Sign</li>
              <li>Power Supply</li>
              <li>Mounting Kit</li>
              <li>Wireless Remote &amp; Dimmer</li>
              <li>Digital Installation Guide</li>
              <li>Free Express Shipping</li>
              <li>12-Month Warranty</li>
            </IncludedList>
          </IncludedWrapper>
          <div className="flex p-0 overflow-x-visible flex-wrap">
            <Feature>
              <div className="h-full w-4/5">
                <div className="text-center">
                  <img src="https://cdn.shopify.com/s/files/1/0279/3173/8210/files/LED_Neon_Block_1.png?v=1632360159" alt="Free Express Shipping Worldwide" />
                </div>
                <div className="text-center pt-4 px-5 pb-2">
                  <p className="title">Free Express Shipping Worldwide</p>
                  <p className="subtitle">Our LED &amp; Glass Neon signs are express shipped worldwide. Safely packaged and fully insured - we worry so you don’t have to.</p>
                </div>
              </div>
            </Feature>
            <Feature>
              <div className="h-full w-4/5">
                <div className="text-center">
                  <img src="https://cdn.shopify.com/s/files/1/0279/3173/8210/files/LED_Neon_Block_2.jpg?v=1632360158" alt="12 Month Manufacturer Warranty" />
                </div>
                <div className="text-center pt-4 px-5 pb-2">
                  <p className="title">12 Month Manufacturer Warranty</p>
                  <p className="subtitle">All of our products come standard with a 12-Month International Warranty to protect your investment.</p>
                </div>
              </div>
            </Feature>
            <Feature>
              <div className="h-full w-4/5">
                <div className="text-center">
                  <img src="https://cdn.shopify.com/s/files/1/0279/3173/8210/files/LED_Neon_Block_3.jpg?v=1632360158" alt="Pay In Instalments - Interest Free" />
                </div>
                <div className="text-center pt-4 px-5 pb-2">
                  <p className="title">Pay In Instalments - Interest Free</p>
                  <p className="subtitle">Don’t want to pay upfront? Use Afterpay or Klarna and pay in 4 instalments. No interest. No hidden fees.</p>
                </div>
              </div>
            </Feature>
          </div>
          <InfoWrapper>
            <div className="mt-5 py-3 px-5">
              <InfoHeading className="text-center" color="var(--primary-colour)">Good to know</InfoHeading>
              <div>
                <div className="mb-5">
                  <InfoItemHead><h3>Durable</h3></InfoItemHead>
                  <p className="text-gray-400 mb-5 leading-normal">Our signs are built to last &amp; rated for 50,000 hours of continuous use.</p>
                </div>
                <div className="mb-5">
                  <InfoItemHead><h3>Safe</h3></InfoItemHead>
                  <p className="text-gray-400 mb-5 leading-normal">Neon Signs are safe for both home &amp; business use, made with only the highest quality components.</p>
                </div>
                <div className="mb-5">
                  <InfoItemHead><h3>International</h3></InfoItemHead>
                  <p className="text-gray-400 mb-5 leading-normal">We will automatically ship your sign with the correct transformer &amp; plug based on your country.</p>
                </div>
                <div className="mb-5">
                  <InfoItemHead><h3>Dimmable</h3></InfoItemHead>
                  <p className="text-gray-400 mb-5 leading-normal">Our LED &amp; Glass Neon signs can both be dimmed. The LED variant even comes with a free remote &amp; dimmer.</p>
                </div>
                <div className="mb-5">
                  <InfoItemHead><h3>Energy Efficient</h3></InfoItemHead>
                  <p className="text-gray-400 mb-5 leading-normal">Both our LED &amp; Glass Neon Signs are energy efficient and won’t leave you with an expensive electricity bill.</p>
                </div>
                <div className="mb-5">
                  <InfoItemHead><h3>Zero Heat</h3></InfoItemHead>
                  <p className="text-gray-400 mb-5 leading-normal">Neon Signs are cool to the touch and give off no heat, even if you leave them on all day.</p>
                </div>
              </div>
            </div>
            <div className="mt-5 py-3 px-5">
              <InfoHeading className="text-center" color="var(--primary-colour)">Have some questions? We’re here for you!</InfoHeading>
              <div className="mb-5">
                <p className="text-gray-400 mb-5 leading-normal text-center">Feel free to reach out through our Live Chat, read through our FAQ page or send us an email at info@epicneons.com.</p>
              </div>
            </div>
          </InfoWrapper>
        </>
    )
}

export default SidebarReview;
