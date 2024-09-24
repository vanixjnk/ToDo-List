import {
  addDoc,
  collection,
  query,
  orderBy,
  getDocs,
  where,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { addTodo } from "../store/todo/actions";

export const fetchAllTodoByID = async (userID) => {
  try {
    const todosCollectionRef = collection(db, "todos");
    const querySnapshot = await getDocs(
      query(
        todosCollectionRef,
        where("userID", "==", userID),
        orderBy("createdAt", "desc")
      )
    );

    const todos = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    return todos;
  } catch (error) {
    console.error(error);
  }
};

export const postTodo = async (todo, dispatch) => {
  const todosCollectionRef = collection(db, "todos");
  try {
    const querySnapshot = await getDocs(
      query(todosCollectionRef, where("title", "==", todo.title))
    );

    if (!querySnapshot.empty) {
      return { status: false, message: "Dữ liệu đã tồn tại" };
    }

    const docRef = await addDoc(todosCollectionRef, todo);
    const newTodo = {
      ...todo,
      id: docRef.id,
    };
    dispatch(addTodo(newTodo));
    return { status: true, message: "Thêm task thành công" }
  } catch (error) {
    console.error("Error adding todo:", error);
  }
};
