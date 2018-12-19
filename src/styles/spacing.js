export const spacing0 = '0px';
export const spacing1 = '4px';
export const spacing2 = '8px';
export const spacing3 = '12px';
export const spacing4 = '16px';
export const spacing5 = '24px';
export const spacing6 = '32px';
export const spacing7 = '48px';
export const spacing8 = '64px';
export const spacing9 = '96px';
export const spacing10 = '128px';
export const spacing11 = '192px';
export const spacing12 = '256px';
export const spacing13 = '384px';
export const spacing14 = '512px';
export const spacing15 = '640px';
export const spacing16 = '768px';

export const getPadding = (p) => {
  return (
    p.padding0x0 ? `${spacing0} ${spacing0}` : 
    p.padding0x1 ? `${spacing0} ${spacing1}` : 
    p.padding0x2 ? `${spacing0} ${spacing2}` : 
    p.padding0x3 ? `${spacing0} ${spacing3}` : 
    p.padding0x4 ? `${spacing0} ${spacing4}` : 
    p.padding0x5 ? `${spacing0} ${spacing5}` : 
    p.padding0x6 ? `${spacing0} ${spacing6}` : 
    p.padding0x7 ? `${spacing0} ${spacing7}` : 
    p.padding0x8 ? `${spacing0} ${spacing8}` : 
    p.padding0x9 ? `${spacing0} ${spacing9}` : 
    p.padding0x10 ? `${spacing0} ${spacing10}` : 
    p.padding0x11 ? `${spacing0} ${spacing11}` : 
    p.padding0x12 ? `${spacing0} ${spacing12}` : 
    p.padding0x13 ? `${spacing0} ${spacing13}` : 
    p.padding0x14 ? `${spacing0} ${spacing14}` : 
    p.padding0x15 ? `${spacing0} ${spacing15}` : 
    p.padding0x16 ? `${spacing0} ${spacing16}` : 
    
    p.padding1x0 ? `${spacing1} ${spacing0}` : 
    p.padding1x1 ? `${spacing1} ${spacing1}` : 
    p.padding1x2 ? `${spacing1} ${spacing2}` : 
    p.padding1x3 ? `${spacing1} ${spacing3}` : 
    p.padding1x4 ? `${spacing1} ${spacing4}` : 
    p.padding1x5 ? `${spacing1} ${spacing5}` : 
    p.padding1x6 ? `${spacing1} ${spacing6}` : 
    p.padding1x7 ? `${spacing1} ${spacing7}` : 
    p.padding1x8 ? `${spacing1} ${spacing8}` : 
    p.padding1x9 ? `${spacing1} ${spacing9}` : 
    p.padding1x10 ? `${spacing1} ${spacing10}` : 
    p.padding1x11 ? `${spacing1} ${spacing11}` : 
    p.padding1x12 ? `${spacing1} ${spacing12}` : 
    p.padding1x13 ? `${spacing1} ${spacing13}` : 
    p.padding1x14 ? `${spacing1} ${spacing14}` : 
    p.padding1x15 ? `${spacing1} ${spacing15}` : 
    p.padding1x16 ? `${spacing1} ${spacing16}` : 
    
    p.padding2x0 ? `${spacing2} ${spacing0}` : 
    p.padding2x1 ? `${spacing2} ${spacing1}` : 
    p.padding2x2 ? `${spacing2} ${spacing2}` : 
    p.padding2x3 ? `${spacing2} ${spacing3}` : 
    p.padding2x4 ? `${spacing2} ${spacing4}` : 
    p.padding2x5 ? `${spacing2} ${spacing5}` : 
    p.padding2x6 ? `${spacing2} ${spacing6}` : 
    p.padding2x7 ? `${spacing2} ${spacing7}` : 
    p.padding2x8 ? `${spacing2} ${spacing8}` : 
    p.padding2x9 ? `${spacing2} ${spacing9}` : 
    p.padding2x10 ? `${spacing2} ${spacing10}` : 
    p.padding2x11 ? `${spacing2} ${spacing11}` : 
    p.padding2x12 ? `${spacing2} ${spacing12}` : 
    p.padding2x13 ? `${spacing2} ${spacing13}` : 
    p.padding2x14 ? `${spacing2} ${spacing14}` : 
    p.padding2x15 ? `${spacing2} ${spacing15}` : 
    p.padding2x16 ? `${spacing2} ${spacing16}` : 
    
    p.padding3x0 ? `${spacing3} ${spacing0}` : 
    p.padding3x1 ? `${spacing3} ${spacing1}` : 
    p.padding3x2 ? `${spacing3} ${spacing2}` : 
    p.padding3x3 ? `${spacing3} ${spacing3}` : 
    p.padding3x4 ? `${spacing3} ${spacing4}` : 
    p.padding3x5 ? `${spacing3} ${spacing5}` : 
    p.padding3x6 ? `${spacing3} ${spacing6}` : 
    p.padding3x7 ? `${spacing3} ${spacing7}` : 
    p.padding3x8 ? `${spacing3} ${spacing8}` : 
    p.padding3x9 ? `${spacing3} ${spacing9}` : 
    p.padding3x10 ? `${spacing3} ${spacing10}` : 
    p.padding3x11 ? `${spacing3} ${spacing11}` : 
    p.padding3x12 ? `${spacing3} ${spacing12}` : 
    p.padding3x13 ? `${spacing3} ${spacing13}` : 
    p.padding3x14 ? `${spacing3} ${spacing14}` : 
    p.padding3x15 ? `${spacing3} ${spacing15}` : 
    p.padding3x16 ? `${spacing3} ${spacing16}` : 
    
    p.padding4x0 ? `${spacing4} ${spacing0}` : 
    p.padding4x1 ? `${spacing4} ${spacing1}` : 
    p.padding4x2 ? `${spacing4} ${spacing2}` : 
    p.padding4x3 ? `${spacing4} ${spacing3}` : 
    p.padding4x4 ? `${spacing4} ${spacing4}` : 
    p.padding4x5 ? `${spacing4} ${spacing5}` : 
    p.padding4x6 ? `${spacing4} ${spacing6}` : 
    p.padding4x7 ? `${spacing4} ${spacing7}` : 
    p.padding4x8 ? `${spacing4} ${spacing8}` : 
    p.padding4x9 ? `${spacing4} ${spacing9}` : 
    p.padding4x10 ? `${spacing4} ${spacing10}` : 
    p.padding4x11 ? `${spacing4} ${spacing11}` : 
    p.padding4x12 ? `${spacing4} ${spacing12}` : 
    p.padding4x13 ? `${spacing4} ${spacing13}` : 
    p.padding4x14 ? `${spacing4} ${spacing14}` : 
    p.padding4x15 ? `${spacing4} ${spacing15}` : 
    p.padding4x16 ? `${spacing4} ${spacing16}` :
    
    p.padding5x0 ? `${spacing5} ${spacing0}` : 
    p.padding5x1 ? `${spacing5} ${spacing1}` : 
    p.padding5x2 ? `${spacing5} ${spacing2}` : 
    p.padding5x3 ? `${spacing5} ${spacing3}` : 
    p.padding5x4 ? `${spacing5} ${spacing4}` : 
    p.padding5x5 ? `${spacing5} ${spacing5}` : 
    p.padding5x6 ? `${spacing5} ${spacing6}` : 
    p.padding5x7 ? `${spacing5} ${spacing7}` : 
    p.padding5x8 ? `${spacing5} ${spacing8}` : 
    p.padding5x9 ? `${spacing5} ${spacing9}` : 
    p.padding5x10 ? `${spacing5} ${spacing10}` : 
    p.padding5x11 ? `${spacing5} ${spacing11}` : 
    p.padding5x12 ? `${spacing5} ${spacing12}` : 
    p.padding5x13 ? `${spacing5} ${spacing13}` : 
    p.padding5x14 ? `${spacing5} ${spacing14}` : 
    p.padding5x15 ? `${spacing5} ${spacing15}` : 
    p.padding5x16 ? `${spacing5} ${spacing16}` :
    
    p.padding6x0 ? `${spacing6} ${spacing0}` : 
    p.padding6x1 ? `${spacing6} ${spacing1}` : 
    p.padding6x2 ? `${spacing6} ${spacing2}` : 
    p.padding6x3 ? `${spacing6} ${spacing3}` : 
    p.padding6x4 ? `${spacing6} ${spacing4}` : 
    p.padding6x5 ? `${spacing6} ${spacing5}` : 
    p.padding6x6 ? `${spacing6} ${spacing6}` : 
    p.padding6x7 ? `${spacing6} ${spacing7}` : 
    p.padding6x8 ? `${spacing6} ${spacing8}` : 
    p.padding6x9 ? `${spacing6} ${spacing9}` : 
    p.padding6x10 ? `${spacing6} ${spacing10}` : 
    p.padding6x11 ? `${spacing6} ${spacing11}` : 
    p.padding6x12 ? `${spacing6} ${spacing12}` : 
    p.padding6x13 ? `${spacing6} ${spacing13}` : 
    p.padding6x14 ? `${spacing6} ${spacing14}` : 
    p.padding6x15 ? `${spacing6} ${spacing15}` : 
    p.padding6x16 ? `${spacing6} ${spacing16}` :
    
    p.padding7x0 ? `${spacing7} ${spacing0}` : 
    p.padding7x1 ? `${spacing7} ${spacing1}` : 
    p.padding7x2 ? `${spacing7} ${spacing2}` : 
    p.padding7x3 ? `${spacing7} ${spacing3}` : 
    p.padding7x4 ? `${spacing7} ${spacing4}` : 
    p.padding7x5 ? `${spacing7} ${spacing5}` : 
    p.padding7x6 ? `${spacing7} ${spacing6}` : 
    p.padding7x7 ? `${spacing7} ${spacing7}` : 
    p.padding7x8 ? `${spacing7} ${spacing8}` : 
    p.padding7x9 ? `${spacing7} ${spacing9}` : 
    p.padding7x10 ? `${spacing7} ${spacing10}` : 
    p.padding7x11 ? `${spacing7} ${spacing11}` : 
    p.padding7x12 ? `${spacing7} ${spacing12}` : 
    p.padding7x13 ? `${spacing7} ${spacing13}` : 
    p.padding7x14 ? `${spacing7} ${spacing14}` : 
    p.padding7x15 ? `${spacing7} ${spacing15}` : 
    p.padding7x16 ? `${spacing7} ${spacing16}` :
    
    p.padding8x0 ? `${spacing8} ${spacing0}` : 
    p.padding8x1 ? `${spacing8} ${spacing1}` : 
    p.padding8x2 ? `${spacing8} ${spacing2}` : 
    p.padding8x3 ? `${spacing8} ${spacing3}` : 
    p.padding8x4 ? `${spacing8} ${spacing4}` : 
    p.padding8x5 ? `${spacing8} ${spacing5}` : 
    p.padding8x6 ? `${spacing8} ${spacing6}` : 
    p.padding8x7 ? `${spacing8} ${spacing7}` : 
    p.padding8x8 ? `${spacing8} ${spacing8}` : 
    p.padding8x9 ? `${spacing8} ${spacing9}` : 
    p.padding8x10 ? `${spacing8} ${spacing10}` : 
    p.padding8x11 ? `${spacing8} ${spacing11}` : 
    p.padding8x12 ? `${spacing8} ${spacing12}` : 
    p.padding8x13 ? `${spacing8} ${spacing13}` : 
    p.padding8x14 ? `${spacing8} ${spacing14}` : 
    p.padding8x15 ? `${spacing8} ${spacing15}` : 
    p.padding8x16 ? `${spacing8} ${spacing16}` :
    
    p.padding9x0 ? `${spacing9} ${spacing0}` : 
    p.padding9x1 ? `${spacing9} ${spacing1}` : 
    p.padding9x2 ? `${spacing9} ${spacing2}` : 
    p.padding9x3 ? `${spacing9} ${spacing3}` : 
    p.padding9x4 ? `${spacing9} ${spacing4}` : 
    p.padding9x5 ? `${spacing9} ${spacing5}` : 
    p.padding9x6 ? `${spacing9} ${spacing6}` : 
    p.padding9x7 ? `${spacing9} ${spacing7}` : 
    p.padding9x8 ? `${spacing9} ${spacing8}` : 
    p.padding9x9 ? `${spacing9} ${spacing9}` : 
    p.padding9x10 ? `${spacing9} ${spacing10}` : 
    p.padding9x11 ? `${spacing9} ${spacing11}` : 
    p.padding9x12 ? `${spacing9} ${spacing12}` : 
    p.padding9x13 ? `${spacing9} ${spacing13}` : 
    p.padding9x14 ? `${spacing9} ${spacing14}` : 
    p.padding9x15 ? `${spacing9} ${spacing15}` : 
    p.padding9x16 ? `${spacing9} ${spacing16}` :
    
    p.padding10x0 ? `${spacing10} ${spacing0}` : 
    p.padding10x1 ? `${spacing10} ${spacing1}` : 
    p.padding10x2 ? `${spacing10} ${spacing2}` : 
    p.padding10x3 ? `${spacing10} ${spacing3}` : 
    p.padding10x4 ? `${spacing10} ${spacing4}` : 
    p.padding10x5 ? `${spacing10} ${spacing5}` : 
    p.padding10x6 ? `${spacing10} ${spacing6}` : 
    p.padding10x7 ? `${spacing10} ${spacing7}` : 
    p.padding10x8 ? `${spacing10} ${spacing8}` : 
    p.padding10x9 ? `${spacing10} ${spacing9}` : 
    p.padding10x10 ? `${spacing10} ${spacing10}` : 
    p.padding10x11 ? `${spacing10} ${spacing11}` : 
    p.padding10x12 ? `${spacing10} ${spacing12}` : 
    p.padding10x13 ? `${spacing10} ${spacing13}` : 
    p.padding10x14 ? `${spacing10} ${spacing14}` : 
    p.padding10x15 ? `${spacing10} ${spacing15}` : 
    p.padding10x16 ? `${spacing10} ${spacing16}` :
    
    p.padding11x0 ? `${spacing11} ${spacing0}` : 
    p.padding11x1 ? `${spacing11} ${spacing1}` : 
    p.padding11x2 ? `${spacing11} ${spacing2}` : 
    p.padding11x3 ? `${spacing11} ${spacing3}` : 
    p.padding11x4 ? `${spacing11} ${spacing4}` : 
    p.padding11x5 ? `${spacing11} ${spacing5}` : 
    p.padding11x6 ? `${spacing11} ${spacing6}` : 
    p.padding11x7 ? `${spacing11} ${spacing7}` : 
    p.padding11x8 ? `${spacing11} ${spacing8}` : 
    p.padding11x9 ? `${spacing11} ${spacing9}` : 
    p.padding11x10 ? `${spacing11} ${spacing10}` : 
    p.padding11x11 ? `${spacing11} ${spacing11}` : 
    p.padding11x12 ? `${spacing11} ${spacing12}` : 
    p.padding11x13 ? `${spacing11} ${spacing13}` : 
    p.padding11x14 ? `${spacing11} ${spacing14}` : 
    p.padding11x15 ? `${spacing11} ${spacing15}` : 
    p.padding11x16 ? `${spacing11} ${spacing16}` :
    
    p.padding12x0 ? `${spacing12} ${spacing0}` : 
    p.padding12x1 ? `${spacing12} ${spacing1}` : 
    p.padding12x2 ? `${spacing12} ${spacing2}` : 
    p.padding12x3 ? `${spacing12} ${spacing3}` : 
    p.padding12x4 ? `${spacing12} ${spacing4}` : 
    p.padding12x5 ? `${spacing12} ${spacing5}` : 
    p.padding12x6 ? `${spacing12} ${spacing6}` : 
    p.padding12x7 ? `${spacing12} ${spacing7}` : 
    p.padding12x8 ? `${spacing12} ${spacing8}` : 
    p.padding12x9 ? `${spacing12} ${spacing9}` : 
    p.padding12x10 ? `${spacing12} ${spacing10}` : 
    p.padding12x11 ? `${spacing12} ${spacing11}` : 
    p.padding12x12 ? `${spacing12} ${spacing12}` : 
    p.padding12x13 ? `${spacing12} ${spacing13}` : 
    p.padding12x14 ? `${spacing12} ${spacing14}` : 
    p.padding12x15 ? `${spacing12} ${spacing15}` : 
    p.padding12x16 ? `${spacing12} ${spacing16}` :
    
    p.padding13x0 ? `${spacing13} ${spacing0}` : 
    p.padding13x1 ? `${spacing13} ${spacing1}` : 
    p.padding13x2 ? `${spacing13} ${spacing2}` : 
    p.padding13x3 ? `${spacing13} ${spacing3}` : 
    p.padding13x4 ? `${spacing13} ${spacing4}` : 
    p.padding13x5 ? `${spacing13} ${spacing5}` : 
    p.padding13x6 ? `${spacing13} ${spacing6}` : 
    p.padding13x7 ? `${spacing13} ${spacing7}` : 
    p.padding13x8 ? `${spacing13} ${spacing8}` : 
    p.padding13x9 ? `${spacing13} ${spacing9}` : 
    p.padding13x10 ? `${spacing13} ${spacing10}` : 
    p.padding13x11 ? `${spacing13} ${spacing11}` : 
    p.padding13x12 ? `${spacing13} ${spacing12}` : 
    p.padding13x13 ? `${spacing13} ${spacing13}` : 
    p.padding13x14 ? `${spacing13} ${spacing14}` : 
    p.padding13x15 ? `${spacing13} ${spacing15}` : 
    p.padding13x16 ? `${spacing13} ${spacing16}` :
    
    p.padding14x0 ? `${spacing14} ${spacing0}` : 
    p.padding14x1 ? `${spacing14} ${spacing1}` : 
    p.padding14x2 ? `${spacing14} ${spacing2}` : 
    p.padding14x3 ? `${spacing14} ${spacing3}` : 
    p.padding14x4 ? `${spacing14} ${spacing4}` : 
    p.padding14x5 ? `${spacing14} ${spacing5}` : 
    p.padding14x6 ? `${spacing14} ${spacing6}` : 
    p.padding14x7 ? `${spacing14} ${spacing7}` : 
    p.padding14x8 ? `${spacing14} ${spacing8}` : 
    p.padding14x9 ? `${spacing14} ${spacing9}` : 
    p.padding14x10 ? `${spacing14} ${spacing10}` : 
    p.padding14x11 ? `${spacing14} ${spacing11}` : 
    p.padding14x12 ? `${spacing14} ${spacing12}` : 
    p.padding14x13 ? `${spacing14} ${spacing13}` : 
    p.padding14x14 ? `${spacing14} ${spacing14}` : 
    p.padding14x15 ? `${spacing14} ${spacing15}` : 
    p.padding14x16 ? `${spacing14} ${spacing16}` :
    
    p.padding15x0 ? `${spacing15} ${spacing0}` : 
    p.padding15x1 ? `${spacing15} ${spacing1}` : 
    p.padding15x2 ? `${spacing15} ${spacing2}` : 
    p.padding15x3 ? `${spacing15} ${spacing3}` : 
    p.padding15x4 ? `${spacing15} ${spacing4}` : 
    p.padding15x5 ? `${spacing15} ${spacing5}` : 
    p.padding15x6 ? `${spacing15} ${spacing6}` : 
    p.padding15x7 ? `${spacing15} ${spacing7}` : 
    p.padding15x8 ? `${spacing15} ${spacing8}` : 
    p.padding15x9 ? `${spacing15} ${spacing9}` : 
    p.padding15x10 ? `${spacing15} ${spacing10}` : 
    p.padding15x11 ? `${spacing15} ${spacing11}` : 
    p.padding15x12 ? `${spacing15} ${spacing12}` : 
    p.padding15x13 ? `${spacing15} ${spacing13}` : 
    p.padding15x14 ? `${spacing15} ${spacing14}` : 
    p.padding15x15 ? `${spacing15} ${spacing15}` : 
    p.padding15x16 ? `${spacing15} ${spacing16}` :
    
    p.padding16x0 ? `${spacing16} ${spacing0}` : 
    p.padding16x1 ? `${spacing16} ${spacing1}` : 
    p.padding16x2 ? `${spacing16} ${spacing2}` : 
    p.padding16x3 ? `${spacing16} ${spacing3}` : 
    p.padding16x4 ? `${spacing16} ${spacing4}` : 
    p.padding16x5 ? `${spacing16} ${spacing5}` : 
    p.padding16x6 ? `${spacing16} ${spacing6}` : 
    p.padding16x7 ? `${spacing16} ${spacing7}` : 
    p.padding16x8 ? `${spacing16} ${spacing8}` : 
    p.padding16x9 ? `${spacing16} ${spacing9}` : 
    p.padding16x10 ? `${spacing16} ${spacing10}` : 
    p.padding16x11 ? `${spacing16} ${spacing11}` : 
    p.padding16x12 ? `${spacing16} ${spacing12}` : 
    p.padding16x13 ? `${spacing16} ${spacing13}` : 
    p.padding16x14 ? `${spacing16} ${spacing14}` : 
    p.padding16x15 ? `${spacing16} ${spacing15}` : 
    p.padding16x16 ? `${spacing16} ${spacing16}` :
    
    `${spacing0} ${spacing0}` // default case, no spacing
    )
};

