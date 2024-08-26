import styled, { css } from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.GRAY_800};
  height: 400px;
`;

export const Content = styled.View`
  padding: 16px;
  gap: 12px;
`;

export const UserInfo = styled.View`
  flex-direction: row;
  gap: 10px;
  align-items: center;
`;

export const UserInfoContainer = styled.View`
  flex: 1;
`;

export const UserNameRow = styled.View`
  flex-direction: row;
`;

export const UserName = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.XS}px;
    font-family: ${theme.FONT_FAMILY.BOLD};
    color: ${theme.COLORS.WHITE};
    margin-bottom: 4px;
    flex: 1;
  `}
`;

export const RunInfoRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 6px;
`;

export const RunInfoText = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.XXS}px;
    font-family: ${theme.FONT_FAMILY.REGULAR};
    color: ${theme.COLORS.GRAY_300};
  `}
`;

export const PeriodLabel = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.LG}px;
    font-family: ${theme.FONT_FAMILY.BOLD};
    color: ${theme.COLORS.WHITE};
  `}
`;

export const MapContent = styled.View`
  pointer-events: none;
  flex: 1;
`;
