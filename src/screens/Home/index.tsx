import React, { useEffect, useRef, useState } from "react";
import { Alert, FlatList } from "react-native";
import { Swipeable } from "react-native-gesture-handler";

import { useNavigation } from "@react-navigation/native";

import { useUser } from "@realm/react";

import { BoxButton } from "@/components/BoxButton";

import { Image } from "expo-image";

import {
  Container,
  Content,
  EmptyContent,
  EmptyMessage,
  EmptyTitle,
  RemoveButton,
  Separator,
  Spinner,
} from "./styles";
import { useTheme } from "styled-components/native";

import { PostCard, RunHistoryProps } from "@/components/PostCard";
import { Header } from "@/components/Header";

import { Historic } from "@/libs/realm/schemas/Historic";
import { useQuery, useRealm } from "@/libs/realm";

import { Trash } from "phosphor-react-native";

export function Home() {
  const [runHistory, setRunHistory] = useState<RunHistoryProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const swipeableRef = useRef<Swipeable[]>([]);
  const historic = useQuery(Historic);
  const navigation = useNavigation();
  const { COLORS } = useTheme();
  const realm = useRealm();
  const user = useUser();

  const emptyImageURI =
    "https://images.unsplash.com/photo-1502224562085-639556652f33?q=80&w=2028&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  function handleDelete(postId: string, index: number) {
    swipeableRef.current?.[index].close();

    Alert.alert("Excluir", "Tem certeza que deseja excluir está corrida?", [
      {
        style: "cancel",
        text: "Não",
      },
      {
        text: "Sim",
        onPress: () => deletePost(postId),
      },
    ]);
  }

  async function deletePost(postId: string) {
    const postSelected = historic.filter(
      (item) =>
        item.user_id.toString() === user.id && item._id.toString() === postId
    );

    if (postSelected) {
      realm.write(() => {
        realm.delete(postSelected);
      });
    } else {
      Alert.alert("Erro", "Corrida não encontrada.");
    }
  }

  function fetchHistoric() {
    try {
      const sortedHistoric = realm
        .objects(Historic)
        .filtered(`user_id = '${user.id}'`)
        .sorted("created_at", true);

      const formattedHistoric = sortedHistoric.map((item) => {
        return {
          id: item._id.toString(),
          run_time: item.run_time,
          run_pace: item.run_pace,
          run_distance: item.run_distance,
          location: item.location,
          coords: item.coords.map((coord) => ({
            latitude: coord.latitude,
            longitude: coord.longitude,
          })),
          created_at: item.created_at,
        };
      });
      setRunHistory(formattedHistoric);
    } catch (error) {
      console.error(error);

      Alert.alert(
        "Erro",
        "Não foi possível obter o histórico de corridas. Por favor tente novamente mais tarde."
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchHistoric();
  }, []);

  useEffect(() => {
    realm.addListener("change", () => fetchHistoric());

    return () => {
      if (realm && !realm.isClosed) {
        realm.removeListener("change", fetchHistoric);
      }
    };
  }, []);

  useEffect(() => {
    realm.subscriptions.update((mutableSubs, realm) => {
      const historicByUserQuery = realm
        .objects("Historic")
        .filtered(`user_id = '${user.id}'`);

      mutableSubs.add(historicByUserQuery, { name: "historic_by_user" });
    });
  }, [realm]);

  return (
    <Container>
      <Header pageTitle="Início" buttonText="" handlePress={() => {}} />

      <Content>
        <FlatList
          data={runHistory}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <Swipeable
              ref={(ref) => {
                if (ref) {
                  swipeableRef.current.push(ref);
                }
              }}
              overshootLeft={false}
              leftThreshold={100}
              renderRightActions={() => null}
              renderLeftActions={() => (
                <RemoveButton>
                  <Trash size={32} color={COLORS.GRAY_300} />
                </RemoveButton>
              )}
              onSwipeableOpen={() => handleDelete(item.id, index)}
            >
              <PostCard data={item} />
            </Swipeable>
          )}
          ItemSeparatorComponent={() => <Separator />}
          ListEmptyComponent={
            isLoading ? null : (
              <>
                <Image
                  source={{
                    uri: emptyImageURI,
                  }}
                  contentFit="cover"
                  transition={1000}
                  style={{ height: 200 }}
                />
                <EmptyContent>
                  <EmptyTitle>Desafie-se e comece agora!</EmptyTitle>
                  <EmptyMessage>
                    Está na hora de colocar os tênis e explorar novas trilhas.
                    Inicie sua corrida agora!
                  </EmptyMessage>

                  <BoxButton
                    title="Começar uma nova corrida"
                    onPress={() => navigation.navigate("runStart")}
                  />
                </EmptyContent>
              </>
            )
          }
          ListFooterComponent={isLoading ? <Spinner /> : null}
          showsVerticalScrollIndicator={false}
        />
      </Content>
    </Container>
  );
}
