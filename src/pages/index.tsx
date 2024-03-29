/* eslint-disable no-param-reassign */
import React, { useEffect, useRef, useState } from 'react';
import { PageProps } from 'gatsby';

import Title from '@/components/Title';

import { Layout } from '@/components/Layout';
import { Headstone } from '@/components/Headstone';
import styled from '@emotion/styled';

// import ReactDOMServer from 'react-dom/server';

const Controls = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media (max-width: 700px) {
    > * {
      &:first-child {
        margin-top: 50px;
        margin-right: 0;
      }
      margin-right: 0;
      width: 100%;
      margin-bottom: 20px;
    }
  }
`;

const Button = styled.button`
  background-color: #1da1f2;
  color: white;
  padding: 10px 18px 10px 10px;
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
    background-color: #44bbf3;
  }
`;

const RefreshButton = styled(Button)`
  padding: 10px;
  margin-right: 20px;
  background-color: #19441f;
  &:hover,
  &:focus {
    background-color: #33662f;
  }
  div {
    display: none;
  }
  @media (max-width: 700px) {
    margin-right: 0;
    div {
      display: block;
    }
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
  `Shoulda worn a helmet!`,
  `Shoulda eaten more greens!`,
  `Should've drank less!`,
  `He will be missed (NOT!)`,
  `He is survived by men named Garrison, unfortunately`,
  `He died building this website`,
  `He saved the world, in his head, a lot.`,
  `#bye!`,
  `"Life is a highway to the bottom of a hole."`,
  `Drowned surprisingly quickly in some kind of sand`,
  `Quicksand, if you can believe it!`,
  `Quicksand! QUICKSAND! In ${new Date().getFullYear()}!!!`,
  `He died as he lived, in a weird way that no one really understood`,
  `It was an accident, probably, or possibly it wasn't an accident and it was fate, or destiny, or something even more sinister`,
  `Bear Attack!`,
  `Bears!`,
  `Dissolved at Yellowstone`,
  `Gored by a bison: they're more dangerous than they seem!`,
  `Chased down by an elk`,
  `Eaten as vengeance`,
  `Killed by a rival Thomas`,
  `Killed in a duel with his subconscious`,
];

const intros = [
  `Great news everyone!`,
  `Amaing news everyone!`,
  `Big news everyone!`,
  `BIG news everyone!`,
  `Big if true!`,
  `Big if true!!!`,
  `HUGE news y'all.`,
  `Excited to finally talk about this...`,
  `So excited to finally be able to talk about this!`,
  `Omg!`,
];

const deaths = [
  `is dead`,
  `is dead`,
  `is dead`,
  `is dead`,
  `is dead`,
  `died`,
  `kicked the bucket`,
  `is no more`,
  `finally shuffled off the mortal coil`,
  `joined his ancestors`,
  `went out to pasture`,
];

const HeadstoneWrapper = styled.div`
  margin: auto;
  max-width: 1200px;
`;

const Input = styled.input`
  border-radius: 5px;
  border: 0;
  font-size: 1.2em;
  height: 44px;
  margin-right: 20px;
  outline: 0;
  padding: 0 18px;
  min-width: calc(50% - 230px);
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

const getRandFromRng = (rng: string[]) => {
  const optionCount = rng.length;
  return rng[Math.floor(Math.random() * optionCount)];
};

const yod = new Date().getFullYear() + Math.floor(Math.random() * 1000);
const intro = getRandFromRng(intros);
const death = getRandFromRng(deaths);

const Home: React.FC<PageProps> = () => {
  const imageref = useRef<SVGSVGElement>();
  const randomInscription = getRandFromRng(inscriptions);

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
      const newRandomInscription = getRandFromRng(inscriptions);
      return setInscription(newRandomInscription);
    }
    return setInscription(value);
  };
  // randomize 'is dead' and 'great news'

  const regenerateText = () => {
    const newRandomInscription = getRandFromRng(inscriptions);
    if (typeof window !== `undefined` && (window as any).gtag) {
      (window as any).gtag(`event`, `click`, {
        action: `regen`,
        newRandomInscription,
      });
    }
    return setInscription(newRandomInscription);
  };

  const tweet = `${intro} @thomascmost ${death}!%0a${inscription}%0a%0a🪦 Find out more at thomas.rip`;

  async function generateImage() {
    if (typeof window !== `undefined` && (window as any).gtag) {
      (window as any).gtag(`event`, `click`, {
        action: `tweet`,
        tweet,
      });
    }
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
      <Controls>
        <Input
          placeholder="Make your own!"
          maxLength={144}
          onChange={onChange}
        />
        {/* <ButtonLink
        href={`https://twitter.com/intent/tweet?text=${tweet}`}
        target="_blank"
        rel="noreferrer"
      > */}
        <RefreshButton type="button" onClick={() => regenerateText()}>
          <SVG
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="white"
              d="M9 12l-4.463 4.969-4.537-4.969h3c0-4.97 4.03-9 9-9 2.395 0 4.565.942 6.179 2.468l-2.004 2.231c-1.081-1.05-2.553-1.699-4.175-1.699-3.309 0-6 2.691-6 6h3zm10.463-4.969l-4.463 4.969h3c0 3.309-2.691 6-6 6-1.623 0-3.094-.65-4.175-1.699l-2.004 2.231c1.613 1.526 3.784 2.468 6.179 2.468 4.97 0 9-4.03 9-9h3l-4.537-4.969z"
            />
          </SVG>
          <ButtonText>Try Another!</ButtonText>
        </RefreshButton>
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
      </Controls>
      {/* </ButtonLink> */}
    </Layout>
  );
};

export default Home;
