import { db } from '@/firebaseConfig';
import { Leaderboard } from '@/models/Leaderboard';

import {
  addDoc,
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { startAfter } from 'firebase/firestore';

// 新增玩家資料
export const createPlayer = async (name: string) => {
  try {
    const docRef = await addDoc(collection(db, 'players'), {
      score: 0,
      name,
      timestamp: Date.now(),
    });
    console.log('Score saved successfully!', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error adding document:', error);
  }
};

// 更新玩家資料
export const updatePlayer = async (id: string, totalScore: number) => {
  try {
    const docRef = doc(db, 'players', id);
    await updateDoc(docRef, {
      score: totalScore,
      timestamp: Date.now(),
    });
    console.log('Score saved successfully!', docRef.id);
  } catch (error) {
    console.error('Error adding document:', error);
  }
};

// 獲取數據
export const fetchFirstPage = async () => {
  try {
    const leaderboardQuery = query(
      collection(db, 'players'),
      where('score', '>', 0),
      where('score', '!=', null), // 過濾掉未設置 score 的文件
      orderBy('score', 'desc'),
      limit(10), // 僅獲取前 10 名
    );
    const querySnapshot = await getDocs(leaderboardQuery);

    const leaderboard: Leaderboard[] = [];
    querySnapshot.forEach(doc => {
      const data: Leaderboard = {
        id: doc.id,
        name: doc.data().name,
        score: doc.data().score,
      };
      leaderboard.push(data);
    });

    return {
      data: leaderboard,
      lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1],
    };
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
  }
};

export const fetchNextPage = async (lastDoc: any) => {
  const leaderboardQuery = query(
    collection(db, 'players'),
    where('score', '>', 0),
    where('score', '!=', null), // 過濾掉未設置 score 的文件
    orderBy('score', 'desc'),
    startAfter(lastDoc), // 上一頁的最後一條數據
    limit(10),
  );

  const querySnapshot = await getDocs(leaderboardQuery);
  const leaderboard: Leaderboard[] = [];
  querySnapshot.forEach(doc => {
    const data: Leaderboard = {
      id: doc.id,
      name: doc.data().name,
      score: doc.data().score,
    };
    leaderboard.push(data);
  });

  return {
    data: leaderboard,
    lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1],
  };
};

// 取得當前排名
export const fetchRankByScore = async (score: number) => {
  const querySnapshot = await getDocs(
    query(collection(db, 'players'), where('score', '>', score)),
  );

  const rank = querySnapshot.size + 1;
  return rank;
};
