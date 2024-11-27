import { ReactNode, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  View,
} from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import CoolText from '../CoolText';
import BaseModal from './BaseModal';
import { Leaderboard } from '@/models/Leaderboard';
import usePlayerStore from '@/stores/PlayerStore';
import {
  fetchFirstPage,
  fetchNextPage,
  fetchRankByScore,
  updatePlayer,
} from '@/utils/firebase/leaderboard';

type LeaderboardModalProps = {
  show: boolean;
  onClose: () => void;
};

const rankImages: { [key: string]: any } = {
  1: require('@/assets/images/icons/crown.png'),
  2: require('@/assets/images/icons/sliver-crown.png'),
  3: require('@/assets/images/icons/brown-crown.png'),
};

let rank = 1;
let previousScore: number | null = null;

const LeaderboardModal = ({ show, onClose }: LeaderboardModalProps) => {
  const [leaderboard, setLeaderboard] = useState<Leaderboard[]>([]);
  const { starsOfLevel, id, name } = usePlayerStore();
  const [myRank, setMyRank] = useState<number>();
  const [lastDoc, setLastDoc] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const totalScore = useMemo(
    () =>
      starsOfLevel.reduce((acc, current) => {
        acc += current.score;
        return acc;
      }, 0),
    [starsOfLevel.length],
  );

  useEffect(() => {
    const getLeaderboard = async () => {
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
    if (show) {
      getLeaderboard();
    }
  }, [show, totalScore]);

  const loadMoreData = async () => {
    if (!hasMore || loading) return;

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
            <CoolText
              style={[
                styles.name,
                { color: id === item.id ? '#D14343' : '#834B4B' },
              ]}
              text={item.name}
              fontWeight="medium"
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
    }

    previousScore = item.score;

    return dom;
  };

  return (
    <BaseModal
      title="排行榜"
      show={show}
      width={85}
      onClose={() => {
        setLastDoc(null);
        setLoading(false);
        setHasMore(true);
        onClose();
      }}
    >
      <View style={{ height: 500 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={leaderboard}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          onEndReached={loadMoreData} // 滾動到底部加載更多
          onEndReachedThreshold={0} // 距離底部多少比例時觸發
          ListFooterComponent={loading ? <ActivityIndicator /> : undefined} // 加載中顯示指示器
        />
      </View>
      {totalScore > 0 && (
        <Animated.View
          entering={FadeIn.delay(100)}
          className="flex-row items-center"
          style={{ marginTop: 4, padding: 14, gap: 16 }}
        >
          <View className="items-center" style={{ width: 24 }}>
            {myRank && myRank < 4 ? (
              <Image
                source={rankImages[myRank]}
                style={{ width: 24, height: 24 }}
              />
            ) : (
              <CoolText
                style={[styles.rank, { fontSize: 20 }]}
                className="text-[#834B4B]"
                text={myRank || 0}
                fontWeight="bold"
              />
            )}
          </View>
          <CoolText
            style={styles.name}
            text={name}
            className="text-[#834B4B]"
            fontWeight="medium"
          />
          <CoolText style={styles.score} text={totalScore} fontWeight="bold" />
        </Animated.View>
      )}
    </BaseModal>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 14,
    width: '100%',
    marginVertical: 6,
    borderRadius: 12,
    backgroundColor: '#f7e1d0',
    borderWidth: 2,
    borderColor: '#C08A76',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  rank: { fontSize: 18 },
  name: { fontSize: 18, flex: 1 },
  score: { fontSize: 20, color: '#834B4B' },
});

export default LeaderboardModal;