export const getMargin = (p) => {
  return (
    p.margin0x0 ? `${spacing0} ${spacing0}` : 
    p.margin0x1 ? `${spacing0} ${spacing1}` : 
    p.margin0x2 ? `${spacing0} ${spacing2}` : 
    p.margin0x3 ? `${spacing0} ${spacing3}` : 
    p.margin0x4 ? `${spacing0} ${spacing4}` : 
    p.margin0x5 ? `${spacing0} ${spacing5}` : 
    p.margin0x6 ? `${spacing0} ${spacing6}` : 
    p.margin0x7 ? `${spacing0} ${spacing7}` : 
    p.margin0x8 ? `${spacing0} ${spacing8}` : 
    p.margin0x9 ? `${spacing0} ${spacing9}` : 
    p.margin0x10 ? `${spacing0} ${spacing10}` : 
    p.margin0x11 ? `${spacing0} ${spacing11}` : 
    p.margin0x12 ? `${spacing0} ${spacing12}` : 
    p.margin0x13 ? `${spacing0} ${spacing13}` : 
    p.margin0x14 ? `${spacing0} ${spacing14}` : 
    p.margin0x15 ? `${spacing0} ${spacing15}` : 
    p.margin0x16 ? `${spacing0} ${spacing16}` : 

    p.margin1x0 ? `${spacing1} ${spacing0}` : 
    p.margin1x1 ? `${spacing1} ${spacing1}` : 
    p.margin1x2 ? `${spacing1} ${spacing2}` : 
    p.margin1x3 ? `${spacing1} ${spacing3}` : 
    p.margin1x4 ? `${spacing1} ${spacing4}` : 
    p.margin1x5 ? `${spacing1} ${spacing5}` : 
    p.margin1x6 ? `${spacing1} ${spacing6}` : 
    p.margin1x7 ? `${spacing1} ${spacing7}` : 
    p.margin1x8 ? `${spacing1} ${spacing8}` : 
    p.margin1x9 ? `${spacing1} ${spacing9}` : 
    p.margin1x10 ? `${spacing1} ${spacing10}` : 
    p.margin1x11 ? `${spacing1} ${spacing11}` : 
    p.margin1x12 ? `${spacing1} ${spacing12}` : 
    p.margin1x13 ? `${spacing1} ${spacing13}` : 
    p.margin1x14 ? `${spacing1} ${spacing14}` : 
    p.margin1x15 ? `${spacing1} ${spacing15}` : 
    p.margin1x16 ? `${spacing1} ${spacing16}` : 

    p.margin2x0 ? `${spacing2} ${spacing0}` : 
    p.margin2x1 ? `${spacing2} ${spacing1}` : 
    p.margin2x2 ? `${spacing2} ${spacing2}` : 
    p.margin2x3 ? `${spacing2} ${spacing3}` : 
    p.margin2x4 ? `${spacing2} ${spacing4}` : 
    p.margin2x5 ? `${spacing2} ${spacing5}` : 
    p.margin2x6 ? `${spacing2} ${spacing6}` : 
    p.margin2x7 ? `${spacing2} ${spacing7}` : 
    p.margin2x8 ? `${spacing2} ${spacing8}` : 
    p.margin2x9 ? `${spacing2} ${spacing9}` : 
    p.margin2x10 ? `${spacing2} ${spacing10}` : 
    p.margin2x11 ? `${spacing2} ${spacing11}` : 
    p.margin2x12 ? `${spacing2} ${spacing12}` : 
    p.margin2x13 ? `${spacing2} ${spacing13}` : 
    p.margin2x14 ? `${spacing2} ${spacing14}` : 
    p.margin2x15 ? `${spacing2} ${spacing15}` : 
    p.margin2x16 ? `${spacing2} ${spacing16}` : 

    p.margin3x0 ? `${spacing3} ${spacing0}` : 
    p.margin3x1 ? `${spacing3} ${spacing1}` : 
    p.margin3x2 ? `${spacing3} ${spacing2}` : 
    p.margin3x3 ? `${spacing3} ${spacing3}` : 
    p.margin3x4 ? `${spacing3} ${spacing4}` : 
    p.margin3x5 ? `${spacing3} ${spacing5}` : 
    p.margin3x6 ? `${spacing3} ${spacing6}` : 
    p.margin3x7 ? `${spacing3} ${spacing7}` : 
    p.margin3x8 ? `${spacing3} ${spacing8}` : 
    p.margin3x9 ? `${spacing3} ${spacing9}` : 
    p.margin3x10 ? `${spacing3} ${spacing10}` : 
    p.margin3x11 ? `${spacing3} ${spacing11}` : 
    p.margin3x12 ? `${spacing3} ${spacing12}` : 
    p.margin3x13 ? `${spacing3} ${spacing13}` : 
    p.margin3x14 ? `${spacing3} ${spacing14}` : 
    p.margin3x15 ? `${spacing3} ${spacing15}` : 
    p.margin3x16 ? `${spacing3} ${spacing16}` : 

    p.margin4x0 ? `${spacing4} ${spacing0}` : 
    p.margin4x1 ? `${spacing4} ${spacing1}` : 
    p.margin4x2 ? `${spacing4} ${spacing2}` : 
    p.margin4x3 ? `${spacing4} ${spacing3}` : 
    p.margin4x4 ? `${spacing4} ${spacing4}` : 
    p.margin4x5 ? `${spacing4} ${spacing5}` : 
    p.margin4x6 ? `${spacing4} ${spacing6}` : 
    p.margin4x7 ? `${spacing4} ${spacing7}` : 
    p.margin4x8 ? `${spacing4} ${spacing8}` : 
    p.margin4x9 ? `${spacing4} ${spacing9}` : 
    p.margin4x10 ? `${spacing4} ${spacing10}` : 
    p.margin4x11 ? `${spacing4} ${spacing11}` : 
    p.margin4x12 ? `${spacing4} ${spacing12}` : 
    p.margin4x13 ? `${spacing4} ${spacing13}` : 
    p.margin4x14 ? `${spacing4} ${spacing14}` : 
    p.margin4x15 ? `${spacing4} ${spacing15}` : 
    p.margin4x16 ? `${spacing4} ${spacing16}` :

    p.margin5x0 ? `${spacing5} ${spacing0}` : 
    p.margin5x1 ? `${spacing5} ${spacing1}` : 
    p.margin5x2 ? `${spacing5} ${spacing2}` : 
    p.margin5x3 ? `${spacing5} ${spacing3}` : 
    p.margin5x4 ? `${spacing5} ${spacing4}` : 
    p.margin5x5 ? `${spacing5} ${spacing5}` : 
    p.margin5x6 ? `${spacing5} ${spacing6}` : 
    p.margin5x7 ? `${spacing5} ${spacing7}` : 
    p.margin5x8 ? `${spacing5} ${spacing8}` : 
    p.margin5x9 ? `${spacing5} ${spacing9}` : 
    p.margin5x10 ? `${spacing5} ${spacing10}` : 
    p.margin5x11 ? `${spacing5} ${spacing11}` : 
    p.margin5x12 ? `${spacing5} ${spacing12}` : 
    p.margin5x13 ? `${spacing5} ${spacing13}` : 
    p.margin5x14 ? `${spacing5} ${spacing14}` : 
    p.margin5x15 ? `${spacing5} ${spacing15}` : 
    p.margin5x16 ? `${spacing5} ${spacing16}` :

    p.margin6x0 ? `${spacing6} ${spacing0}` : 
    p.margin6x1 ? `${spacing6} ${spacing1}` : 
    p.margin6x2 ? `${spacing6} ${spacing2}` : 
    p.margin6x3 ? `${spacing6} ${spacing3}` : 
    p.margin6x4 ? `${spacing6} ${spacing4}` : 
    p.margin6x5 ? `${spacing6} ${spacing5}` : 
    p.margin6x6 ? `${spacing6} ${spacing6}` : 
    p.margin6x7 ? `${spacing6} ${spacing7}` : 
    p.margin6x8 ? `${spacing6} ${spacing8}` : 
    p.margin6x9 ? `${spacing6} ${spacing9}` : 
    p.margin6x10 ? `${spacing6} ${spacing10}` : 
    p.margin6x11 ? `${spacing6} ${spacing11}` : 
    p.margin6x12 ? `${spacing6} ${spacing12}` : 
    p.margin6x13 ? `${spacing6} ${spacing13}` : 
    p.margin6x14 ? `${spacing6} ${spacing14}` : 
    p.margin6x15 ? `${spacing6} ${spacing15}` : 
    p.margin6x16 ? `${spacing6} ${spacing16}` :

    p.margin7x0 ? `${spacing7} ${spacing0}` : 
    p.margin7x1 ? `${spacing7} ${spacing1}` : 
    p.margin7x2 ? `${spacing7} ${spacing2}` : 
    p.margin7x3 ? `${spacing7} ${spacing3}` : 
    p.margin7x4 ? `${spacing7} ${spacing4}` : 
    p.margin7x5 ? `${spacing7} ${spacing5}` : 
    p.margin7x6 ? `${spacing7} ${spacing6}` : 
    p.margin7x7 ? `${spacing7} ${spacing7}` : 
    p.margin7x8 ? `${spacing7} ${spacing8}` : 
    p.margin7x9 ? `${spacing7} ${spacing9}` : 
    p.margin7x10 ? `${spacing7} ${spacing10}` : 
    p.margin7x11 ? `${spacing7} ${spacing11}` : 
    p.margin7x12 ? `${spacing7} ${spacing12}` : 
    p.margin7x13 ? `${spacing7} ${spacing13}` : 
    p.margin7x14 ? `${spacing7} ${spacing14}` : 
    p.margin7x15 ? `${spacing7} ${spacing15}` : 
    p.margin7x16 ? `${spacing7} ${spacing16}` :

    p.margin8x0 ? `${spacing8} ${spacing0}` : 
    p.margin8x1 ? `${spacing8} ${spacing1}` : 
    p.margin8x2 ? `${spacing8} ${spacing2}` : 
    p.margin8x3 ? `${spacing8} ${spacing3}` : 
    p.margin8x4 ? `${spacing8} ${spacing4}` : 
    p.margin8x5 ? `${spacing8} ${spacing5}` : 
    p.margin8x6 ? `${spacing8} ${spacing6}` : 
    p.margin8x7 ? `${spacing8} ${spacing7}` : 
    p.margin8x8 ? `${spacing8} ${spacing8}` : 
    p.margin8x9 ? `${spacing8} ${spacing9}` : 
    p.margin8x10 ? `${spacing8} ${spacing10}` : 
    p.margin8x11 ? `${spacing8} ${spacing11}` : 
    p.margin8x12 ? `${spacing8} ${spacing12}` : 
    p.margin8x13 ? `${spacing8} ${spacing13}` : 
    p.margin8x14 ? `${spacing8} ${spacing14}` : 
    p.margin8x15 ? `${spacing8} ${spacing15}` : 
    p.margin8x16 ? `${spacing8} ${spacing16}` :

    p.margin9x0 ? `${spacing9} ${spacing0}` : 
    p.margin9x1 ? `${spacing9} ${spacing1}` : 
    p.margin9x2 ? `${spacing9} ${spacing2}` : 
    p.margin9x3 ? `${spacing9} ${spacing3}` : 
    p.margin9x4 ? `${spacing9} ${spacing4}` : 
    p.margin9x5 ? `${spacing9} ${spacing5}` : 
    p.margin9x6 ? `${spacing9} ${spacing6}` : 
    p.margin9x7 ? `${spacing9} ${spacing7}` : 
    p.margin9x8 ? `${spacing9} ${spacing8}` : 
    p.margin9x9 ? `${spacing9} ${spacing9}` : 
    p.margin9x10 ? `${spacing9} ${spacing10}` : 
    p.margin9x11 ? `${spacing9} ${spacing11}` : 
    p.margin9x12 ? `${spacing9} ${spacing12}` : 
    p.margin9x13 ? `${spacing9} ${spacing13}` : 
    p.margin9x14 ? `${spacing9} ${spacing14}` : 
    p.margin9x15 ? `${spacing9} ${spacing15}` : 
    p.margin9x16 ? `${spacing9} ${spacing16}` :

    p.margin10x0 ? `${spacing10} ${spacing0}` : 
    p.margin10x1 ? `${spacing10} ${spacing1}` : 
    p.margin10x2 ? `${spacing10} ${spacing2}` : 
    p.margin10x3 ? `${spacing10} ${spacing3}` : 
    p.margin10x4 ? `${spacing10} ${spacing4}` : 
    p.margin10x5 ? `${spacing10} ${spacing5}` : 
    p.margin10x6 ? `${spacing10} ${spacing6}` : 
    p.margin10x7 ? `${spacing10} ${spacing7}` : 
    p.margin10x8 ? `${spacing10} ${spacing8}` : 
    p.margin10x9 ? `${spacing10} ${spacing9}` : 
    p.margin10x10 ? `${spacing10} ${spacing10}` : 
    p.margin10x11 ? `${spacing10} ${spacing11}` : 
    p.margin10x12 ? `${spacing10} ${spacing12}` : 
    p.margin10x13 ? `${spacing10} ${spacing13}` : 
    p.margin10x14 ? `${spacing10} ${spacing14}` : 
    p.margin10x15 ? `${spacing10} ${spacing15}` : 
    p.margin10x16 ? `${spacing10} ${spacing16}` :

    p.margin11x0 ? `${spacing11} ${spacing0}` : 
    p.margin11x1 ? `${spacing11} ${spacing1}` : 
    p.margin11x2 ? `${spacing11} ${spacing2}` : 
    p.margin11x3 ? `${spacing11} ${spacing3}` : 
    p.margin11x4 ? `${spacing11} ${spacing4}` : 
    p.margin11x5 ? `${spacing11} ${spacing5}` : 
    p.margin11x6 ? `${spacing11} ${spacing6}` : 
    p.margin11x7 ? `${spacing11} ${spacing7}` : 
    p.margin11x8 ? `${spacing11} ${spacing8}` : 
    p.margin11x9 ? `${spacing11} ${spacing9}` : 
    p.margin11x10 ? `${spacing11} ${spacing10}` : 
    p.margin11x11 ? `${spacing11} ${spacing11}` : 
    p.margin11x12 ? `${spacing11} ${spacing12}` : 
    p.margin11x13 ? `${spacing11} ${spacing13}` : 
    p.margin11x14 ? `${spacing11} ${spacing14}` : 
    p.margin11x15 ? `${spacing11} ${spacing15}` : 
    p.margin11x16 ? `${spacing11} ${spacing16}` :

    p.margin12x0 ? `${spacing12} ${spacing0}` : 
    p.margin12x1 ? `${spacing12} ${spacing1}` : 
    p.margin12x2 ? `${spacing12} ${spacing2}` : 
    p.margin12x3 ? `${spacing12} ${spacing3}` : 
    p.margin12x4 ? `${spacing12} ${spacing4}` : 
    p.margin12x5 ? `${spacing12} ${spacing5}` : 
    p.margin12x6 ? `${spacing12} ${spacing6}` : 
    p.margin12x7 ? `${spacing12} ${spacing7}` : 
    p.margin12x8 ? `${spacing12} ${spacing8}` : 
    p.margin12x9 ? `${spacing12} ${spacing9}` : 
    p.margin12x10 ? `${spacing12} ${spacing10}` : 
    p.margin12x11 ? `${spacing12} ${spacing11}` : 
    p.margin12x12 ? `${spacing12} ${spacing12}` : 
    p.margin12x13 ? `${spacing12} ${spacing13}` : 
    p.margin12x14 ? `${spacing12} ${spacing14}` : 
    p.margin12x15 ? `${spacing12} ${spacing15}` : 
    p.margin12x16 ? `${spacing12} ${spacing16}` :

    p.margin13x0 ? `${spacing13} ${spacing0}` : 
    p.margin13x1 ? `${spacing13} ${spacing1}` : 
    p.margin13x2 ? `${spacing13} ${spacing2}` : 
    p.margin13x3 ? `${spacing13} ${spacing3}` : 
    p.margin13x4 ? `${spacing13} ${spacing4}` : 
    p.margin13x5 ? `${spacing13} ${spacing5}` : 
    p.margin13x6 ? `${spacing13} ${spacing6}` : 
    p.margin13x7 ? `${spacing13} ${spacing7}` : 
    p.margin13x8 ? `${spacing13} ${spacing8}` : 
    p.margin13x9 ? `${spacing13} ${spacing9}` : 
    p.margin13x10 ? `${spacing13} ${spacing10}` : 
    p.margin13x11 ? `${spacing13} ${spacing11}` : 
    p.margin13x12 ? `${spacing13} ${spacing12}` : 
    p.margin13x13 ? `${spacing13} ${spacing13}` : 
    p.margin13x14 ? `${spacing13} ${spacing14}` : 
    p.margin13x15 ? `${spacing13} ${spacing15}` : 
    p.margin13x16 ? `${spacing13} ${spacing16}` :

    p.margin14x0 ? `${spacing14} ${spacing0}` : 
    p.margin14x1 ? `${spacing14} ${spacing1}` : 
    p.margin14x2 ? `${spacing14} ${spacing2}` : 
    p.margin14x3 ? `${spacing14} ${spacing3}` : 
    p.margin14x4 ? `${spacing14} ${spacing4}` : 
    p.margin14x5 ? `${spacing14} ${spacing5}` : 
    p.margin14x6 ? `${spacing14} ${spacing6}` : 
    p.margin14x7 ? `${spacing14} ${spacing7}` : 
    p.margin14x8 ? `${spacing14} ${spacing8}` : 
    p.margin14x9 ? `${spacing14} ${spacing9}` : 
    p.margin14x10 ? `${spacing14} ${spacing10}` : 
    p.margin14x11 ? `${spacing14} ${spacing11}` : 
    p.margin14x12 ? `${spacing14} ${spacing12}` : 
    p.margin14x13 ? `${spacing14} ${spacing13}` : 
    p.margin14x14 ? `${spacing14} ${spacing14}` : 
    p.margin14x15 ? `${spacing14} ${spacing15}` : 
    p.margin14x16 ? `${spacing14} ${spacing16}` :

    p.margin15x0 ? `${spacing15} ${spacing0}` : 
    p.margin15x1 ? `${spacing15} ${spacing1}` : 
    p.margin15x2 ? `${spacing15} ${spacing2}` : 
    p.margin15x3 ? `${spacing15} ${spacing3}` : 
    p.margin15x4 ? `${spacing15} ${spacing4}` : 
    p.margin15x5 ? `${spacing15} ${spacing5}` : 
    p.margin15x6 ? `${spacing15} ${spacing6}` : 
    p.margin15x7 ? `${spacing15} ${spacing7}` : 
    p.margin15x8 ? `${spacing15} ${spacing8}` : 
    p.margin15x9 ? `${spacing15} ${spacing9}` : 
    p.margin15x10 ? `${spacing15} ${spacing10}` : 
    p.margin15x11 ? `${spacing15} ${spacing11}` : 
    p.margin15x12 ? `${spacing15} ${spacing12}` : 
    p.margin15x13 ? `${spacing15} ${spacing13}` : 
    p.margin15x14 ? `${spacing15} ${spacing14}` : 
    p.margin15x15 ? `${spacing15} ${spacing15}` : 
    p.margin15x16 ? `${spacing15} ${spacing16}` :

    p.margin16x0 ? `${spacing16} ${spacing0}` : 
    p.margin16x1 ? `${spacing16} ${spacing1}` : 
    p.margin16x2 ? `${spacing16} ${spacing2}` : 
    p.margin16x3 ? `${spacing16} ${spacing3}` : 
    p.margin16x4 ? `${spacing16} ${spacing4}` : 
    p.margin16x5 ? `${spacing16} ${spacing5}` : 
    p.margin16x6 ? `${spacing16} ${spacing6}` : 
    p.margin16x7 ? `${spacing16} ${spacing7}` : 
    p.margin16x8 ? `${spacing16} ${spacing8}` : 
    p.margin16x9 ? `${spacing16} ${spacing9}` : 
    p.margin16x10 ? `${spacing16} ${spacing10}` : 
    p.margin16x11 ? `${spacing16} ${spacing11}` : 
    p.margin16x12 ? `${spacing16} ${spacing12}` : 
    p.margin16x13 ? `${spacing16} ${spacing13}` : 
    p.margin16x14 ? `${spacing16} ${spacing14}` : 
    p.margin16x15 ? `${spacing16} ${spacing15}` : 
    p.margin16x16 ? `${spacing16} ${spacing16}` :

    `${spacing0} ${spacing0}` // default case, no spacing
  )
}

export const getWidth= (p) => {
  return (
    p.width0 ? `${spacing0}` : 
    p.width1 ? `${spacing1}` : 
    p.width2 ? `${spacing2}` : 
    p.width3 ? `${spacing3}` : 
    p.width4 ? `${spacing4}` : 
    p.width5 ? `${spacing5}` : 
    p.width6 ? `${spacing6}` : 
    p.width7 ? `${spacing7}` : 
    p.width8 ? `${spacing8}` : 
    p.width9 ? `${spacing9}` : 
    p.width10 ? `${spacing10}` :
    p.width11 ? `${spacing11}` :
    p.width12 ? `${spacing12}` :
    p.width13 ? `${spacing13}` :
    p.width14 ? `${spacing14}` :
    p.width15 ? `${spacing15}` :
    p.width16 ? `${spacing16}` :
    `undefined` // base case 
  );
}