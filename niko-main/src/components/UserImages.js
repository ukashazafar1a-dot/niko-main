import React from 'react'
import styled from 'styled-components';

const ReviewContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 15px;
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: -12px;
`;

const ImageWrapper = styled.div`
  display: flex;
`;

const Image = styled.img`
  border-radius: 9999px;
  display: block;
  width: 32px;
  height: 32px;
    object-fit:cover;
`;

const SmallImage = styled.img`
  width: 16px;
  height: 16px;
  margin-top: 20px;
  margin-left: -11px;
  z-index: 1;

`;

const ReviewText = styled.p`
  margin-bottom: 0;
  margin-left: 0.5rem;
font-size: 13px;
font-family: 'Inter';
`;
const UserImages = () => {
    return (
        <ReviewContainer>
            <ImageWrapper>
                <ImageContainer>
                    <Image src="/cdn/shop/files/2148354939-min.jpg?v=1728982199&width=540" alt="" />
                    <SmallImage src="/cdn/shop/files/Lisa.png?v=1728981522&width=360" alt="" />
                </ImageContainer>
                <ImageContainer>
                    <Image src="/cdn/shop/files/2681-min.jpg?v=1728982040&width=540" alt="" />
                    <SmallImage src="/cdn/shop/files/Lisa.png?v=1728981522&width=360" alt="" />
                </ImageContainer>
            </ImageWrapper>
            <ReviewText>Anna, Tanja und 6000 andere sind begeistert.</ReviewText>
        </ReviewContainer>
    )
}

export default UserImages