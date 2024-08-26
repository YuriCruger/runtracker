import styled from "styled-components/native";

export const Button = styled.Pressable`
  justify-content: center;
  padding-left: 32px;
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.GRAY_700};
`;
