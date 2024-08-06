import styled, { css } from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.GRAY_800};
`;

export const ContentButton = styled.View`
  width: 100%;
  padding: 12px;
  border-top-width: 0.4px;
  border-top-color: ${({ theme }) => theme.COLORS.GRAY_300};
  align-items: center;
  justify-content: center;
`;

export const Button = styled.TouchableOpacity`
  height: 70px;
  width: 70px;
  border-radius: 35px;
  background-color: ${({ theme }) => theme.COLORS.BRAND_LIGHT};
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.BOLD};
    font-size: ${theme.FONT_SIZE.MD}px;
    color: ${theme.COLORS.WHITE};
  `}
`;

export const StatsContent = styled.View`
  flex: 1;
`;

export const MapSkeleton = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.GRAY_300};
`;
