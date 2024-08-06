import styled, { css } from "styled-components/native";

export const Container = styled.View`
  flex: 1;
`;

export const StatName = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.XXS}px;
    font-family: ${theme.FONT_FAMILY.REGULAR};
    color: ${theme.COLORS.GRAY_300};
    text-transform: uppercase;
    margin-bottom: 4px;
  `}
`;

export const StatValue = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.MD}px;
    font-family: ${theme.FONT_FAMILY.BOLD};
    color: ${theme.COLORS.WHITE};
  `}
`;
