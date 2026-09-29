function getWordsCount(text){
    const words = text.trim().match(/\b\w+\b/g);
    const count = words ? words.length : 0;
    return count;
}

export function GetErrorMessage(length=0,height=0,font=null,text){
    if(length > 120 && getWordsCount(text) == 1 && font != 'Aachen' && font != 'Berlin' && font != 'Kiel' ){
        return 'Einzelteile dürfen aufgrund der Versandbedingungen maximal 120 cm lang sein. Bei Bedarf für längere Einzelteile kontaktieren uns bitte per E-Mail für eine individuelle Lösung.';
    }else if(length < 30 || height < 5){
        return 'Achtung: Die gewählte Größe ist zu klein für die Fertigung! Die Höhe muss mindestens 5 cm und die Länge mindestens 30 cm betragen.';
    }else if(length > 400 || height > 50){
        return 'Achtung: Die gewählte Größe ist zu groß für die Fertigung! Die Höhe muss weniger als 50 cm und die Länge weniger als 250 cm betragen.';
    }else{
        return false;
    }
}


export function resolveVariantCreation(variant,callback){

    const url = process.env.API_URL.replace(/^http/, 'ws');
    const socket = new WebSocket(`${url}/ws/products/update/`);

    socket.onopen = function (e) {
        console.log('WebSocket connection opened');
    };

    socket.onmessage = function (e) {
        const data = JSON.parse(e.data);
        if(data?.variant_ids && data.variant_ids.includes(variant)){
            // setTimeout(()=>{
                callback(variant)
            // },4000)
        }
    };

    socket.onclose = function (e) {
        console.log('WebSocket connection closed');
    };

    socket.onerror = function (error) {
        console.log('WebSocket error:', error);
    };
}

export function checkCartForVariantUpdate(id,changeAddToCart){
    let attemptCount = 0, interval = 3000, maxAttempts = 5;
  
    const intervalId = setInterval(async () => {
      try {
        // Increment the attempt count
        attemptCount += 1;
  
        // Fetch the cart data from Shopify's /cart.json endpoint
        const response = await fetch('/cart.json', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });
  
        // Check if the response is okay
        if (!response.ok) {
          console.error(`Error fetching cart data: ${response.statusText}`);
          return;
        }
  
        // Parse the JSON response
        const cart = await response.json();

        // Check if any cart item has a null title
        const variant = cart.items.find(item => item.variant_id == id);
  
        // If a null title is found, log it and clear the interval
        if (variant.title != null) {
          changeAddToCart(false);
          window.location = '/cart';
          clearInterval(intervalId);
        }
  
        // Stop if the maximum number of attempts is reached
        if (attemptCount >= maxAttempts) {
          clearInterval(intervalId);
        }
  
      } catch (error) {
        console.error('Error during fetch operation:', error);
        clearInterval(intervalId);
      }
    }, interval);
}

export function getFontLineHeight(font){
  switch (font) {
    case 'Dortmund':
      return '66px';
    case 'Stuttgart':
    case 'Regensburg':
    case 'Potsdam':
      return '54px';
    case 'Osnabrueck':
      return '54px';
    case 'Mainz':
      return '74px';
    case 'Leipzig':
      return '64px';
    case 'Koeln':
      return '52px';
    case 'Hannover':
      return '52px';
    case 'Berlin':
      return '42px';
    case 'Hamburg':
      return '55px';
    case 'Bremen':
      return '66px';
    default:
      return 'inherit';
  }
}

export function getMaxFontSize(font){
  switch (font) {
    case 'Hamburg':
      return 35;
    case 'Dortmund':
      return 70;
    case 'Hannover':
      return 80;
    case 'Leipzig':
      return 90;
    case 'Koeln':
    case 'Mainz':
      return 100;
    default:
      return 85
  }
}

export function getMinFontSize(font){
  switch (font) {
    case 'Hamburg':
      return 20;
    default:
      return 42;
  }
}

export function getSectionSettings(){
    try {
      const productJson = document.getElementById('calculator-data')
      const obj = JSON.parse(productJson.innerHTML.trim())
      return Object.freeze(obj)
    } catch (error) {
      console.error("Error while fetching section settings")
      return null;
    }
}

export function checkAllOptionsVisited(options){
  let option = options.find((option)=>!option.isVisited)
  console.log("option>>",option)
  return option ? false : true;
}

export function unescapeHtml(escapedStr) {
  const textArea = document.createElement('textarea');
  textArea.innerHTML = escapedStr;
  return textArea.value;
}

export async function getCartItemProperties(){
  const requiredProperties = ["Dein Wunschtext", "Schriftart", "Material", "Länge", "Höhe"];

  try {
    const data = await fetch('/cart.js');
    const cart = await data.json();
    const firstMatchingItem = cart.items.find(item => 
        requiredProperties.every(prop => item.properties.hasOwnProperty(prop))
    );
    if(!firstMatchingItem) return null;
    return firstMatchingItem.properties;
  } catch (error) {
    console.error(error);
    return null; 
  }
}

//width and height in cm
export function caclulatePrice(widht,height,materialPrice,materialShipping){
    let price = 0;
    price = ((((parseFloat(height)+2)/100) * 1.404 * ((parseFloat(widht)+2)/100)) * materialPrice + materialShipping) * (1+180/100) * 1.19
    if(price < 29.95){
      price = 29.95;
    }
    return price * 100;
} 