import React, {useContext} from 'react';
import styled from 'styled-components';
import {AppContext} from '../store/Index';
import {formatMoney} from '../utils/formatMoney';

const Wrapper = styled.div`
    bottom: 25px;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    position: absolute;
    width: 100%;

    @media screen and (min-width: 1025px){
        bottom: unset;
        left: 30px;
        top: 50px;
        width: auto;
    }

    .switch-container {
        border: 1px solid rgba(255, 255, 255, 0.05);
    }

    .switch {
        border-width: 4px;
        background: rgb(48, 53, 63);
    }

    button {
        color: white;
        padding: 8px 12px;
    }

    > :first-child {
        margin-right: 15px;
    }

    .frame-preview.background--day & {
        button.isActive {
            color: white;
        }
        button {
            color: var(--secondary-colour);
        }
        .switch {
            background: rgba(48, 53, 63, 0.1);
        }
        > * {
            border-color: transparent;
        }
    }

    
`;

const ButtonsContainer = styled.div`
    border: 6px solid transparent;
    border-radius: 5px;
    display: flex;
    position: relative;
    background: var(--bg-colour);

    ::before {
        background: var(--secondary-colour);
        border-radius: 3px;
        bottom: 0px;
        content: "";
        position: absolute;
        right: 0px;
        top: 0px;
        transition: right 0.4s ease 0s;
        width: 50%;
    }

    &.isActive::before {
        right: 50%;
    }
`;

const Button = styled.button`
    border: 0px;
    background: none;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    display: flex;
    padding: 11px 14px;
    z-index: 1;
    color: var(--secondary-colour);
    flex: 1 1 0%;

    &.isActive {
        color: rgb(255, 255, 255);
    }

    svg {
        margin: 0px 5px;
    }
`;

const Price = styled.div`
    color: rgb(221, 221, 221);
    line-height: 1.5;
    margin-top: 20px;
    font-size: 18px !important;
    font-weight: bold !important;

    .frame-preview.background--day &{
        color: var(--primary-colour);
    }
`;

