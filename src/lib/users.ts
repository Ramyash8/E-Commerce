
import { collection, getDocs, query, where, limit, doc, setDoc, getDoc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { app } from './firebase';

export interface User {
    id: string;
    name: string;
    email: string;
    orders: number;
    totalSpent: string;
}

const db = getFirestore(app);
const usersCollection = collection(db, 'users');

export async function getUsers(): Promise<User[]> {
  const querySnapshot = await getDocs(usersCollection);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as User));
}

export async function createUser(userData: User): Promise<void> {
    const userRef = doc(db, "users", userData.id);
    // Use setDoc with merge:true to create or update, preventing overwrite
    await setDoc(userRef, {
        name: userData.name,
        email: userData.email,
        orders: userData.orders,
        totalSpent: userData.totalSpent,
    }, { merge: true });
}

export async function getUserById(id: string): Promise<User | undefined> {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as User;
    }
    return undefined;
}


/**
 * A mock function to get a sample User ID to associate with an order.
 * In a real app, the user's domain-specific ID would be stored in their auth profile or a user document.
 * This function is used to link guest checkouts or new sign-ups to one of the sample users.
 * @param email The email of the user placing the order.
 * @returns A sample user ID string, or null.
 */
export const getSampleUserId = async (email: string): Promise<string | null> => {
    // Admins don't place orders in this demo
    if (email === 'admin@shopsphere.com') return null; 
    
    // Check if the user is one of the pre-defined sample users
    const q = query(usersCollection, where("email", "==", email), limit(1));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
        return querySnapshot.docs[0].id;
    }
    
    // Fallback for newly signed up users who are not in the seed data.
    // We'll just assign them the first user's ID for demo purposes.
    const allUsersSnapshot = await getDocs(query(usersCollection, limit(1)));
    if (!allUsersSnapshot.empty) {
        return allUsersSnapshot.docs[0].id;
    }

    return null;
};
