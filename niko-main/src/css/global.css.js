import { createGlobalStyle} from 'styled-components';

export default createGlobalStyle`
html {
    --sign-colour: ${props => props.color};
    --sign-font: ${props => props.font};
    --sign-size: 60px;
    --sign-size-tablet: 22px;
    --sign-size-mobile: 30px;
    --sign-button-size: 20px;
    --sign-show-size: 40px;
    --sign-show-size-tablet: 12px;
    --sign-show-size-mobile: 40px;
    --sign-lineheight: 1;
    --sign-alignment: left;
    --sign-word-spacing: normal;
    --red: 255;
    --green: 255;
    --blue: 255;
}
    .loox-rating-label{
    font-weight: 400 !important;
   }
`;
