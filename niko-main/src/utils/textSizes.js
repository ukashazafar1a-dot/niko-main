import axios from "axios";

// Predefined ratios for specific texts
const textRatios = {
    'Berlin': {
        'All of me loves all of you': {width1: 100.0, height1: 7.3301, width2: 50.0, height2: 3.6650},
        'get naked': {width1: 40.0, height1: 7.4720, width2: 30.0, height2: 5.604},
        'Willkommen': {width1: 50.0, height1: 6.2213, width2: 30.0, height2: 3.7328}
    },
    'Aachen': {
        'All of me loves all of you': {width1: 100.0, height1: 8.7618, width2: 50.0, height2: 4.3809 },
        'get naked': {width1: 40.0, height1: 8.6411, width2: 30.0, height2: 6.4808 },
        'Willkommen': {width1: 50.0, height1: 6.7829, width2: 30.0, height2: 4.0697 }
    }
};

// Helper function to find the nearest predefined text based on string length
function findNearestText(text,font) {
    let nearestText = null;
    let smallestDifference = Infinity;

    for (const predefinedText in textRatios[font]) {
        const difference = Math.abs(predefinedText.length - text.length);
        if (difference < smallestDifference) {
            smallestDifference = difference;
            nearestText = predefinedText;
        }
    }

    return nearestText;
}

// Function to calculate height given text and width
function calculateHeight(text,font, givenWidth) {
    let targetText = textRatios[font][text] ? text : findNearestText(text,font);
    if (!targetText) {
        throw new Error('No suitable text found for the given input');
    }
    
    const {width1, height1, width2, height2} = textRatios[font][targetText];
    
    // Calculate the ratios
    const ratio1 = height1 / width1;
    const ratio2 = height2 / width2;
    
    // Use average ratio to calculate height
    const averageRatio = (ratio1 + ratio2) / 2;
    const calculatedHeight = givenWidth * averageRatio;
    
    return calculatedHeight.toFixed(2);
}

// Function to calculate width given text and height
function calculateWidth(text,font, givenHeight) {
    let targetText = textRatios[font][text] ? text : findNearestText(text,font);
    if (!targetText) {
        throw new Error('No suitable text found for the given input');
    }
    
    const {width1, height1, width2, height2} = textRatios[font][targetText];
    
    // Calculate the ratios
    const ratio1 = width1 / height1;
    const ratio2 = width2 / height2;
    
    // Use average ratio to calculate width
    const averageRatio = (ratio1 + ratio2) / 2;
    const calculatedWidth = givenHeight * averageRatio;
    
    return calculatedWidth.toFixed(2);
}

// export function getSize(text,value,type,font){
//     console.log("Value",value)
//     try {
//         switch (type) {
//             case 'width':
//                 return calculateWidth(text,font,value)
//             case 'height':
//                 return calculateHeight(text,font,value)
//             default:
//                 throw new Error('type missing');
//         }
//     } catch (error) {
//         console.error(error.message);
//         return 0;
//     }   
// }

export async function getSize(text,value,type,font){
    if(text.length === 0){
        throw Error("Can't get measurements for null text")
    };
    try {
        const formData = new FormData();
        formData.append('font', font);
        formData.append('text', text);
        if(type === 'width'){
            const height = value == 0 ? 5 : value;
            formData.append('height', height)
        }else{
            const width = value == 0 ? 50 : value;
            formData.append('width', width)
        }
        const {data} = await axios.post(`${process.env.API_URL}/api/measurements`,formData);
        
        //If height is < 5cm then get the measurements with 5cm height.
        if((data.Height/10) < 5){
            return await getSize(text,5,'width',font);
        //If height is > 50cm then get the measurements with 50cm height.
        }else if((data.Height/10) > 50){
            return await getSize(text,50,'width',font);
        }
        //If width is < 30cm then get the measurements with 30cm width.
        if((data.Width/10) < 30){
            return await getSize(text,30,'height',font);
        //If width is > 400cm then get the measurements with 400cm width.
        }else if((data.Width/10) > 400){
            return await getSize(text,400,'height',font);
        }

        return {width: data.Width / 10, height: data.Height / 10,sizes: data.frequent_sizes}
    } catch (error) {
        console.log("Error>>",error);
        return 0;
    }
    
}