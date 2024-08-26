import styled from "styled-components/native";

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

export const Spinner = styled.ActivityIndicator.attrs(({ theme }) => ({
  color: theme.COLORS.BRAND_LIGHT,
  size: "large",
}))`
  margin-top: 10px;
`;
