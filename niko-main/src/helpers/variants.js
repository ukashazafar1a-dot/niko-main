import axios from "axios";

const productJson = document.getElementById('calculator-data')
const data = Object.freeze(JSON.parse(productJson.innerHTML))

export const getVariant = async function(img,price){
    const {title,weight,weight_unit,requires_shipping} = data.productInfo;
    const tag = data.tag;
    const formData = new FormData();
    formData.append('title',title);
    formData.append('weight',weight);
    formData.append('weight_unit',weight_unit);
    formData.append('requires_shipping',requires_shipping);
    formData.append('image',img);
    formData.append('tag',tag);
    formData.append('price',price)

    try {
        const {data} = await axios.post(`${process.env.API_URL}/api/variant`,formData)
        const variant = data?.variant;
        const id = variant?.id;
        return id;
    } catch (error) {
        console.log("Error",error)
        return null;
    }
}