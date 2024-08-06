import styled, { css } from "styled-components/native";

export type DirectionProps = "VERTICAL" | "HORIZONTAL";

type Props = {
  direction: DirectionProps;
};

const variantDirectionStyles = (direction: DirectionProps) => {
  return {
    VERTICAL: css`
      max-width: 0.4px;
      min-width: 0.4px;
      margin: 10px 0;
    `,
    HORIZONTAL: css`
      max-height: 0.4px;
      min-height: 0.4px;
      margin: 0 10px;
    `,
  }[direction];
};

export const Container = styled.View<Props>`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.GRAY_300};
  ${({ direction }) => variantDirectionStyles(direction)}
`;
