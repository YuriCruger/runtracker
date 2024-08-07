import { View } from "react-native";
import { LatLng } from "react-native-maps";

import { useTheme } from "styled-components/native";

import {
  Container,
  Content,
  Group,
  InfoRun,
  MapContent,
  PeriodLabel,
  UserInfo,
  UserName,
} from "./styles";

import { Image } from "expo-image";

import { SneakerMove } from "phosphor-react-native";

import { StatItem } from "../StatItem";

import { Map } from "../Map";

import { useUser } from "@realm/react";

import { formatDate } from "@/utils/formatDate";
import { getPeriodOfDay } from "@/utils/getPeriodOfDay";
import { LocationSchemaProps } from "@/libs/realm/schemas/Location";

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
  data: RunHistoryProps;
};

export function PostCard({ data }: Props) {
  const { COLORS } = useTheme();
  const user = useUser();

  const formatedDate = formatDate(data.created_at);
  const periodOfDay = getPeriodOfDay(new Date(data.created_at));

  const blurhash = "L184i9ofa}of00ayfQay~qj[fQj[";

  return (
    <Container>
      <Content>
        <UserInfo>
          <Image
            style={{ height: 40, width: 40, borderRadius: 20 }}
            source={user.profile.pictureUrl}
            placeholder={{ blurhash }}
            contentFit="cover"
            transition={1000}
          />

          <View>
            <UserName>{user.profile.name}</UserName>

            <Group>
              <SneakerMove size={16} color={COLORS.GRAY_200} />

              <InfoRun>
                {formatedDate} ·{" "}
                {`${data.location.city}, ${data.location.state}`}
              </InfoRun>
            </Group>
          </View>
        </UserInfo>

        <PeriodLabel>{periodOfDay}</PeriodLabel>

        <Group>
          <StatItem statName="Distância" statValue={data.run_distance} />
          <StatItem statName="Ritmo" statValue={data.run_pace} />
          <StatItem statName="Tempo" statValue={data.run_time} />
        </Group>
      </Content>

      <MapContent>
        {data.coords.length > 0 && <Map coordinates={data.coords} />}
      </MapContent>
    </Container>
  );
}
