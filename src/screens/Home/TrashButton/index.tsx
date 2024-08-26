import { useTheme } from "styled-components/native";
import { Button } from "./styles";

import { Trash } from "phosphor-react-native";

export function TrashButton() {
  const { COLORS } = useTheme();

  return (
    <Button>
      <Trash size={32} color={COLORS.GRAY_300} />
    </Button>
  );
}
