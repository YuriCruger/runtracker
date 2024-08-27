import { useEffect, useRef, useState } from "react";
import { Alert } from "react-native";
import { Historic, useQuery, useRealm } from "@/libs";
import { RunHistoryProps } from "@/components";
import { useUser } from "@realm/react";
import { Swipeable } from "react-native-gesture-handler";

export function useHome() {
  const [runHistory, setRunHistory] = useState<RunHistoryProps[]>([]);
  const [isFetchingHistory, setIsFetchingHistory] = useState(true);
  const historic = useQuery(Historic);
  const realm = useRealm();
  const user = useUser();

  function handleDeletePost(postId: string) {
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

    if (postSelected.length > 0) {
      realm.write(() => {
        realm.delete(postSelected);
      });

      setRunHistory((prev) => prev.filter((item) => item.id !== postId));
    } else {
      Alert.alert("Erro", "Corrida não encontrada.");
    }
  }

  function fetchRunHistory() {
    try {
      const sortedHistoric = realm
        .objects(Historic)
        .filtered(`user_id = '${user.id}'`)
        .sorted("created_at", true);

      const formattedHistoric = sortedHistoric.map((item) => ({
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
      }));

      setRunHistory(formattedHistoric);
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Erro",
        "Não foi possível obter o histórico de corridas. Por favor tente novamente mais tarde."
      );
    } finally {
      setIsFetchingHistory(false);
    }
  }

  function updateUserHistoricSubscription() {
    realm.subscriptions.update((mutableSubs, realm) => {
      const historicByUserQuery = realm
        .objects("Historic")
        .filtered(`user_id = '${user.id}'`);

      mutableSubs.add(historicByUserQuery, { name: "historic_by_user" });
    });
  }

  return {
    fetchRunHistory,
    handleDeletePost,
    isFetchingHistory,
    runHistory,
    updateUserHistoricSubscription,
    historic,
    realm,
    user,
  };
}
