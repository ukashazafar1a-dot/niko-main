import React,{useEffect,useState,useContext} from 'react';
import styled from 'styled-components';
import {FinalImages,Fonts,Colors} from './Assets';

import Preview from "./components/Preview";
import Sidebar from "./components/Sidebar";
import MobileOverlay from "./components/MobileOverlay";

import { useMediaQuery } from 'react-responsive';
import {AppContext} from './store/Index.js';

import HowItWorks from "./components/HowItWorks.js";
import FinalDesign from './components/FinalDesign';
import GlobalCSS from './css/global.css';
import AddToCartLoading from './components/AddToCartLoading';
import { getCartItemProperties, getSectionSettings } from './helpers/general.js';
import IconWithText from './components/IconWithText.js';

const Wrapper = styled.div`
    display: flex;
    pointer-events: auto;
    flex-direction: column;
    font-weight: 500;
    letter-spacing: 0px;
    position: relative;

    @media (min-width:1025px){
        height: calc(100vh - 209px);
        flex-direction: row;
        overflow-y: auto;
    }
`;

const Heading = styled.h1`
   color: var(--primary-colour);
   font-size: 28px;
   font-style: normal;
   font-weight: bold;
   line-height: 1.1;
   margin-bottom: 1rem;
   padding: 0 0.5rem;

   & .shopify-block{
      display: inline-block;
      vertical-align: top;
      margin-top: 6px;
   }

   @media screen and (min-width: 1025px) {
      margin-bottom: 8px;
      margin-top: 8px;
   }
`;

function App() {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' });
    const {activeOverlay,color,font,isFinal,addToCart,setDefaultProperties,changeMeasurementsForText} = useContext(AppContext);
    const [isLoading,setIsLoading] = useState(false);

    useEffect(()=>{
        // Get properties of first product which is already in the cart.
        const loadCartProperties = async function(){
            let properties = await getCartItemProperties();
            console.log("Properties",properties)
            if(!properties) return;
            const text = properties['Dein Wunschtext'];
            const font = Fonts.findIndex(item => item.name === properties['Schriftart']);
            const color = Colors.findIndex(item => item.name === properties['Material']);
            const height = parseFloat(properties['Höhe']);
            const width = parseFloat(properties['Länge'])
            setDefaultProperties(text,font,color,{width,height})
            //Get width for selected height and frequent_sizes
            changeMeasurementsForText(font,text,height,'width')
        }
        loadCartProperties();
        //Preload images
        FinalImages.forEach((image) => {
            const newImage = new Image();
            newImage.src = image;
            window[image] = newImage;
        });
    },[]);

    const renderPreview = ()=>{
        if(isFinal){
            return <FinalDesign />
        }else{
            return (!isLoading) ? <Preview /> : <HowItWorks />;
        }
    }

    const renderReviews = function(){
        const reviews = document.getElementById("app-start-rating");
        if(reviews){
            return <span  dangerouslySetInnerHTML={{ __html: reviews.innerHTML }} />
        }else{
            return '';
        }
    }

    const renderPaymentIcons = function(){
        const data = getSectionSettings()
        if(data?.settings?.payment_icons){
            return <div className="mt-5">
                <img src={data.settings.payment_icons}/>
            </div>
        }else{
            return '';
        }
    }

    return (
        <>
            {isTabletOrMobile && <Heading color="var(--primary-colour)">
                Individueller 3D Schriftzug aus Acrylglas
                <span className='block'>
                {renderReviews()}
                </span>
            </Heading>}
            <Wrapper>
                {addToCart && <AddToCartLoading />}
                <GlobalCSS color={Colors[color].code} font={Fonts[font].font}/>
                {isTabletOrMobile && activeOverlay && <MobileOverlay/>}
                {renderPreview()}
                {!isLoading && <Sidebar />}
            </Wrapper>
            {/* {isTabletOrMobile && renderPaymentIcons()} */}
            <div className='px-5 '>
          
            </div>
         
        </>
    )
}

export default App
