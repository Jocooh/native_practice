import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Category from "./components/Category";
import Todo from "./components/Todo";
import { Alert, ScrollView, StyleSheet } from "react-native";
import { StyledInputBox, StyledTextInput } from "./styles";
import { SafeAreaView } from "react-native";
import { useEffect, useState } from "react";

export default function App() {
  const [text, setText] = useState(""); //사용자 입력값
  const [todos, setTodos] = useState([]); // 입력한 투두들
  const [category, setCategory] = useState(""); //카테고리별 state

  //투두에 입력될 기본 데이터 값을 정하자
  const newTodo = {
    id: Date.now(),
    text, //text:text => text라는 key값을 가지고 text(state)가 value값이다.
    isDone: false,
    isEdit: false,
    category,
  };

  //제출하면 추가되는 함수
  const addTodo = () => {
    setTodos((prev) => [...prev, newTodo]);
    setText("");
  };

  //todos가 변할때마다 상태를 저장하겠다.
  useEffect(() => {
    //현재의 최신 todos를 storage에 저장
    const saveTodos = async () => {
      await AsyncStorage.setItem("todos", JSON.stringify(todos)); //저장하기전 json으로 넣어주기위해서 꼭 필요
    };
    if (todos.length > 0) saveTodos(); //처음에 빈 배열로 되어 있으므로 useEffect가 읽히지 않을 것이다. 그러고 나서 추가되면 읽히기 시작한다.
  }, [todos]);

  //처음 마운트 됬을때 데이터를 불러오겠다.(새로고침이나 처음 렌더링이 되었을때)
  useEffect(() => {
    const getData = async () => {
      const getItem_todos = await AsyncStorage.getItem("todos"); //todos는 배열이므로 스토리지에 보관했을때 파싱을 반드시 해서 값을 가져와야한다.
      const getItem_category = await AsyncStorage.getItem("category");
      setTodos(JSON.parse(getItem_todos) ?? []);
      setCategory(getItem_category ?? "js");
    };
    getData();
  }, []); //처음 한번만 가져오겠다.

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
            return <Todo item={item} todos={todos} setTodos={setTodos}></Todo>;
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
