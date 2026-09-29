import React from "react";
import ReactDom from "react-dom";
import App from "./App.js";
import {Provider} from './store/Index.js';

function Index() {
    return (
        <Provider>
            <App />
        </Provider>
    )
}

const rootEl = document.getElementById('neon-icons-customiser-app');

rootEl && ReactDom.render(<Index />, rootEl);



// class App extends React.Component {
//     constructor(props){
//         super(props);
//         this.getCart = this.getCart.bind(this);
//     }

//     componentDidMount() {
//         this.getCart();
//     }

//     getCart(){
//         fetch("/cart.js", {
//           headers: {
//             "Content-Type": "application/json",
//             pragma: "no-cache",
//             "cache-control": "no-cache"
//           },
//           credentials: "same-origin"
//         }).then(data => data.json()).then((res)=>{
//             console.log("Cart>>>",res);
//         });
//     }
// }