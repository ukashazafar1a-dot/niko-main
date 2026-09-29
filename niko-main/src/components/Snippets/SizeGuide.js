import React from 'react'
import { getSectionSettings } from '../../helpers/general';
import styled from 'styled-components'

const Container = styled.div`
    margin: 0;
    margin-left: auto !important;

    & .tool-tip-trigger__title{
        display:flex;
        align-item:center;
        justify-content:flex-start;
        gap:10px;
        font-size: 20px;
        letter-spacing: 0.4px;
        text-decoration:underline;
        text-transform: capitalize;
    }
    & .image-minee{
        width:100%;

    }
    & .image-minee .image-wrap.loaded .image-element{
        opacity:1;
    }
    & .tool-tip-trigger__content {
        display: none !important;
    }
    @media(max-width:768px){
        & .image-minee img{
            width:100%;
            height:100%;
        }
    }
`;

function SizeGuide() {

    const data = getSectionSettings();

    const toolTipOpen = new CustomEvent("tooltip:open", {
        detail: {
          context: 'size-chart',
          content: `<div class="image-minee">
                    <img src="${data?.content?.size_chart_img}" alt="" loading="lazy" sizes="100vw" fetchpriority="high" class="mobile--image"/>
                </div>`,
        },
        bubbles: true,
      });

      function handleClick(e){
        e.stopPropagation();
        document.dispatchEvent(toolTipOpen);
      }

  return (
    <Container class="size-chart__standalone size-guide-popup">
        {data?.content?.size_chart_img && <div class="tool-tip-trigger" data-tool-tip="size-chart" onClick={handleClick}>
            <div class="tool-tip-trigger__title">
                {data.content.size_chart_label && <span style={{fontWeight:'400'}}>{data.content.size_chart_label}</span>}
            </div>
            <span
                class="tool-tip-trigger__content"
                data-tool-tip-content=""
            >
                <div class="image-minee">
                    <img src="//www.dein-lieblingswerk.de/cdn/shop/files/hi.jpg?v=1732292812&width=3840" alt="" loading="lazy" sizes="100vw" fetchpriority="high" class="mobile--image"/>
                </div>
            </span>
        </div>}
    </Container>
  )
}

export default SizeGuide