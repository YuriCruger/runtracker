import styled, { css, DefaultTheme } from "styled-components/native";

export type SizeProps = "SMALL" | "NORMAL";

type Props = {
  size: SizeProps;
};

export const Container = styled.View`
  flex: 1;
  padding: 10px;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const Title = styled.Text<Props>`
  ${({ theme, size }) => css`
    font-size: ${size === "NORMAL"
      ? theme.FONT_SIZE.XS
      : theme.FONT_SIZE.XXS}px;
    font-family: ${theme.FONT_FAMILY.REGULAR};
    color: ${theme.COLORS.GRAY_300};
    text-transform: uppercase;
    position: absolute;
    top: 10px;
  `}
`;

export const UnityLabel = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.XS}px;
    font-family: ${theme.FONT_FAMILY.REGULAR};
    color: ${theme.COLORS.GRAY_300};
    text-transform: uppercase;
    position: absolute;
    bottom: 10px;
  `}
`;

export const Statistic = styled.Text<Props>`
  ${({ theme, size }) => css`
    font-size: ${size === "NORMAL"
      ? theme.FONT_SIZE.XXXXXL
      : theme.FONT_SIZE.XXL}px;
    font-family: ${theme.FONT_FAMILY.BOLD};
    color: ${theme.COLORS.WHITE};
  `}
`;
