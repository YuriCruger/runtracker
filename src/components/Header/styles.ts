import styled, { css } from "styled-components/native";

export const Container = styled.View`
  position: relative;
  background-color: ${({ theme }) => theme.COLORS.GRAY_700};
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
`;

export const Page = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.REGULAR};
    font-size: ${theme.FONT_SIZE.LG}px;
    color: ${theme.COLORS.WHITE};
  `}
`;

export const ButtonBack = styled.TouchableOpacity`
  align-items: start;
  justify-content: center;
  padding: 6px;
  width: 90px;
`;

export const ButtonText = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.REGULAR};
    font-size: ${theme.FONT_SIZE.XS}px;
    color: ${theme.COLORS.WHITE};
    text-transform: uppercase;
  `}
`;

export const EmptyComponent = styled.TouchableOpacity`
  opacity: 0;
  width: 90px;
`;
