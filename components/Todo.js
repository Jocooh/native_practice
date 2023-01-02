import React from "react";
import { StyledList } from "../styles";
import { Text, View, TouchableOpacity, TextInput, Alert } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useState } from "react";

function Todo({ item, todos, setTodos }) {
  const [editText, setEditText] = useState("");

  //toggle부터 먼저 해줘야되니까 isdone때처럼 먼저 만들어준다.
  const isEditToggle = (id) => {
    const newTodos = [...todos];
    const indexNum = newTodos.findIndex((element) => element.id === id);
    newTodos[indexNum].isEdit = !newTodos[indexNum].isEdit; //true or false 바꿔주기
    console.log(indexNum);
    setTodos(newTodos);
  };

  const handleEditTodo = (id) => {
    //1.id값을 받아서 해당 배열의 요소를 찾는다.
    //2.todos[idx].text값을 바꿔준다. ==editText
    const newTodos = [...todos];
    const idx = newTodos.findIndex((element) => element.id === id);
    newTodos[idx].text = editText;
    newTodos[idx].isEdit = false;
    setTodos(newTodos);
  };

  //isDone토글링하자
  //1.버튼을 누르면 isDone이 true가 되게하고
  //2.true가 되면 linethrough가 실행된다. 조건문을 사용하자
  const isDoneToggle = (id) => {
    const newTodos = [...todos]; //지금 화면에 떠있는 투두 목록들을 복사한다.
    //findIndex는 (콜백함수)가 들어와야한다. 그리고 주는 조건에 일치하는 첫번째 값의 인덱스 번호를 반환한다.
    const indexNum = newTodos.findIndex((element) => element.id === id); //newTodos를 돌면서 element안의 id값을 다 받고나서  파라미터로 받아온 id와 일치하는 인덱스 번호를 반환한다.
    newTodos[indexNum].isDone = !newTodos[indexNum].isDone;
    console.log(indexNum);
    setTodos(newTodos);
  };

  //일단 id값으로 일치한지 확인한다.
  //Alert창을 띄워보자.
  const deleteTodo = (id) => {
    Alert.alert("TODO삭제", "정말 삭제 하시겠습니까?", [
      {
        text: "취소",
        style: "cancel",
        onPress: () => {
          console.log("취소했음");
        },
      },
      {
        text: "삭제",
        style: "delete",
        onPress: () => {
          const newTodo = todos.filter((item) => item.id !== id);
          setTodos(newTodo);
        },
      },
    ]);
  };
  return (
    <StyledList key={item.id}>
      {item.isEdit ? (
        <TextInput
          style={{ backgroundColor: "white", flex: 1 }}
          value={editText}
          onChangeText={setEditText}
          onSubmitEditing={() => {
            handleEditTodo(item.id);
          }}
        />
      ) : (
        <Text
          style={{
            padding: 13,
            fontSize: 20,
            fontWeight: "bold",
            textDecorationLine: item.isDone ? "line-through" : "none",
          }}
        >
          {item.text}
        </Text>
      )}
      <View style={{ flexDirection: "row", padding: 10 }}>
        {/* 수정아이콘 */}
        <TouchableOpacity
          onPress={() => {
            isEditToggle(item.id);
          }}
        >
          <FontAwesome name="pencil-square-o" size={26} color="black" />
        </TouchableOpacity>
        {/* 삭제 아이콘*/}
        <TouchableOpacity
          onPress={() => {
            deleteTodo(item.id);
          }}
        >
          <Ionicons
            name="ios-trash-bin"
            size={26}
            color="black"
            style={{ marginLeft: 7 }}
          />
        </TouchableOpacity>
        {/* isDone */}
        <TouchableOpacity
          onPress={() => {
            isDoneToggle(item.id);
          }}
        >
          <FontAwesome
            name="check-square"
            size={26}
            color="black"
            style={{ marginLeft: 7 }}
          />
        </TouchableOpacity>
      </View>
    </StyledList>
  );
}

export default Todo;
