import React,{useEffect,useState,useContext} from 'react';
import styled from 'styled-components';
import {loadImage} from '../utils/generateImage';
import {AppContext} from '../store/Index';
import {Colors,Fonts} from '../Assets';
import {useMediaQuery} from 'react-responsive';
import {getVariant} from '../helpers/variants'
import { checkCartForVariantUpdate, resolveVariantCreation } from '../helpers/general';

const Wrapper = styled.label`
    position: fixed;
    background: rgba(255, 255, 255, 0.8);
    inset: 0px;
    z-index: 9999;

    > div {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: var(--secondary-colour);
        font-size: 18px;
        font-weight: bold;
        text-transform: uppercase;
        text-align: center;
    }
`;

const Spinner = styled.div`
    border-right: 5px solid rgb(102, 102, 102);
    border-bottom: 5px solid rgb(102, 102, 102);
    border-left: 5px solid rgb(102, 102, 102);
    border-image: initial;
    border-top: 5px solid var(--secondary-colour);
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: 2s linear 0s infinite normal none running spin;
    margin: 20px auto;
`;

const fetchCartAndCheck = async function () {
    var url = "".concat("/cart.js", "?t=").concat(Date.now());
    fetch(url, {
      credentials: "same-origin",
      method: "GET",
    })
      .then((response) => response.json())
      .then((cart) => {
        const hasNullItem = cart.items.some(
          (item) => item.product_id === null
        );
        if (hasNullItem) {
          console.log("Has>>", hasNullItem);
          setTimeout(() => {
            fetchCartAndCheck();
          }, 2000);
        } else {
          document.dispatchEvent(new CustomEvent("cart:build"));
          return;
        }
      });
  };

function AddToCartLoading() {

    const {color,font,text,selectedVariant,changeAddToCart,fontProperties,totalPrice,measurements} = useContext(AppContext);
    const [uploadedImg, setUploadedImg] = useState(null);
    const [genImg, setGenImg] = useState(true);
    const [creatingProduct,setCreatingProduct] = useState(true)
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' });

    const url = "https://api.cloudinary.com/v1_1/epicneons-com/image/upload";
    const addToCart = function(id){
        let formData = {
            'items': [{
              'id': id,
              'quantity': 1,
              'properties': {
                'Dein Wunschtext':text,
                'Schriftart':Fonts[font].name,
                'Material':Colors[color].name,
                'Länge': measurements.widthCm + 'cm',
                'Höhe': measurements.heightCm + 'cm'
              },
            }]
        };
        console.log("Adding...");
        fetch('/cart/add.js', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }).then(response => {
                // window.location.href = '/cart'
                if (window?.theme && theme?.settings?.cartType === "page") {
                    window.location = theme?.routes ? theme?.routes?.cartPage : '/cart';
                }

                document.dispatchEvent(new CustomEvent("cart:build"));
                document.dispatchEvent(new CustomEvent("cart:open"));
                changeAddToCart(false);
                fetchCartAndCheck();
                // checkCartForVariantUpdate(id,changeAddToCart)
        }).catch((error) => {
            console.error('Error:', error);
        });
    };

    const createVariant = async function(image,price){
        const variant = await getVariant(image,price)
        if(variant){
            setCreatingProduct(false)
            // resolveVariantCreation(variant,addToCart);
            setTimeout(()=>{
                addToCart(variant)
            },1000)
            
        }
    }

    useEffect(()=>{
        const t = text;
        const c = Colors[color].name;
        const f = Fonts[font].font;
        const p = fontProperties;
        const loadData = async function(){
            // const img = await loadImage(t,c,f,p,isTabletOrMobile);
            const img = 'https://cdn.shopify.com/s/files/1/0765/1301/8186/files/DeinAbschnittstext_9e995925-c218-4626-8d7c-011ebc39e622.png?v=1722331231';
            createVariant(img,totalPrice)
        }
        loadData();
    },[]);
    return (
        <Wrapper>
            {/* <div>{genImg ? 'Generating Images' : 'Creating Product'}<Spinner /></div> */}
            <div>{creatingProduct ? 'Produkt wird erstellt' : 'In den Warenkorb legen'}<Spinner/></div>
        </Wrapper>
    )
}

export default AddToCartLoading
