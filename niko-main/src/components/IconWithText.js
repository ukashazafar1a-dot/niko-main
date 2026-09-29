import React from 'react';
import styled from 'styled-components'; 

const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    flex-direction: column;
    gap: 0 ;

    & .point_manage_cta_pr {
        display: flex;
        align-items: center;
        gap: 5px;
        width: 100%;
        & span {
          font-weight: 500;
    font-size: 13px;
    }
        & img {
            width: 35px;
            height: 35px;
            object-fit: contain;
        }
    }
`;

const IconWithText = () => {
    return (
        <Wrapper>
            <div className="point_manage_cta_pr"> {/* ✅ Fixed className */}
                <img src="https://cdn.shopify.com/s/files/1/0765/1301/8186/files/pencil-icon-illustration-stationery-writing-pencil-silhouette-free-vector-removebg-preview.png?v=1739949092" alt="icon" />
                <span >Personalisierung nach Wunsch</span>
            </div>
            <div className="point_manage_cta_pr"> {/* ✅ Fixed className */}
                <img src="/cdn/shop/files/image__3_-removebg-preview.webp?v=1739949331" alt="icon" />
                <span >kostenloser Versand</span>
            </div>
            <div className="point_manage_cta_pr">
                <img src="/cdn/shop/files/paypal-3384015_640.webp?v=1739949459" alt="icon" />
                <span >Bezahle nach 30 Tagen</span>
            </div>
            <div className="point_manage_cta_pr">
                <img src="/cdn/shop/files/png-transparent-klarna-pink-button-tech-companies-thumbnail-removebg-preview.png?v=1739949654" alt="icon" />
                <span >Bezahle in 30 Tagen</span>
            </div>
        </Wrapper>
    );
};

export default IconWithText;
