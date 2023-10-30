import * as React from 'react';
import styled from 'styled-components';

type Size = 'small' | 'medium' | 'large';

interface Button {
  size?: Size;
  children: any;
  color?: any;
  disabled?: boolean;
}
function Button({ size = 'small', ...props }: Button) {
  return (
    <Wrapper size={size} {...props}>
      {props.children}
    </Wrapper>
  );
}

const sizes = {
  small: 100,
  medium: 150,
  large: 200,
};

const Wrapper = styled.button<{ size: Size }>`
  width: ${p => sizes[p.size]}px;
  height: calc(${p => sizes[p.size]}px / 3);
`;

export default Button;
