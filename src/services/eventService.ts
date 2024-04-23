import { FirebaseError } from 'firebase/app';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  startAfter,
  updateDoc,
  where,
  writeBatch,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import { db, storage } from './firebaseConfig';
import { EventFormValues } from '@/types/Form';
import { EventType } from '@/types/Event';
import combineDateAndTime from '@utils/combineDateAndTime';
import { eventDummyData } from '@/components/my/events/DummyData';

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

export const getEvent = async (eventId: string): Promise<EventType> => {
  const docRef = doc(db, 'events', eventId);
  const docSnap = await getDoc(docRef);

  return (docSnap.data() as EventType) || null;
};

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
  }));

  return myEvents;
};

export const getAllEvents = async ({ pageParam = null }) => {
  // 페이지당 아이템 수
  const PAGE_SIZE = 12;

  const eventsRef = collection(db, 'events');
  const q = pageParam
    ? query(
        eventsRef,
        orderBy('eventCreationDate', 'desc'),
        startAfter(pageParam),
        limit(PAGE_SIZE),
      )
    : query(eventsRef, orderBy('eventCreationDate', 'desc'), limit(PAGE_SIZE));

  const querySnapshot = await getDocs(q);
  const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

  const events = querySnapshot.docs.map(doc => ({
    uid: doc.id,
    ...(doc.data() as EventType),
  }));

  return { events, lastVisible };
};

export const addDummyEvents = async () => {
  const batch = writeBatch(db);

  eventDummyData.forEach(event => {
    const docRef = doc(collection(db, 'events'));

    batch.set(docRef, event);
  });

  await batch.commit();

  alert('이벤트 리스트가 추가되었습니다.');
};
