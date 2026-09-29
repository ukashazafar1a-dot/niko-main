import React from 'react'
import { getSectionSettings } from '../../helpers/general';
import styled from 'styled-components';


const Container = styled.div`
    & .quantity-popup{
      margin:10px 0;
    }
    & .quantity-popup .tool-tip-trigger__title{
      display:flex;
      align-item:center;
      justify-content:flex-start;
      gap:10px;
      font-size: 16px;
      letter-spacing: 0.4px;
  
    }
      
    & .image-minee{
      width:100%;

    }
    & .image-minee .image-wrap.loaded .image-element{
      opacity:1;
    }
    @media(max-width:768px){
      & .image-minee img{
        width:100%;
        height:100%;
      }
    }
`;

function DiscountNote() {

    const data = getSectionSettings();

    const toolTipOpen = new CustomEvent("tooltip:open", {
        detail: {
            context: 'size-chart',
            content: `<div class="image-minee">
                    <img src="${data?.content?.discount_note_img}" alt="" loading="lazy" sizes="100vw" fetchpriority="high" class="mobile--image"/>
                </div>`,
        },
        bubbles: true,
    });

    function handleClick(e){
    e.stopPropagation();
    document.dispatchEvent(toolTipOpen);
    }
  return (
    <Container className='size-chart__standalone quantity-popup'>
      {data?.content?.discount_note_img && <tool-tip-trigger class="tool-tip-trigger" data-tool-tip="size-chart">
        <div class="tool-tip-trigger__title" style={{fontSize: '16px',letterSpacing: '0.4px', textDecoration:'none'}} >
          {data?.content?.discount_note_label && <span style={{marginRight:'.5em', fontWeight:'400'}}>{data.content.discount_note_label}</span>}
          {data?.content?.discount_note_action_text && <span><span onClick={handleClick} style={{textDecoration:'underline'}}><strong>{data.content.discount_note_action_text}</strong></span></span>}
        </div>
        <span
          class="tool-tip-trigger__content"
          data-tool-tip-content=""
        >
        </span>
      </tool-tip-trigger>}
  </Container>
  )
}


{/* <div class="size-chart__standalone quantity-popup">
  
  <tool-tip-trigger class="tool-tip-trigger" data-tool-tip="size-chart">
    <div class="tool-tip-trigger__title">
      <span>Mengenrabatt ab 2 Artikel:</span>
      <span><span style="text-decoration:underline"><strong>Erfahre mehr</strong></span></span>
    </div>
    <span class="tool-tip-trigger__content" data-tool-tip-content="">
      <div class="image-minee">
        
        <img src="//www.dein-lieblingswerk.de/cdn/shop/files/Mengenrabatt-2.jpg?v=1733152283&amp;width=3840" alt="" srcset="//www.dein-lieblingswerk.de/cdn/shop/files/Mengenrabatt-2.jpg?v=1733152283&amp;width=750 750w, //www.dein-lieblingswerk.de/cdn/shop/files/Mengenrabatt-2.jpg?v=1733152283&amp;width=1100 1100w, //www.dein-lieblingswerk.de/cdn/shop/files/Mengenrabatt-2.jpg?v=1733152283&amp;width=1500 1500w, //www.dein-lieblingswerk.de/cdn/shop/files/Mengenrabatt-2.jpg?v=1733152283&amp;width=1780 1780w, //www.dein-lieblingswerk.de/cdn/shop/files/Mengenrabatt-2.jpg?v=1733152283&amp;width=2000 2000w, //www.dein-lieblingswerk.de/cdn/shop/files/Mengenrabatt-2.jpg?v=1733152283&amp;width=3000 3000w, //www.dein-lieblingswerk.de/cdn/shop/files/Mengenrabatt-2.jpg?v=1733152283&amp;width=3840 3840w" height="538" loading="lazy" sizes="100vw" fetchpriority="high" class="mobile--image">
      </div>
    </span>
  </tool-tip-trigger>

</div> */}


export default DiscountNote