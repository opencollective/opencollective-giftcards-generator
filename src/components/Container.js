import styled from 'styled-components';
import tag from 'clean-tag';
import {
  alignItems,
  alignSelf,
  background,
  backgroundImage,
  backgroundPosition,
  backgroundRepeat,
  backgroundSize,
  borders,
  borderColor,
  borderRadius,
  bottom,
  boxShadow,
  color,
  display,
  flex,
  flexDirection,
  flexWrap,
  fontSize,
  fontWeight,
  height,
  justifyContent,
  left,
  lineHeight,
  maxHeight,
  maxWidth,
  minHeight,
  minWidth,
  order,
  position,
  right,
  size,
  space,
  textAlign,
  top,
  width,
  zIndex,
} from 'styled-system';

const Container = styled(tag)`
  box-sizing: border-box;

  ${alignItems}
  ${alignSelf}
  ${background}
  ${backgroundImage}
  ${backgroundPosition}
  ${backgroundRepeat}
  ${backgroundSize}
  ${borders}
  ${borderColor}
  ${borderRadius}
  ${bottom}
  ${boxShadow}
  ${color}
  ${display}
  ${flex}
  ${flexDirection}
  ${flexWrap}
  ${fontWeight}
  ${fontSize}
  ${height}
  ${justifyContent}
  ${left}
  ${lineHeight}
  ${maxHeight}
  ${maxWidth}
  ${minHeight}
  ${minWidth}
  ${order}
  ${position}
  ${right}
  ${size}
  ${space}
  ${top}
  ${textAlign}
  ${width}
  ${zIndex}
  ${props =>
    props.clearfix &&
    `
      ::after {
        content: "";
        display: table;
        clear: both;
      }
    `}
`;

Container.defaultProps = {
  omitProps: tag.defaultProps.omitProps.concat('float', 'clear', 'clearfix', 'overflow'),
};

export default Container;
