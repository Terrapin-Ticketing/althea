import React from 'react'
import PropTypes from 'prop-types'

import { Wrapper } from 'components/blocks';
import { Text } from 'components/elements';

const baseStyle = {
  // height: 50, 
  // width: 50,
  borderRadius: 4,
  padding: 25,
  // margin: 10,
  color: '#fff',
  fontFamily: 'Montserrat,sans-serif',
  // fontFamily: 'Open Sans,sans-serif'
}

const swatchBaseStyle = {
  height: 50, 
  width: 50,
  borderRadius: 4,
  padding: 25,
  margin: 10,
  color: '#fff',
  fontFamily: 'Montserrat,sans-serif',
  // fontFamily: 'Open Sans,sans-serif'
}

// const color900b = 'hsl(139, 95%, 8%)';
// const color800b = 'hsl(139, 80%, 13%)';
// const color700b = 'hsl(139, 65%, 20%)';
// const color600b = 'hsl(139, 58%, 30%)'; // ??
// const color500b = 'hsl(139, 50%, 45%)'; // base color
// const color400b = 'hsl(139, 68%, 60%)'; // ?
// const color300b = 'hsl(139, 75%, 80%)';
// const color200b = 'hsl(139, 83%, 88%)';
// const color100b = 'hsl(139, 90%, 93%)';

const color900 = 'hsl(150, 95%, 8%)';
const color800 = 'hsl(145, 80%, 13%)';
const color700 = 'hsl(143, 65%, 20%)';
const color600 = 'hsl(139, 58%, 30%)'; // ??
const color500 = 'hsl(139, 50%, 45%)'; // base color
const color400 = 'hsl(139, 68%, 60%)'; // ?
const color300 = 'hsl(125, 75%, 80%)';
const color200 = 'hsl(119, 83%, 88%)';
const color100 = 'hsl(130, 90%, 93%)';

const neutral = {
  color700: 'hsl(215, 22%, 17%)',
  color600: 'hsl( 212, 12%, 42%)',
  color500: 'hsl(214, 14%, 59%)',
  color400: 'hsl(207, 18%, 76%)',
  color300: 'hsl(212, 19%, 84%)',
  color200: 'hsl(207, 22%, 90%)',
  color100: 'hsl(210, 17%, 98%)'
};

const reds = {
  color700: 'hsl(359, 59%, 24%)',
  color600: 'hsl(358, 66%, 32%)',
  color500: 'hsl(358, 69%, 42%)',
  color400: 'hsl(359, 69%, 53%)',
  color300: 'hsl(359, 68%, 64%)',
  color200: 'hsl(359, 75%, 81%)',
  color100: 'hsl(0, 77%, 95%)'
};

const yellows = {
  color700: 'hsl(43, 58%, 23%)',
  color600: 'hsl(41, 56%, 35%)',
  color500: 'hsl(43, 55%, 53%)',
  color400: 'hsl(41, 85%, 69%)',
  color300: 'hsl(43, 88%, 81%)',
  color200: 'hsl(44, 90%, 92%)',
  color100: 'hsl(44, 100%, 98%)'
}

// element spacing
// const fourPx = 4;
// const eightPx = 8;
// const twelvePx = 12;
// const sixteenPx = 16;
// const twentyFourPx = 24;
// const thirtyTwoPx = 32;
// const fourtyEightPx = 48;
// const sixtyFourPx = 64;
// const nintySixPx = 96;
// const oneTwentyEightPx = 128;
// const oneNintyTwoPx = 192;
// const twoFiftySixPx = 256;
// const threeEightyFourPx = 384;
// const fiveTwelvePx = 512;
// const sixFourtyPx = 640;
// const sevenSixtyEightPx = 768;

// font sizes
// 12px
// 14px
// 16px
// 18px
// 20px
// 24px
// 30px
// 36px
// 48px
// 60px
// 72px


