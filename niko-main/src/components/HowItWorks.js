import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    -webkit-box-align: center;
    align-items: center;
    display: flex;
    background: radial-gradient(circle, rgb(69, 73, 93) 0%, rgb(45, 48, 63) 100%);
    flex-direction: column;
    max-width: calc(100% - 420px);
    position: relative;
    width: 100%;

    @media screen and (min-width: 1025px){
        height: 100%;
        min-height: 35vh;
    }

    @media screen and (max-width: 1024px){
        -webkit-box-flex: 1;
        flex-grow: 1;
        max-width: 100%;
    }
`;

const Title = styled.h1`
    color: rgb(255, 255, 255);
    font-family: Raleway, Arial, Helvetica, sans-serif;
    font-size: 28px;
    font-style: normal;
    font-weight: bold;
    line-height: 1.1;

    @media screen and (min-width: 1025px){
        margin-bottom: 30px;
        margin-top: 19px;
    }
`;

const Row = styled.div`
    display: flex;
    flex-direction: column;
    -webkit-box-pack: justify;
    justify-content: space-between;
    margin: 0px auto;
    max-width: 75%;
    padding: 0px 0px 40px;

    &:first-of-type {
        padding: 25px 0px 0px;
    }

    @media screen and (min-width: 1025px){
        padding: 25px 40px 40px;
        flex-direction: row;
        background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAsYAAAABCAYAAADdGmiQAAAAAXNSR0IArs4c6QAAAEdJREFUSA3t0qERADAIBEHSRgT91/UidaSBE3gO/YPYuZPk1uC6+w1m5T9W0o9d7IVd7IVd7IVd7IVd7IVd7IVd7IVdtvXyAWg8jsLhQP3dAAAAAElFTkSuQmCC') center bottom / 150% no-repeat;
    }
`;

const Row01 = styled.div`
    display: flex;
    flex-direction: column;
    -webkit-box-pack: justify;
    justify-content: space-between;
    margin: 0px auto;
    max-width: 75%;
    padding: 0px 0px 40px;

    @media screen and (min-width: 1025px){
        padding: 25px 40px 40px;
        flex-direction: row;
        background: none center bottom / 150% no-repeat;
    }
`;

const Item = styled.div`
    text-align: center;

    h2 {
        font-size: 19px;
        line-height: 36px;
        margin-top: 20px;
        margin-bottom: 10px;
    }

    @media screen and (min-width: 1025px){
        width: 31%;
    }
`;

function HowItWorks() {
    return (
        <Wrapper>
            <div className="mt-12" style={{'overflow': 'auto'}}>
                <Title className="text-center" color="#fff">How it works?</Title>
                <Row>
                    <Item>
                        <h2 className="text-white text-center font-bold">Step 1</h2>
                        <p className="text-gray-400 mb-10">Fill out our 30-second custom request form</p>
                    </Item>
                    <Item>
                        <h2 className="text-white text-center font-bold">Step 2</h2>
                        <p className="text-gray-400 mb-10">We typically respond within the day with a free design render &amp; quote</p>
                    </Item>
                    <Item>
                        <h2 className="text-white text-center font-bold">Step 3</h2>
                        <p className="text-gray-400 mb-10">Let us know if you require any changes. We will work with you until you’re 100% satisfied.</p>
                    </Item>
                </Row>
                <Row01>
                    <Item>
                        <h2 className="text-white text-center font-bold">Step 4</h2>
                        <p className="text-gray-400 mb-10">Confirm the design, and place your order through our secure checkout.</p>
                    </Item>
                    <Item>
                        <h2 className="text-white text-center font-bold">Step 5</h2>
                        <p className="text-gray-400 mb-10">We manufacture, quality test &amp; express ship your sign directly tp you.</p>
                    </Item>
                    <Item>
                        <h2 className="text-white text-center font-bold">Step 6</h2>
                        <p className="text-gray-400 mb-10">Enjoy your one-of-a-kind handmade neon sign. Don’t forget to tag us on Instagram.</p>
                    </Item>
                </Row01>
            </div>
        </Wrapper>
    )
}

export default HowItWorks
