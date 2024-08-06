import styled, { css } from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.GRAY_700};
`;

export const Content = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.BLACK};
  padding-top: 6px;
  padding-bottom: 6px;
`;

export const Separator = styled.View`
  height: 6px;
`;

export const EmptyContent = styled.View`
  padding: 12px;
`;

export const EmptyTitle = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.XXL}px;
    font-family: ${theme.FONT_FAMILY.BOLD};
    color: ${theme.COLORS.WHITE};
    margin-bottom: 6px;
  `}
`;

export const EmptyMessage = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.MD}px;
    font-family: ${theme.FONT_FAMILY.REGULAR};
    color: ${theme.COLORS.GRAY_200};
    margin-bottom: 10px;
  `}
`;

export const RemoveButton = styled.Pressable`
  justify-content: center;
  padding-left: 32px;
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.GRAY_700};
`;

export const Spinner = styled.ActivityIndicator.attrs(({ theme }) => ({
  color: theme.COLORS.BRAND_LIGHT,
  size: "large",
}))`
  margin-top: 10px;
`;
