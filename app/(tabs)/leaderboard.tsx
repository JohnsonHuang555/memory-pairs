import { ReactNode, useCallback, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  View,
} from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import CoolText from '@/components/CoolText';
import MainContainer from '@/components/MainContainer';
import { Leaderboard } from '@/models/Leaderboard';
import usePlayerStore from '@/stores/PlayerStore';
import {
  fetchFirstPage,
  fetchNextPage,
  fetchRankByScore,
  updatePlayer,
} from '@/utils/firebase/leaderboard';

import { useFocusEffect } from 'expo-router';

const rankImages: { [key: string]: any } = {
  1: require('@/assets/images/icons/crown.png'),
  2: require('@/assets/images/icons/sliver-crown.png'),
  3: require('@/assets/images/icons/brown-crown.png'),
};

let rank = 1;
let previousScore: number | null = null;

const LeaderboardScreen = () => {
  const { id, name, themeList } = usePlayerStore();
  const [leaderboard, setLeaderboard] = useState<Leaderboard[]>([]);
  const [myRank, setMyRank] = useState<number>();
  const [lastDoc, setLastDoc] = useState<any>(null);
  const [isLoading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const totalScore = useMemo(
    () =>
      themeList
        .map(t => t.starsOfLevel)
        .reduce((acc, current) => {
          acc += current.reduce((a, c) => {
            a += c.score;
            return a;
          }, 0);
          return acc;
        }, 0),
    [],
  );

  useFocusEffect(
    useCallback(() => {
      setTimeout(() => {
        setPageLoading(false);
      }, 300);
      const getLeaderboard = async () => {
        if (!id) return;
        setLoading(true);

        // 更新成績
        await updatePlayer(id, totalScore);
        // 取得當前排名
        const myRank = await fetchRankByScore(totalScore);
        setMyRank(myRank);

        // 取得排行榜
        const res = await fetchFirstPage();
        setLeaderboard(res?.data || []);
        setLastDoc(res?.lastDoc);
        setLoading(false);
      };
      getLeaderboard();
      // Return a cleanup function if necessary
      return () => {
        setHasMore(true);
        setLoading(false);
        setLastDoc(null);
        setMyRank(undefined);
        setLeaderboard([]);
        setPageLoading(true);
      };
    }, [totalScore]),
  );

  const loadMoreData = async () => {
    if (!hasMore || isLoading) return;

    setLoading(true);
    const res = await fetchNextPage(lastDoc);

    if (res?.data.length === 0) {
      setHasMore(false); // 沒有更多數據
    } else {
      setLeaderboard(state => [...state, ...res.data]); // 合併數據
      setLastDoc(res?.lastDoc);
    }

    setLoading(false);
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: Leaderboard;
    index: number;
  }) => {
    if (item.score !== previousScore) {
      rank = index + 1;
    }

    let dom: ReactNode = null;

    switch (rank) {
      case 1:
      case 2:
      case 3:
        dom = (
          <View
            style={[
              styles.item,
              { borderColor: id === item.id ? '#D14343' : '#C08A76' },
            ]}
          >
            <Image
              source={rankImages[rank]}
              style={{ width: 24, height: 24 }}
            />
            <CoolText
              style={[
                styles.name,
                { color: id === item.id ? '#D14343' : '#834B4B' },
              ]}
              text={item.name}
              fontWeight={id === item.id ? 'bold' : 'medium'}
            />
            <CoolText
              style={[
                styles.score,
                { color: id === item.id ? '#D14343' : '#834B4B' },
              ]}
              text={item.score}
              fontWeight="bold"
            />
          </View>
        );
        break;
      default:
        dom = (
          <View
            style={[
              styles.item,
              { borderColor: id === item.id ? '#D14343' : '#C08A76' },
            ]}
          >
            <View className="items-center" style={{ width: 24 }}>
              <CoolText
                style={[
                  styles.rank,
                  { color: id === item.id ? '#D14343' : '#834B4B' },
                ]}
                text={rank}
                fontWeight={id === item.id ? 'bold' : 'medium'}
              />
            </View>
            <View style={{ width: 120 }}>
              <CoolText
                style={[
                  styles.name,
                  { color: id === item.id ? '#D14343' : '#834B4B' },
                ]}
                text={item.name}
                fontWeight="medium"
              />
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <CoolText
                style={[
                  styles.score,
                  { color: id === item.id ? '#D14343' : '#834B4B' },
                ]}
                text={item.score}
                fontWeight="bold"
              />
            </View>
          </View>
        );
        break;
    }

    previousScore = item.score;
    return dom;
  };

  return (
    <MainContainer title="排行榜" showLeftIcon showRuleIcon>
      {!pageLoading ? (
        <Animated.View entering={FadeIn} exiting={FadeOut}>
          <View style={{ height: Dimensions.get('window').height - 280 }}>
            {leaderboard.length ? (
              <FlatList
                showsVerticalScrollIndicator={false}
                data={leaderboard}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                onEndReached={loadMoreData} // 滾動到底部加載更多
                onEndReachedThreshold={0} // 距離底部多少比例時觸發
                ListFooterComponent={
                  isLoading ? <ActivityIndicator /> : undefined
                } // 加載中顯示指示器
              />
            ) : null}
          </View>
          <Animated.View
            entering={FadeIn.delay(100)}
            className="flex-row items-center"
            style={{
              marginTop: 4,
              padding: 14,
              gap: 16,
              borderTopWidth: 2,
              borderColor: '#D6D1D1',
            }}
          >
            <View className="items-center" style={{ width: 24 }}>
              {myRank && myRank < 4 ? (
                <Image
                  source={rankImages[myRank]}
                  style={{ width: 24, height: 24 }}
                />
              ) : (
                <CoolText
                  style={[styles.rank, { fontSize: 20, color: '#834B4B' }]}
                  text={myRank || 0}
                  fontWeight="bold"
                />
              )}
            </View>
            <CoolText
              style={styles.name}
              text={name || ''}
              fontWeight="medium"
            />
            <CoolText
              style={styles.score}
              text={totalScore}
              fontWeight="bold"
            />
          </Animated.View>
        </Animated.View>
      ) : (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <ActivityIndicator size="large" />
        </View>
      )}
    </MainContainer>
  );
};

export default LeaderboardScreen;

const styles = StyleSheet.create({
  item: {
    padding: 14,
    width: '100%',
    marginVertical: 6,
    borderRadius: 12,
    backgroundColor: '#f7e1d0',
    borderWidth: 2,
    borderColor: '#C08A76',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  rank: { fontSize: 18 },
  name: { fontSize: 18, flex: 1, color: '#834B4B' },
  score: { fontSize: 20, color: '#834B4B' },
});
