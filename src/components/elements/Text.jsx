import styled from 'styled-components'
import { 
  base900, base800, base700, base600, base500, base400, base300, base200, base100,
  gray700, gray600, gray500, gray400, gray300, gray200, gray100,
  red700, red600, red500, red400, red300, red200, red100,
  yellow700, yellow600, yellow500, yellow400, yellow300, yellow200, yellow100
} from 'styles/colors'

const Text = styled.span`
  text-align: ${p => p.center ? 'center' : p.right ? 'right' : 'left'}
  color: ${
    p => p.base900 ? base900 :
    p => p.base800 ? base800 :
    p => p.base700 ? base700 :
    p => p.base600 ? base600 :
    p => p.base500 ? base500 :
    p => p.base400 ? base400 :
    p => p.base300 ? base300 :
    p => p.base200 ? base200 :
    p => p.base100 ? base100 :
    p => p.gray700 ? gray700 :
    p => p.gray600 ? gray600 :
    p => p.gray500 ? gray500 :
    p => p.gray400 ? gray400 :
    p => p.gray300 ? gray300 :
    p => p.gray200 ? gray200 :
    p => p.gray100 ? gray100 :
    p => p.red700 ? red700 :
    p => p.red600 ? red600 :
    p => p.red500 ? red500 :
    p => p.red400 ? red400 :
    p => p.red300 ? red300 :
    p => p.red200 ? red200 :
    p => p.red100 ? red100 :
    p => p.yellow700 ? yellow700 :
    p => p.yellow600 ? yellow600 :
    p => p.yellow500 ? yellow500 :
    p => p.yellow400 ? yellow400 :
    p => p.yellow300 ? yellow300 :
    p => p.yellow200 ? yellow200 :
    p => p.yellow100 ? yellow100 :
    '#ff56f5' // pink to make it obvious
  }
  font-size: ${
    p => p.fontSize1 ? '12px' : 
    p => p.fontSize2 ? '14px' :
    p => p.fontSize3 ? '16px' :
    p => p.fontSize4 ? '18px' :
    p => p.fontSize5 ? '20px' :
    p => p.fontSize6 ? '24px' :
    p => p.fontSize7 ? '30px' :
    p => p.fontSize8 ? '36px' :
    p => p.fontSize9 ? '48px' :
    p => p.fontSize10 ? '60px' :
    p => p.fontSize11 ? '72px' :
    '12px' // should be obvious no size assigned
  }
  font-weight: ${
    p => p.fontWeight100 ? '100' : 
    p => p.fontWeight200 ? '200' :
    p => p.fontWeight300 ? '300' :
    p => p.fontWeight400 ? '400' :
    p => p.fontWeight500 ? '500' :
    p => p.fontWeight600 ? '600' :
    p => p.fontWeight700 ? '700' :
    p => p.fontWeight800 ? '800' :
    p => p.fontWeight900 ? '900' :
    '12px' // should be obvious no size assigned
  }
  margin-bottom: ${p => p.marginBottom ? '1rem' : '0rem'}
  @media (min-width: 48em) {
    writing-mode: ${p => p.vertical ? 'vertical-rl' : null}
    transform: ${p => p.vertical ? 'rotate(180deg)' : null}
  }
`

export default Text
