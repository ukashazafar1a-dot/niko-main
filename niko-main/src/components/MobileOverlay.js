import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    background: rgb(45, 48, 63);
    inset: 0px;
    display: flex;
    flex-direction: column;
    position: absolute;
    z-index: 3;

    @media screen and (max-width: 768px){
      top: 0px;
    }
`;

const Wrapper01 = styled.div`
    -webkit-box-align: center;
    align-items: center;
    display: flex;
    -webkit-box-flex: 1;
    flex-grow: 1;
    flex-direction: column;
    margin: 0px auto;
    max-width: 100%;
`;

const Title = styled.div`
    margin-top: 10%;
    padding: 20px;
    text-align: center;
    width: 100%;
    color: var(--secondary-colour);
    font-weight: bold;
    text-transform: uppercase;
`;

const Header = styled.h1`
    color: rgb(255, 255, 255);
    font-size: 28px;
    font-style: normal;
    font-weight: bold;
    line-height: 1.1;
`;

function MobileOverlay() {

    return (
        <Wrapper>
            <Title>
                <span>Neon Icons</span>
            </Title>
            <Wrapper01>
                <div className="my-0 mx-auto w-9/12 text-center">
                    <Header className="mb-6" color="#ffffff">Individueller 3D Schriftzug aus Acrylglas</Header>
                </div>
            </Wrapper01>
        </Wrapper>
    )
}

export default MobileOverlay
