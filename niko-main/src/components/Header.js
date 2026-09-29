import React from 'react';
import styled from 'styled-components';
import { getSectionSettings, unescapeHtml } from '../helpers/general';

const Heading = styled.h1`
   color: var(--primary-colour);
   font-size: 28px;
   font-style: normal;
   font-weight: bold;
   line-height: 1.1;

   @media screen and (min-width: 1025px) {
      margin-bottom: 30px;
      margin-top: 8px;
   }
`;

const Note = styled.p`
    margin-bottom: 0;
`;

const renderNote = function(){
    const data = getSectionSettings();
    if(data?.content?.title_top_note){
        return <Note>{data.content.title_top_note}</Note>
    }
    return '';
}

const renderContent = function(){
    const data = getSectionSettings();
    if(data?.content?.title_bottom_text){
        const content = unescapeHtml(data.content.title_bottom_text)
        return <div className='rte' dangerouslySetInnerHTML={{ __html: content }} />
    }
    return '';
}

const renderReviews = function(){
    const reviews = document.getElementById("app-start-rating");
    if(reviews){
        return <div style={{marginTop:'-16px'}} dangerouslySetInnerHTML={{ __html: reviews.innerHTML }} />
    }else{
        return '';
    }
}

const renderImagesWithText = function(){
    const data = getSectionSettings();
    if(!data?.settings) return '';
    const reviews_note_enable = data.settings.reviews_note_enable;
    const reviews_note_text = data.settings.reviews_note_text;
    const reviews_note_check = data.settings.reviews_note_check;
    const reviews_note_img_1 = data.settings.reviews_note_img_1;
    const reviews_note_img_2 = data.settings.reviews_note_img_2;
    if(reviews_note_enable){
        return <div style={{display:'flex',alignItems: 'center'}}>
        <div style={{display: "flex"}}>
            {reviews_note_img_1 &&
            <div style={{ display: "flex", alignItems: "center", zIndex: 4 }}>
                <img src={reviews_note_img_1} style={{borderRadius: '9999px', display: 'block', width: '32px', height: '32px'}}/>
                {reviews_note_check && <img src={reviews_note_check} style={{marginTop: '20px',marginLeft: '-11px', width: '16px', height: '16px'}}/>}
            </div>}
            {reviews_note_img_2 && <div style={{ display: "flex", alignItems: "center", marginLeft: "-12px"}}>
                <img src={reviews_note_img_2} style={{borderRadius: '9999px', display: 'block', width: '32px', height: '32px'}}/>
                {reviews_note_check && <img src={reviews_note_check} style={{marginTop: '20px',marginLeft: '-11px', width: '16px', height: '16px'}}/>}
            </div>}
          </div>
        <p style={{ marginBottom: 0, marginLeft: "0.5rem" }}>
          {reviews_note_text }
        </p>
      </div>
    }else{
        return '';
    }

}

function Header() {

    return (
        <>
         {/* {renderNote()} */}
         {renderImagesWithText()}
         <Heading className="mb-6" color="var(--primary-colour)">Individueller 3D Schriftzug aus Acrylglas</Heading>
         
         {renderReviews()}
         {renderContent()}
        </>
    )
}

export default Header
