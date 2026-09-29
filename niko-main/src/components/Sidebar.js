import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { AppContext } from '../store/Index';
import { useMediaQuery } from 'react-responsive';

import Header from './Header';

import TextField from './Texts/TextField';
import Font from './Texts/Font';
import Color from './Texts/Color';
import SizeControls from './Texts/SizeControls';
import PriceBar from './PriceBar';
import Menu from './Menu';
import MenuItems from './MenuItems';
import SidebarReview from './SidebarReview';
import { useDebounce } from '../hooks/useDebounce';
import { getSectionSettings } from '../helpers/general';
import DiscountNote from './Snippets/DiscountNote';
import IconWithText from './IconWithText';
import UserImages from './UserImages';

const SidebarWrapper = styled.div`
   background: rgb(255, 255, 255);
   max-width: 100%;
   width: 100%;

   @media screen and (min-width: 1025px){
      max-width: 420px;
      overflow: hidden scroll;
   }
`;

const Heading = styled.h1`
   color: var(--primary-colour);
   font-size: 28px;
   font-style: normal;
   font-weight: bold;
   line-height: 1.1;
   margin-bottom: 0;

   & .shopify-block{
      display: inline-block;
      vertical-align: top;
      margin-top: 6px;
   }
`;


function Sidebar() {
   const { product, activeMenu, measurements, changeMeasurements, isFinal } = useContext(AppContext);
   const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' });
   const SidebarRef = useRef(null);

   const [length, setLength] = useState(0)
   const [height, setHeight] = useState(0)
   const debouncedLength = useDebounce(length);
   const debouncedHeight = useDebounce(height);

   const renderMenu = function () {
      if (!isFinal) {
         if (isTabletOrMobile) {
            if (activeMenu) {
               return <MenuItems />;
            } else {
               return <Menu />;
            }
         }
      }
   };

   const renderReviews = function () {
      const reviews = document.getElementById("app-start-rating");
      if (reviews) {
         return <span dangerouslySetInnerHTML={{ __html: reviews.innerHTML }} />
      } else {
         return '';
      }
   }

   const renderHeader = function () {
      if (!isFinal) {
         return <Header />
      }
   };
   const renderContent = function () {
      if (isFinal) {
         return <SidebarReview />;
      } else {
         return <div>
            {/* <TextField /> */}
            <Font />
            <Color />
            <SizeControls length={length} height={height} setHeight={setHeight} setLength={setLength} />
            {!isTabletOrMobile && <div className='lg:mt-4 mt-5'>
               {renderDeliveryText()}
               <DiscountNote />
         
            </div>}
         </div>;
      }
   };

   const renderPaymentIcons = function () {
      const data = getSectionSettings()
      if (data?.settings?.payment_icons) {
         return <div className="mt-5">
            <img src={data.settings.payment_icons} />
           
         </div>
      } else {
         return '';
      }
   }

   const renderDeliveryText = function () {
      const now = new Date();
      // Zweiter Liefertermin: 7 Tage ab heute
      const secondDeliveryDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);
      // Aktualisieren des Textinhalts im span-Tag
      const new_date = secondDeliveryDate.toLocaleDateString('de-DE', { day: 'numeric', month: 'long' });
      return <p id="delivery-text1" className="w-full">Lieferung bis zum <span id="delivery-date">{new_date}</span></p>
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

   useEffect(() => {
      setLength(measurements.widthCm)
      setHeight(measurements.heightCm)
   }, [measurements])

   return (
      <SidebarWrapper ref={SidebarRef}>
         {renderMenu()}
         {!isTabletOrMobile && <div className="flex flex-col p-6">
            {/* {renderHeader()} */}
            <Heading color="var(--primary-colour)">
               Individueller 3D Schriftzug aus Acrylglas
               <span className='block'>
                  {renderReviews()}
               </span>
            </Heading>
            {renderContent()}
         </div>}
         {!isTabletOrMobile && <PriceBar wrapper={SidebarRef} />}
         {isTabletOrMobile && isFinal && <PriceBar wrapper={SidebarRef} />}
         <div className="p-6">
         <UserImages/>
        <IconWithText />
        </div>
      </SidebarWrapper>
   )
}

export default Sidebar
