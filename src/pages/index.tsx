import React, { useRef } from 'react';
import { PageProps } from 'gatsby';

import Title from '@/components/Title';

import { Layout } from '@/components/Layout';
import { Headstone } from '@/components/Headstone';
import styled from '@emotion/styled';

import ReactDOMServer from 'react-dom/server';

const inscriptions = [
  `ya missed him`,
  `He died as he lived,
   dabbing`,
  `In retrospect,
  it WAS a bad idea`,
];

const HeadstoneWrapper = styled.div`
  margin: auto;
  max-width: 1200px;
`;

function svgString2Image(
  svgString: string,
  width: number,
  height: number,
  format = `png`,
) {
  // set default for format parameter
  // SVG data URL from SVG string
  const svgData = `data:image/svg+xml;base64,${btoa(
    unescape(encodeURIComponent(svgString)),
  )}`;
  // create canvas in memory(not in DOM)
  const canvas = document.createElement(`canvas`);
  // get canvas context for drawing on canvas
  const context = canvas.getContext(`2d`);
  // set canvas size
  canvas.width = width;
  canvas.height = height;
  // create image in memory(not in DOM)
  const tempImage = new Image();
  // later when image loads run this

  return new Promise((resolve, reject) => {
    tempImage.onload = () => {
      try {
        // async (happens later)
        // clear canvas
        context.clearRect(0, 0, width, height);
        // draw image with SVG data to canvas
        context.drawImage(tempImage, 0, 0, width, height);
        // snapshot canvas as png
        const pngData = canvas.toDataURL(`image/${format}`);
        // pass png data URL to callback
        resolve(pngData);
      } catch (err) {
        reject(err);
      }
    }; // end async'
    tempImage.onerror = (err) => {
      console.log(err);
      reject(err);
    };
    console.log(svgData);
    tempImage.src = svgData;
  });
}

const Home: React.FC<PageProps> = () => {
  const imageref = useRef<SVGSVGElement>();
  const yod = new Date().getFullYear() + Math.floor(Math.random() * 1000);
  const optionCount = inscriptions.length;
  const randomInscription =
    inscriptions[Math.floor(Math.random() * optionCount)];

  async function generateImage() {
    try {
      const htmlString = ReactDOMServer.renderToString(
        <Headstone
          yod={yod}
          inscription={randomInscription}
          imageref={imageref}
        />,
      );

      const dataUrl = await svgString2Image(
        htmlString,
        Math.ceil(imageref.current.width.baseVal.value),
        Math.ceil(imageref.current.height.baseVal.value),
        `png`,
      );

      fetch(`/.netlify/functions/upload_image`, {
        method: `POST`,
        body: JSON.stringify({
          dataUrl,
        }),
      });

      // const img = `<img src="${dataUrl}" class="image" />`;

      // const x = window.open();
      // x.document.open();
      // x.document.write(img);
      // x.document.close();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Layout>
      <Title />
      <HeadstoneWrapper>
        <Headstone
          yod={yod}
          inscription={randomInscription}
          imageref={imageref}
        />
      </HeadstoneWrapper>
      <button type="button" onClick={() => generateImage()}>
        Create image
      </button>
    </Layout>
  );
};

export default Home;
