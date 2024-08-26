import React, { useEffect } from "react";
import { FlatList } from "react-native";

import { Container, Content, Separator, Spinner } from "./styles";

import { PostCard, Header } from "@/components";

import { useHome } from "./useHome";
import { EmptyComponent } from "./EmptyComponent";

export function Home() {
  const {
    fetchRunHistory,
    handleDeletePost,
    isFetchingHistory,
    runHistory,
    updateUserHistoricSubscription,
    historic,
    realm,
    user,
  } = useHome();

  useEffect(() => {
    fetchRunHistory();
  }, [historic]);

  useEffect(() => {
    updateUserHistoricSubscription();
  }, [realm]);

  return (
    <Container>
      <Header pageTitle="Início" buttonText="" handlePress={() => {}} />

      <Content>
        <FlatList
          data={runHistory}
          keyExtractor={(item, index) => item.id + index}
          renderItem={({ item }) => (
            <PostCard
              runDetails={item}
              user={user}
              onDeletePost={handleDeletePost}
            />
          )}
          ItemSeparatorComponent={() => <Separator />}
          ListEmptyComponent={isFetchingHistory ? null : <EmptyComponent />}
          ListFooterComponent={isFetchingHistory ? <Spinner /> : null}
          showsVerticalScrollIndicator={false}
        />
      </Content>
    </Container>
  );
}
