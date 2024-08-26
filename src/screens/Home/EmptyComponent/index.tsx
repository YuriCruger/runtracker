import React from "react";

import { Content, Message, Title } from "./styles";

import { Image } from "expo-image";

import { EMPTY_IMAGE_URI } from "@/utils/emptyImageURI";

import { BoxButton } from "@/components";

import { useNavigation } from "@react-navigation/native";

export function EmptyComponent() {
  const navigation = useNavigation();

  return (
    <>
      <Image
        source={{ uri: EMPTY_IMAGE_URI }}
        contentFit="cover"
        transition={1000}
        style={{ height: 200 }}
      />
      <Content>
        <Title>Desafie-se e comece agora!</Title>
        <Message>
          Está na hora de colocar os tênis e explorar novas trilhas. Inicie sua
          corrida agora!
        </Message>

        <BoxButton
          title="Começar uma nova corrida"
          onPress={() => navigation.navigate("runStart")}
        />
      </Content>
    </>
  );
}
