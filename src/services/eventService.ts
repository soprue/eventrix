import { FirebaseError } from 'firebase/app';
import {
  Timestamp,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  runTransaction,
  setDoc,
  startAfter,
  updateDoc,
  where,
  writeBatch,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import { db, storage } from './firebaseConfig';
import { EventFormValues } from '@/types/form';
import { EventType, PriceFilterType, SortFilterType } from '@/types/event';
import { LikedEvent } from '@/types/likedEvent';
import combineDateAndTime from '@utils/mypage/combineDateAndTime';
import calculateEventStatus from '@utils/mypage/calculateEventStatus';
import { eventDummyData } from '@components/mypage/events/DummyData';

// 페이지당 아이템 수
const PAGE_SIZE = 12;

/**
 * Firestore에 이벤트를 생성하고 Firebase Storage에 썸네일 이미지를 업로드합니다.
 * @param {EventFormValues} data - 저장할 이벤트 데이터입니다.
 * @returns {Promise<{success: boolean, eventId?: string, error?: string}>} - 이벤트 생성 시도 결과입니다.
 */
export const createEvent = async (data: EventFormValues) => {
  const eventId = doc(collection(db, 'events')).id;

  // Storage에 thumbnail 업로드
  const storageRef = ref(storage, `eventThumbnails/${eventId}.webp`);
  const fileSnapshot = await uploadBytes(storageRef, data.thumbnail as File);
  const thumbnailUrl = await getDownloadURL(fileSnapshot.ref);

  // 이벤트 데이터 준비
  const startDateTime = combineDateAndTime(
    data.startDate as Date,
    data.startTime,
  );
  const endDateTime = combineDateAndTime(data.endDate as Date, data.endTime);
  const registrationStart = combineDateAndTime(
    data.registrationStartDate as Date,
    data.registrationStartTime,
  );
  const registrationEnd = combineDateAndTime(
    data.registrationEndDate as Date,
    data.registrationEndTime,
  );

  const ticketOptions = data.tickets.map(ticket => ({
    id: ticket.id,
    optionName: ticket.name,
    price: ticket.price,
    scheduledCount: ticket.quantity,
    soldCount: 0,
  }));

  const prices = ticketOptions.map(option => option.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  // 이벤트 데이터 객체 생성
  const eventData = {
    uid: eventId,
    organizerUID: data.organizerUID,
    thumbnail: thumbnailUrl,
    name: data.name,
    category: data.category,
    startDateTime,
    endDateTime,
    registrationStart,
    registrationEnd,
    location: data.location,
    description: data.description,
    likesCount: 0,
    ticketOptions,
    minPrice,
    maxPrice,
    eventCreationDate: new Date(),
  };

  try {
    await setDoc(doc(db, 'events', eventId), eventData);
    return { success: true, eventId };
  } catch (error) {
    if (error instanceof FirebaseError) {
      return { success: false, error: error.message };
    } else {
      return { success: false, error: error };
    }
  }
};

/**
 * 제공된 이벤트 ID를 기반으로 Firestore에서 이벤트를 검색합니다.
 * @param {string} eventId - 검색할 이벤트의 ID입니다.
 * @returns {Promise<EventType>} - 검색된 이벤트 데이터입니다.
 */
export const getEvent = async (eventId: string): Promise<EventType> => {
  const docRef = doc(db, 'events', eventId);
  const docSnap = await getDoc(docRef);

  const event = {
    ...(docSnap.data() as EventType),
    status: calculateEventStatus(docSnap.data() as EventType),
  };
  return event || null;
};

/**
 * 기존 이벤트를 Firestore에서 업데이트하고 선택적으로 새 썸네일 이미지를 업로드합니다.
 * @param {EventFormValues} data - 이벤트의 업데이트된 데이터입니다.
 * @returns {Promise<{success: boolean, error?: string}>} - 업데이트 시도 결과입니다.
 */
export const updateEvent = async (data: EventFormValues) => {
  // 기존 이벤트 데이터 가져오기
  const eventRef = doc(db, 'events', data.uid!);
  const eventSnap = await getDoc(eventRef);
  const existingEvent = eventSnap.data() as EventType;

  // Thumbnail이 파일인지 확인
  const isFile = data.thumbnail instanceof File;

  // Storage에 새로운 Thumbnail 업로드
  let thumbnailUrl = '';
  if (isFile) {
    const storageRef = ref(storage, `eventThumbnails/${data.uid}.webp`);
    const fileSnapshot = await uploadBytes(storageRef, data.thumbnail as File);
    thumbnailUrl = await getDownloadURL(fileSnapshot.ref);
  } else {
    // 파일이 아닌 경우는 기존 썸네일 URL 그대로 사용
    thumbnailUrl = data.thumbnail as string;
  }

  const startDateTime = combineDateAndTime(
    data.startDate as Date,
    data.startTime,
  );
  const endDateTime = combineDateAndTime(data.endDate as Date, data.endTime);
  const registrationStart = combineDateAndTime(
    data.registrationStartDate as Date,
    data.registrationStartTime,
  );
  const registrationEnd = combineDateAndTime(
    data.registrationEndDate as Date,
    data.registrationEndTime,
  );

  const ticketOptions = data.tickets.map(ticket => {
    const existingTicket = existingEvent.ticketOptions.find(
      t => t.id === ticket.id,
    );
    const soldCount = existingTicket ? existingTicket.soldCount : 0; // 기존 soldCount 유지
    return {
      id: ticket.id,
      optionName: ticket.name,
      price: ticket.price,
      scheduledCount: ticket.quantity,
      soldCount,
    };
  });

  const prices = ticketOptions.map(option => option.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  const eventData = {
    thumbnail: thumbnailUrl,
    name: data.name,
    category: data.category,
    startDateTime,
    endDateTime,
    registrationStart,
    registrationEnd,
    location: data.location,
    description: data.description,
    ticketOptions,
    minPrice,
    maxPrice,
  };

  try {
    await updateDoc(eventRef, eventData);
    return { success: true };
  } catch (error) {
    if (error instanceof FirebaseError) {
      return { success: false, error: error.message };
    } else {
      return { success: false, error: error };
    }
  }
};

/**
 * 제공된 이벤트 ID를 기반으로 Firestore에서 이벤트를 삭제합니다.
 * @param {string} eventId - 삭제할 이벤트의 ID입니다.
 * @returns {Promise<{success: boolean, error?: string}>} - 삭제 시도 결과입니다.
 */
export const deleteEvent = async (eventId: string) => {
  try {
    const eventRef = doc(db, 'events', eventId);
    await deleteDoc(eventRef);
    return { success: true };
  } catch (error) {
    if (error instanceof FirebaseError) {
      return {
        success: false,
        error: error.message,
      };
    } else {
      return {
        success: false,
        error: error,
      };
    }
  }
};

/**
 * 주최자 UID를 기반으로 Firestore에서 해당 주최자의 모든 이벤트를 검색합니다.
 * @param {string} organizerUID - 이벤트 주최자의 UID입니다.
 * @returns {Promise<EventType[]>} - 검색된 이벤트 목록을 반환합니다.
 */
export const getMyEvents = async (
  organizerUID: string,
): Promise<EventType[]> => {
  const eventsRef = collection(db, 'events');

  const q = query(
    eventsRef,
    where('organizerUID', '==', organizerUID),
    orderBy('eventCreationDate', 'desc'),
  );

  const querySnapshot = await getDocs(q);

  const myEvents = querySnapshot.docs.map(doc => ({
    uid: doc.id,
    ...(doc.data() as EventType),
    status: calculateEventStatus(doc.data() as EventType),
  }));

  return myEvents;
};

/**
 * 모든 이벤트를 검색하며, 필터와 페이징 옵션을 적용할 수 있습니다.
 * @param {Object} options - 이벤트 검색 옵션을 포함한 객체입니다.
 * @param {number|null} options.pageParam - 페이징 처리를 위한 페이지 매개변수입니다.
 * @param {SortFilterType} options.sort - 이벤트를 정렬하는 기준입니다.
 * @param {string[]} options.category - 카테고리에 따른 필터링을 위한 배열입니다.
 * @param {PriceFilterType} options.price - 가격 필터링 옵션입니다.
 * @returns {Promise<{events: EventType[], lastVisible: DocumentSnapshot}>} - 검색된 이벤트와 마지막 문서의 스냅샷을 반환합니다.
 */
export const getAllEvents = async ({
  pageParam = null,
  sort = '최신순',
  category = [],
  price = '전체',
}: {
  pageParam: number | null;
  sort: SortFilterType;
  category: string[];
  price: PriceFilterType;
}) => {
  const eventsRef = collection(db, 'events');

  let q = query(eventsRef);

  // 카테고리 필터 적용
  if (category.length > 0) {
    q = query(q, where('category', 'in', category));
  }

  // 가격 필터 적용
  if (price !== '전체') {
    if (price === '무료') {
      // "무료"는 minPrice가 0원인 경우
      q = query(q, where('minPrice', '==', 0));
    } else if (price === '유료') {
      // "유료"는 minPrice가 0원 초과인 경우
      q = query(q, where('minPrice', '>', 0));
    }
  }

  // 정렬 옵션 적용
  if (sort === '최신순') {
    q = query(q, orderBy('eventCreationDate', 'desc'));
  } else if (sort === '인기순') {
    q = query(q, orderBy('likesCount', 'desc'));
  }

  // 페이징 처리
  if (pageParam) {
    q = query(q, startAfter(pageParam), limit(PAGE_SIZE));
  } else {
    q = query(q, limit(PAGE_SIZE));
  }

  const querySnapshot = await getDocs(q);
  const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

  const events = querySnapshot.docs.map(doc => ({
    uid: doc.id,
    ...(doc.data() as EventType),
    status: calculateEventStatus(doc.data() as EventType),
  }));

  return { events, lastVisible };
};

/**
 * 더미 이벤트 데이터를 Firestore에 일괄 추가합니다.
 * @returns {Promise<void>} - 함수 실행 후 반환 값 없음.
 */
export const addDummyEvents = async () => {
  const batch = writeBatch(db);

  eventDummyData.forEach(event => {
    const docRef = doc(collection(db, 'events'));

    batch.set(docRef, event);
  });

  await batch.commit();

  alert('이벤트 리스트가 추가되었습니다.');
};

/**
 * 키워드를 기반으로 이벤트를 검색합니다. 정렬 및 페이징 처리를 적용할 수 있습니다.
 * @param {Object} options - 검색 옵션을 포함한 객체입니다.
 * @param {number|null} options.pageParam - 페이징 처리를 위한 페이지 매개변수입니다.
 * @param {SortFilterType} options.sort - 이벤트를 정렬하는 기준입니다.
 * @param {string} options.keyword - 검색할 키워드입니다.
 * @returns {Promise<{events: EventType[], lastVisible: DocumentSnapshot}>} - 검색된 이벤트와 마지막 문서의 스냅샷을 반환합니다.
 */
export const searchEvents = async ({
  pageParam = null,
  sort = '최신순',
  keyword,
}: {
  pageParam: number | null;
  sort: SortFilterType;
  keyword: string;
}) => {
  const eventsRef = collection(db, 'events');
  const trimmedKeyword = keyword.trim().toLowerCase();

  let q = query(eventsRef);

  // 정렬 옵션 적용
  if (sort === '최신순') {
    q = query(q, orderBy('eventCreationDate', 'desc'));
  } else if (sort === '인기순') {
    q = query(q, orderBy('likesCount', 'desc'));
  }

  // 키워드 검색
  q = query(
    q,
    where('name', '>=', trimmedKeyword),
    where('name', '<=', trimmedKeyword + '\uf8ff'),
  );

  // 페이징 처리
  if (pageParam) {
    q = query(q, startAfter(pageParam), limit(PAGE_SIZE));
  } else {
    q = query(q, limit(PAGE_SIZE));
  }

  const querySnapshot = await getDocs(q);
  const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

  const events = querySnapshot.docs.map(doc => ({
    uid: doc.id,
    ...(doc.data() as EventType),
    status: calculateEventStatus(doc.data() as EventType),
  }));

  return { events, lastVisible };
};

/**
 * 사용자가 이벤트를 좋아요 토글하는 기능입니다. Firestore 트랜잭션을 사용하여 좋아요 수를 동기화합니다.
 * @param {string} userId - 사용자 ID입니다.
 * @param {string} eventId - 좋아요 토글할 이벤트의 ID입니다.
 * @returns {Promise<void>} - 함수 실행 후 반환 값 없음.
 */
export const toggleLikeEvent = async (userId: string, eventId: string) => {
  const userLikesRef = collection(db, 'userLikes');
  const likeRef = doc(userLikesRef, `${userId}_${eventId}`);
  const eventRef = doc(db, 'events', eventId);

  // 트랜잭션을 사용하여 좋아요 상태와 likesCount 동기화
  await runTransaction(db, async transaction => {
    const likeSnap = await transaction.get(likeRef);
    const eventSnap = await transaction.get(eventRef);

    if (!eventSnap.exists()) {
      throw new Error('Event does not exist!');
    }

    let newLikesCount = eventSnap.data().likesCount || 0;

    if (likeSnap.exists()) {
      transaction.delete(likeRef);
      newLikesCount -= 1;
    } else {
      transaction.set(likeRef, {
        userId,
        eventId,
        likedAt: Timestamp.fromDate(new Date()),
      });
      newLikesCount += 1;
    }

    // 이벤트 문서의 likesCount 업데이트
    transaction.update(eventRef, { likesCount: newLikesCount });
  });
};

/**
 * 특정 사용자가 좋아요한 이벤트 목록을 검색합니다.
 * @param {string} userId - 사용자 ID입니다.
 * @returns {Promise<LikedEvent[]>} - 좋아요한 이벤트 목록을 반환합니다.
 */
export const getUserLikes = async (userId: string): Promise<LikedEvent[]> => {
  const q = query(collection(db, 'userLikes'), where('userId', '==', userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => doc.data() as LikedEvent);
};

/**
 * 사용자가 좋아요한 이벤트 목록을 스크롤 리스트로 검색합니다. 페이징 처리가 적용됩니다.
 * @param {number|null} pageParam - 페이징 처리를 위한 페이지 매개변수입니다.
 * @param {string} userId - 사용자 ID입니다.
 * @returns {Promise<{events: EventType[], nextCursor: Timestamp|undefined}>} - 검색된 이벤트와 다음 커서 위치를 반환합니다.
 */
export const getUserLikesWithPagination = async (
  pageParam = null,
  userId: string,
) => {
  const likesRef = collection(db, 'userLikes');
  let q = query(
    likesRef,
    where('userId', '==', userId),
    orderBy('likedAt', 'desc'),
    limit(10),
  );

  if (pageParam) {
    q = query(q, startAfter(pageParam));
  }

  const snapshot = await getDocs(q);
  const lastVisible = snapshot.docs[snapshot.docs.length - 1];

  const eventIds = snapshot.docs.map(doc => doc.data().eventId);
  const events = await Promise.all(
    eventIds.map(async eventId => {
      const eventRef = doc(db, 'events', eventId);
      const eventSnap = await getDoc(eventRef);
      return { id: eventId, ...(eventSnap.data() as EventType) };
    }),
  );

  return {
    events: events,
    nextCursor: lastVisible ? lastVisible.data().likedAt : undefined,
  };
};
