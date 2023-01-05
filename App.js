import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Category from "./components/Category";
import Todo from "./components/Todo";
import { ScrollView, StyleSheet } from "react-native";
import { StyledInputBox, StyledTextInput } from "./styles";
import { SafeAreaView } from "react-native";
import { useEffect, useState } from "react";
import {
  onSnapshot,
  doc,
  orderBy,
  addDoc,
  getDoc,
  getDocs,
  query,
  collection,
} from "firebase/firestore";
import { dbService } from "./firebase";

export default function App() {
  const [text, setText] = useState(""); //사용자 입력값
  const [todos, setTodos] = useState([]); // 입력한 투두들
  const [category, setCategory] = useState(""); //카테고리별 state

  //투두에 입력될 기본 데이터 값을 정하자
  const newTodo = {
    // id: Date.now(),  ->파이어베이스에서는 이렇게 하지 않아도 된다.
    text, //text:text => text라는 key값을 가지고 text(state)가 value값이다.
    isDone: false,
    isEdit: false,
    category,
    createdAt: Date.now(),
  };

  //제출하면 추가되는 함수
  const addTodo = async () => {
    // setTodos((prev) => [...prev, newTodo]);->데이터베이스에 변화만 있으면 snapshot이 알아서 setTodos가되므로 없어도됨
    //addDoc: 콜렉션이라고 지정해주면 알아서 랜덤한 id를 지정해주는 API
    await addDoc(collection(dbService, "todos"), newTodo); //이러면 알아서 콜렉션에 todos가 생김, 아까처럼 미리 안 만들어놔도 된다는거\
    setText("");
  };

  //todos가 변할때마다 상태를 저장하겠다.
  // useEffect(() => {
  //   //현재의 최신 todos를 storage에 저장
  //   const saveTodos = async () => {
  //     await AsyncStorage.setItem("todos", JSON.stringify(todos)); //저장하기전 json으로 넣어주기위해서 꼭 필요
  //   };
  //   if (todos.length > 0) saveTodos(); //처음에 빈 배열로 되어 있으므로 useEffect가 읽히지 않을 것이다. 그러고 나서 추가되면 읽히기 시작한다.
  // }, [todos]);

  //처음 마운트 됬을때 데이터를 불러오겠다.(새로고침이나 처음 렌더링이 되었을때)
  useEffect(() => {
    //콜렉션은 특정 파이어베이스 프로젝트 'todos'라는 콜렉션에 변화가 있을때마다 그 안에 있는 모든 doc을 조회할 수 있도록 한다. 불러올때 필드의 값을 내림차순으로 가져오겠다.
    //1.onSnapshot API를 이용해서 todos 콜렉션에 변경이 생길때 마다 todos 콜렉션 안의 모든 document들을 불러와서 setTodos한다.
    const q = query(
      collection(dbService, "todos"),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      //snapshot : 모든 docs들의 내용이 담겨져 있다.
      const newTodos = snapshot.docs.map((doc) => {
        // console.log(doc.data());
        const newTodo = {
          id: doc.id,
          ...doc.data(), // doc.data() : { text, createdAt, ...  }
        };
        return newTodo;
      });

      setTodos(newTodos);
    });

    const getData = async () => {
      const getItem_todos = await AsyncStorage.getItem("todos"); //todos는 배열이므로 스토리지에 보관했을때 파싱을 반드시 해서 값을 가져와야한다.
      // const getItem_category = await AsyncStorage.getItem("category");
      setTodos(JSON.parse(getItem_todos) ?? []);
      //setCategory(getItem_category ?? "js");
    };
    getData();

    // 카테고리를 파이어베이스에서 가져오는 함수
    const getCategory = async () => {
      const snapshot = await getDoc(
        doc(dbService, "category", "currentCategory")
      );
      console.log(snapshot.data()); // {"category": "ct"}
      setCategory(snapshot.data().category); //필요한 데이터 키값만 들고 온다.
    };
    getCategory();
  }, []); //처음 마운트 되었을 때 카테고리를 들고 올 수 있도록 한다.
  return (
    <SafeAreaView style={styles.wrraper}>
      <StatusBar style="auto" />
      {/* 카테고리 지정 */}
      <Category category={category} setCategory={setCategory}></Category>
      {/* 할일 적는 input */}
      <StyledInputBox>
        <StyledTextInput
          onSubmitEditing={addTodo}
          onChangeText={setText}
          value={text}
          placeholder="Enter your task"
        ></StyledTextInput>
      </StyledInputBox>
      {/* 리스트 적는 공간 */}
      <ScrollView>
        {todos.map((item) => {
          if (item.category === category) {
            return (
              <Todo
                key={item.id}
                item={item}
                todos={todos}
                setTodos={setTodos}
              ></Todo>
            );
          }
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrraper: {
    flex: 1,
    width: "90%",
    marginStart: 20,
    justifyContent: "center",
    alignContent: "center",
  },
});
