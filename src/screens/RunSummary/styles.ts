import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.GRAY_800};
`;

export const StatsContent = styled.View`
  height: 90px;
  flex-direction: row;
`;
