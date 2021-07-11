/* eslint-disable no-param-reassign */
import React, { useEffect, useRef, useState } from 'react';
import { PageProps } from 'gatsby';

import Title from '@/components/Title';

import { Layout } from '@/components/Layout';
import { Headstone } from '@/components/Headstone';
import styled from '@emotion/styled';

// import ReactDOMServer from 'react-dom/server';

const Button = styled.button`
  background-color: #1da1f2;
  color: white;
  padding: 10px;
  outline: 0;
  border: 0;
  border-radius: 5px;
  font-size: 1.2em;
  margin-bottom: 20px;
  cursor: pointer;
  display: flex;
  transition: 0.5s;
  &:hover,
  &:focus {
    background-color: #33aaf3;
  }
`;

const SVG = styled.svg`
  padding: 0 10px;
`;

const ButtonText = styled.div`
  line-height: 24px;
`;

const inscriptions = [
  `ya missed him`,
  `He died as he lived: dabbing`,
  `In retrospect, it WAS a bad idea`,
  `He fucked up`,
  `He fucked up real bad`,
  `He did a bad job at hang-gliding`,
  `It was an accident, probably, or possibly it wasn't an accident and it was fate, or destiny, or something even more sinister`,
];

const HeadstoneWrapper = styled.div`
  margin: auto;
  max-width: 1200px;
`;

const Input = styled.input`
  display: inline-block;
`;
const Label = styled.label`
  display: inline-block;
  margin-bottom: 20px;
  margin-right: 20px;
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

const isOverflown = ({ clientHeight, scrollHeight }) =>
  scrollHeight > clientHeight;

const resizeText = ({
  // element,
  elements,
  minSize = 10,
  maxSize = 512,
  step = 1,
  unit = `px`,
}) => {
  elements.forEach((el) => {
    let i = minSize;
    let overflow = false;

    const parent = el.parentNode;

    while (!overflow && i < maxSize) {
      el.style.fontSize = `${i}${unit}`;
      overflow = isOverflown(parent);

      if (!overflow) i += step;
    }

    // revert to last state where no overflow happened
    el.style.fontSize = `${i - step}${unit}`;
  });
};

const Home: React.FC<PageProps> = () => {
  const imageref = useRef<SVGSVGElement>();
  const yod = new Date().getFullYear() + Math.floor(Math.random() * 1000);
  const optionCount = inscriptions.length;
  const randomInscription =
    inscriptions[Math.floor(Math.random() * optionCount)];

  const [inscription, setInscription] = useState<string>(randomInscription);

  useEffect(() => {
    resizeText({
      elements: document.querySelectorAll(`.inscription-text`),
      step: 0.5,
      minSize: 1,
      maxSize: 64,
    });
  }, [inscription]);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.currentTarget;
    if (value === ``) {
      const newRandomInscription =
        inscriptions[Math.floor(Math.random() * optionCount)];
      return setInscription(newRandomInscription);
    }
    return setInscription(value);
  };

  const tweet = `Great news everyone! @thomascmost is dead!%0a${inscription}`;

  async function generateImage() {
    window.open(`https://twitter.com/intent/tweet?text=${tweet}`);
    // try {
    //   const htmlString = ReactDOMServer.renderToString(
    //     <Headstone
    //       yod={yod}
    //       inscription={randomInscription}
    //       imageref={imageref}
    //     />,
    //   );
    //   const dataUrl = await svgString2Image(
    //     htmlString,
    //     Math.ceil(imageref.current.width.baseVal.value),
    //     Math.ceil(imageref.current.height.baseVal.value),
    //     `png`,
    //   );
    //   fetch(`/.netlify/functions/upload_image`, {
    //     method: `POST`,
    //     body: JSON.stringify({
    //       dataUrl,
    //     }),
    //   });
    //   // const img = `<img src="${dataUrl}" class="image" />`;
    //   // const x = window.open();
    //   // x.document.open();
    //   // x.document.write(img);
    //   // x.document.close();
    // } catch (err) {
    //   console.log(err);
    // }
  }

  return (
    <Layout>
      <Title />
      <HeadstoneWrapper>
        <Headstone yod={yod} inscription={inscription} imageref={imageref} />
      </HeadstoneWrapper>
      <Label>Make your own:</Label>
      <Input maxLength={144} onChange={onChange} />
      {/* <ButtonLink
        href={`https://twitter.com/intent/tweet?text=${tweet}`}
        target="_blank"
        rel="noreferrer"
      > */}
      <Button type="button" onClick={() => generateImage()}>
        <SVG
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="white"
            d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
          />
        </SVG>
        <ButtonText>Tweet it!</ButtonText>
      </Button>
      {/* </ButtonLink> */}
    </Layout>
  );
};

export default Home;
