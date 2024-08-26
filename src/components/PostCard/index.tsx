import { Pressable, Text, View } from "react-native";
import { LatLng } from "react-native-maps";

import { useTheme } from "styled-components/native";

import {
  Container,
  Content,
  MapContent,
  PeriodLabel,
  RunInfoRow,
  RunInfoText,
  UserInfo,
  UserInfoContainer,
  UserName,
  UserNameRow,
} from "./styles";

import { Image } from "expo-image";

import { SneakerMove, Trash } from "phosphor-react-native";

import { StatItem } from "../StatItem";

import { Map } from "../Map";

import { formatDate, getPeriodOfDay } from "@/utils";

import { LocationSchemaProps } from "@/libs";
import { User } from "realm";

export type RunHistoryProps = {
  id: string;
  run_time: string;
  run_pace: string;
  run_distance: string;
  location: LocationSchemaProps;
  coords: LatLng[];
  created_at: Date;
};

type Props = {
  runDetails: RunHistoryProps;
  user: User;
  onDeletePost: (postId: string) => void;
};

export function PostCard({ runDetails, user, onDeletePost }: Props) {
  const { COLORS } = useTheme();

  const formatedDate = formatDate(runDetails.created_at);
  const periodOfDay = getPeriodOfDay(new Date(runDetails.created_at));

  return (
    <Container>
      <Content>
        <UserInfo>
          <Image
            style={{ height: 40, width: 40, borderRadius: 20 }}
            source={user.profile.pictureUrl}
            placeholder={{ blurhash: "L184i9ofa}of00ayfQay~qj[fQj[" }}
            contentFit="cover"
            transition={1000}
          />

          <UserInfoContainer>
            <UserNameRow>
              <UserName>{user.profile.name}</UserName>

              <Pressable onPress={() => onDeletePost(runDetails.id)}>
                <Trash size={18} color={COLORS.GRAY_200} />
              </Pressable>
            </UserNameRow>

            <RunInfoRow>
              <SneakerMove size={16} color={COLORS.GRAY_200} />

              <RunInfoText>
                {formatedDate} ·{" "}
                {`${runDetails.location.city}, ${runDetails.location.state}`}
              </RunInfoText>
            </RunInfoRow>
          </UserInfoContainer>
        </UserInfo>

        <PeriodLabel>{periodOfDay}</PeriodLabel>

        <RunInfoRow>
          <StatItem statName="Distância" statValue={runDetails.run_distance} />
          <StatItem statName="Ritmo" statValue={runDetails.run_pace} />
          <StatItem statName="Tempo" statValue={runDetails.run_time} />
        </RunInfoRow>
      </Content>

      <MapContent>
        {runDetails.coords.length > 0 && (
          <Map coordinates={runDetails.coords} />
        )}
      </MapContent>
    </Container>
  );
}