const DesignPaletteComponent = () =>
  <Wrapper flexColumn flexBox paddingFull>
    <Wrapper padding3x3>
      <Wrapper padding0x10><Text red500 fontSize11>Text 11</Text></Wrapper>
      <Wrapper padding0x9><Text base500 fontSize10>Text 10</Text></Wrapper>
      <Wrapper padding0x8><Text base500 fontSize9>Big Text 9</Text></Wrapper>
      <Wrapper padding0x7><Text base500 fontSize8>Big Text 8</Text></Wrapper>
      <Wrapper padding0x6><Text base500 fontSize7>Big Text 7</Text></Wrapper>
      <Wrapper padding0x5><Text base500 fontSize6>Big Text 6</Text></Wrapper>
      <Wrapper padding0x4><Text base500 fontSize5>Big Text 5</Text></Wrapper>
      <Wrapper padding0x3><Text base500 fontSize4>Big Text 4</Text></Wrapper>
      <Wrapper padding0x2><Text base500 fontSize3>Big Text 3</Text></Wrapper>
      <Wrapper padding0x1><Text base500 fontSize2>Big Text 2</Text></Wrapper>
      <Wrapper padding1x9><Text base500 fontSize1>Big Text 1</Text></Wrapper>
      <Wrapper padding2x9><Text>Big Text N/A</Text></Wrapper>

      <Wrapper margin3x0 style={{ ...baseStyle, background: color900 }}></Wrapper>
      <Wrapper margin4x2 style={{ ...baseStyle, background: color300, color: color700 }}>Get Started</Wrapper>
      <Wrapper margin10x9 style={{ ...baseStyle, background: color100 }}></Wrapper>

    </Wrapper>

    <Wrapper style={{ display: 'flex', flexDirection: 'row' }}>
      <div style={{ ...swatchBaseStyle, background: color900 }}></div>
      <div style={{ ...swatchBaseStyle, background: color800 }}></div>
      <div style={{ ...swatchBaseStyle, background: color700 }}></div>
      <div style={{ ...swatchBaseStyle, background: color600 }}></div>
      <div style={{ ...swatchBaseStyle, background: color500 }}>$</div>
      <div style={{ ...swatchBaseStyle, background: color400 }}></div>
      <div style={{ ...swatchBaseStyle, background: color300 }}></div>
      <div style={{ ...swatchBaseStyle, background: color200 }}></div>
      <div style={{ ...swatchBaseStyle, background: color100 }}></div>
    </Wrapper>

    <Wrapper style={{ display: 'flex', flexDirection: 'row', background: '#fff' }}>
      <div style={{ ...swatchBaseStyle, background: neutral.color700 }}></div>
      <div style={{ ...swatchBaseStyle, background: neutral.color600 }}></div>
      <div style={{ ...swatchBaseStyle, background: neutral.color500 }}>$</div>
      <div style={{ ...swatchBaseStyle, background: neutral.color400 }}></div>
      <div style={{ ...swatchBaseStyle, background: neutral.color300 }}></div>
      <div style={{ ...swatchBaseStyle, background: neutral.color200 }}></div>
      <div style={{ ...swatchBaseStyle, background: neutral.color100 }}></div>
    </Wrapper>

    <Wrapper style={{ display: 'flex', flexDirection: 'row', background: '#fff' }}>
      <div style={{ ...swatchBaseStyle, background: reds.color700 }}></div>
      <div style={{ ...swatchBaseStyle, background: reds.color600 }}></div>
      <div style={{ ...swatchBaseStyle, background: reds.color500 }}>$</div>
      <div style={{ ...swatchBaseStyle, background: reds.color400 }}></div>
      <div style={{ ...swatchBaseStyle, background: reds.color300 }}></div>
      <div style={{ ...swatchBaseStyle, background: reds.color200 }}></div>
      <div style={{ ...swatchBaseStyle, background: reds.color100 }}></div>
    </Wrapper>

    <Wrapper style={{ display: 'flex', flexDirection: 'row', background: '#fff' }}>
      <div style={{ ...swatchBaseStyle, background: yellows.color700 }}></div>
      <div style={{ ...swatchBaseStyle, background: yellows.color600 }}></div>
      <div style={{ ...swatchBaseStyle, background: yellows.color500 }}>$</div>
      <div style={{ ...swatchBaseStyle, background: yellows.color400 }}></div>
      <div style={{ ...swatchBaseStyle, background: yellows.color300 }}></div>
      <div style={{ ...swatchBaseStyle, background: yellows.color200 }}></div>
      <div style={{ ...swatchBaseStyle, background: yellows.color100 }}></div>
    </Wrapper>

    {/* <Wrapper style={{ display: 'flex', flexDirection: 'row' }}>
      <div style={{ ...swatchBaseStyle, background: color900b }}></div>
      <div style={{ ...swatchBaseStyle, background: color800b }}></div>
      <div style={{ ...swatchBaseStyle, background: color700b }}></div>
      <div style={{ ...swatchBaseStyle, background: color600b }}></div>
      <div style={{ ...swatchBaseStyle, background: color500b }}>$</div>
      <div style={{ ...swatchBaseStyle, background: color400b }}></div>
      <div style={{ ...swatchBaseStyle, background: color300b }}></div>
      <div style={{ ...swatchBaseStyle, background: color200b }}></div>
      <div style={{ ...swatchBaseStyle, background: color100b }}></div>
    </Wrapper> */}
  </Wrapper>

DesignPaletteComponent.propTypes = {
  afterSignup: PropTypes.func.isRequired
}

export default DesignPaletteComponent