function Controls({isMobile}) {
    const {lightOn,toggleLight,backgroundDay,toggleBackground,totalPrice,loadings} = useContext(AppContext);

    const handleToggle = (position)=>{
        toggleLight(position);
    }

    const handleBackground = (position)=>{
        toggleBackground(position);
    }

    return (
      <Wrapper>
        <div className="flex flex-col">
           <div className="flex">
              <div className="flex switch-container">
                 <ButtonsContainer className={`switch ${backgroundDay ? 'isActive' : ''}`}>
                    <Button onClick={()=>handleBackground(true)} className={`${backgroundDay ? 'isActive' : ''}`}>
                       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z" stroke="currentcolor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                          <path d="M12 1V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                          <path d="M12 21V23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                          <path d="M4.22 4.22L5.64 5.64" stroke="currentcolor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                          <path d="M18.36 18.36L19.78 19.78" stroke="currentcolor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                          <path d="M1 12H3" stroke="currentcolor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                          <path d="M21 12H23" stroke="currentcolor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                          <path d="M4.22 19.78L5.64 18.36" stroke="currentcolor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                          <path d="M18.36 5.64L19.78 4.22" stroke="currentcolor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                       </svg>
                    </Button>
                    <Button onClick={()=>handleBackground(false)} className={`${backgroundDay ? '' : 'isActive'}`}>
                       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M21 12.79C20.8427 14.4922 20.2039 16.1144 19.1582 17.4668C18.1126 18.8192 16.7035 19.8458 15.0957 20.4265C13.4879 21.0073 11.748 21.1181 10.0795 20.7461C8.41101 20.3741 6.88299 19.5345 5.67422 18.3258C4.46545 17.117 3.62593 15.589 3.2539 13.9205C2.88187 12.252 2.99271 10.5121 3.57345 8.9043C4.1542 7.29651 5.18082 5.88737 6.53321 4.84175C7.88559 3.79614 9.50779 3.15731 11.21 3C10.2134 4.34827 9.73384 6.00945 9.85852 7.68141C9.98321 9.35338 10.7039 10.9251 11.8894 12.1106C13.0749 13.2961 14.6466 14.0168 16.3186 14.1415C17.9905 14.2662 19.6517 13.7866 21 12.79Z" fill="currentColor"></path>
                          <path d="M21 12.79L21.2489 12.813C21.258 12.7149 21.2086 12.6206 21.1227 12.5722C21.0369 12.5238 20.9306 12.5304 20.8514 12.589L21 12.79ZM11.21 3L11.411 3.1486C11.4696 3.06936 11.4762 2.9631 11.4278 2.87726C11.3794 2.79141 11.2851 2.74199 11.187 2.75106L11.21 3ZM20.7511 12.767C20.5981 14.4219 19.977 15.9991 18.9605 17.3139L19.356 17.6197C20.4307 16.2298 21.0873 14.5625 21.2489 12.813L20.7511 12.767ZM18.9605 17.3139C17.9439 18.6287 16.5739 19.6268 15.0108 20.1914L15.1806 20.6617C16.8331 20.0648 18.2814 19.0097 19.356 17.6197L18.9605 17.3139ZM15.0108 20.1914C13.4476 20.756 11.756 20.8638 10.1339 20.5021L10.0251 20.9901C11.7399 21.3725 13.5282 21.2585 15.1806 20.6617L15.0108 20.1914ZM10.1339 20.5021C8.51177 20.1404 7.02619 19.3242 5.851 18.149L5.49744 18.5026C6.73979 19.7449 8.31026 20.6077 10.0251 20.9901L10.1339 20.5021ZM5.851 18.149C4.6758 16.9738 3.85961 15.4882 3.49791 13.8661L3.00989 13.9749C3.39226 15.6897 4.2551 17.2602 5.49744 18.5026L5.851 18.149ZM3.49791 13.8661C3.13621 12.244 3.24397 10.5524 3.80858 8.98923L3.33832 8.81937C2.74145 10.4718 2.62753 12.2601 3.00989 13.9749L3.49791 13.8661ZM3.80858 8.98923C4.3732 7.4261 5.37131 6.0561 6.68612 5.03953L6.38029 4.64397C4.99034 5.71863 3.9352 7.16692 3.33832 8.81937L3.80858 8.98923ZM6.68612 5.03953C8.00094 4.02296 9.57808 3.40188 11.233 3.24894L11.187 2.75106C9.4375 2.91274 7.77024 3.56932 6.38029 4.64397L6.68612 5.03953ZM11.009 2.8514C9.97677 4.24782 9.48008 5.96833 9.60922 7.70001L10.1078 7.66282C9.9876 6.05057 10.45 4.44872 11.411 3.1486L11.009 2.8514ZM9.60922 7.70001C9.73835 9.43168 10.4847 11.0595 11.7126 12.2874L12.0662 11.9338C10.923 10.7906 10.2281 9.27507 10.1078 7.66282L9.60922 7.70001ZM11.7126 12.2874C12.9405 13.5153 14.5683 14.2616 16.3 14.3908L16.3372 13.8922C14.7249 13.7719 13.2094 13.077 12.0662 11.9338L11.7126 12.2874ZM16.3 14.3908C18.0317 14.5199 19.7522 14.0232 21.1486 12.991L20.8514 12.589C19.5513 13.55 17.9494 14.0124 16.3372 13.8922L16.3 14.3908Z" fill="currentColor"></path>
                          <path d="M14.6 7.57616C15.5757 7.57616 16.4 8.41318 16.4 9.40397C16.4 9.73314 16.6686 10 17 10C17.3314 10 17.6 9.73314 17.6 9.40397C17.6 8.41318 18.4243 7.57616 19.4 7.57616C19.7314 7.57616 20 7.3093 20 6.98013C20 6.65097 19.7314 6.38411 19.4 6.38411C18.4075 6.38411 17.6 5.58197 17.6 4.59603C17.6 4.26686 17.3314 4 17 4C16.6686 4 16.4 4.26686 16.4 4.59603C16.4 5.58197 15.5925 6.38411 14.6 6.38411C14.2686 6.38411 14 6.65097 14 6.98013C14 7.3093 14.2686 7.57616 14.6 7.57616Z" fill="currentColor"></path>
                       </svg>
                    </Button>
                 </ButtonsContainer>
              </div>
              <div className="flex switch-container">
                 <ButtonsContainer className={`switch ${lightOn ? 'isActive' : ''}`} >
                    <Button onClick={()=>handleToggle(true)} className={`${lightOn ? 'isActive' : ''}`}>
                       <svg width="20" height="11" viewBox="0 0 20 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5.194 10.14C7.966 10.14 9.856 8.11 9.856 5.128C9.856 2.132 7.98 0.102 5.194 0.102C2.422 0.102 0.532 2.132 0.532 5.128C0.532 8.11 2.422 10.14 5.194 10.14ZM5.194 8.474C3.416 8.474 2.282 7.172 2.282 5.128C2.282 3.07 3.416 1.768 5.194 1.768C6.972 1.768 8.106 3.084 8.106 5.128C8.106 7.158 6.972 8.474 5.194 8.474ZM17.5306 0.242V6.962L13.4286 0.242H11.6226V10H13.3726V3.252L17.4606 10H19.2806V0.242H17.5306Z" fill="currentColor"></path>
                       </svg>
                    </Button>
                    <Button onClick={()=>handleToggle(false)} className={`${lightOn ? '' : 'isActive'}`}>
                       <svg width="28" height="11" viewBox="0 0 28 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5.194 10.14C7.966 10.14 9.856 8.11 9.856 5.128C9.856 2.132 7.98 0.102 5.194 0.102C2.422 0.102 0.532 2.132 0.532 5.128C0.532 8.11 2.422 10.14 5.194 10.14ZM5.194 8.474C3.416 8.474 2.282 7.172 2.282 5.128C2.282 3.07 3.416 1.768 5.194 1.768C6.972 1.768 8.106 3.084 8.106 5.128C8.106 7.158 6.972 8.474 5.194 8.474ZM11.6226 10H13.3726V5.786H17.9226V4.176H13.3726V1.852H18.5386V0.242H11.6226V10ZM20.0992 10H21.8492V5.786H26.3992V4.176H21.8492V1.852H27.0152V0.242H20.0992V10Z" fill="currentColor"></path>
                       </svg>
                    </Button>
                 </ButtonsContainer>
              </div>
           </div>
           {!isMobile &&<Price >
                {(loadings.width || loadings.height) ? (
                    '...'
                ):(
                    <span className="money">{formatMoney(totalPrice)}</span>
                )}
            </Price>}
        </div>
      </Wrapper>
    )
}

export default Controls;
