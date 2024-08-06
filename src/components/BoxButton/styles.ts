import styled, { css } from "styled-components/native";

export const Container = styled.TouchableOpacity`
  min-height: 50px;
  max-height: 50px;
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.BRAND_MID};
  align-items: center;
  justify-content: center;
  border-radius: 6px;
`;

export const BoxButtonText = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.MD}px;
    font-family: ${theme.FONT_FAMILY.BOLD};
    color: ${theme.COLORS.WHITE};
  `}
`;

export const Spinner = styled.ActivityIndicator.attrs(({ theme }) => ({
  color: theme.COLORS.WHITE,
}))``;
