
import {
  doc,
  onSnapshot,
  setDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore'

import { db } from '../firebase.js'

// Listen to this user's favourites in Firestore.
export function subscribeToFavourites(uid, onData, onError) {
  const favouriteRef = doc(db, 'favourites', uid)

  return onSnapshot(
    favouriteRef,
    (snapshot) => {
      onData(
        snapshot.exists()
          ? snapshot.data().items ?? []
          : []
      )
    },
    onError
  )
}

// Add or remove a favourite item.
export function toggleFavouriteInFirestore(
  uid,
  item,
  isFavourite
) {
  const favouriteRef = doc(db, 'favourites', uid)

  return setDoc(
    favouriteRef,
    {
      items: isFavourite
        ? arrayRemove(item)
        : arrayUnion(item),
    },
    { merge: true }
  )
}
