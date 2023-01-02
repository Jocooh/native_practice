import { StatusBar } from "expo-status-bar";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import {
  StyledList,
  StyledCategory,
  StyledInputBox,
  StyledTextInput,
  StyledTouchable,
  StyledBtns,
} from "./styles";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { useState } from "react";

export default function App() {
  const [text, setText] = useState(""); //사용자 입력값
  const [todos, setTodos] = useState([]); // 입력한 투두들
  const [category, setCategory] = useState("js"); //카테고리별 state

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

  //카테고리를 지정하자
  //1.카테고리를 누르면 배경색이 바뀌도록 해주자.

  return (
    <SafeAreaView style={styles.wrraper}>
      <StatusBar style="auto" />
      {/* 카테고리 지정 */}
      <StyledCategory>
        <StyledTouchable
          onPress={() => {
            setCategory("js");
          }}
        >
          <View>
            <StyledBtns>javascript</StyledBtns>
          </View>
        </StyledTouchable>
        <StyledTouchable
          onPress={() => {
            setCategory("react");
          }}
        >
          <View>
            <StyledBtns>react</StyledBtns>
          </View>
        </StyledTouchable>
        <StyledTouchable
          onPress={() => {
            setCategory("ct");
          }}
        >
          <View>
            <StyledBtns>codingTest</StyledBtns>
          </View>
        </StyledTouchable>
      </StyledCategory>
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
          return (
            <StyledList>
              <Text
                style={{
                  padding: 13,
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                {item.text}
              </Text>
              <View style={{ flexDirection: "row", padding: 10 }}>
                <TouchableOpacity>
                  <FontAwesome name="pencil-square-o" size={26} color="black" />
                </TouchableOpacity>
                {/* 삭제 아이콘*/}
                <TouchableOpacity>
                  <Ionicons
                    name="ios-trash-bin"
                    size={26}
                    color="black"
                    style={{ marginLeft: 7 }}
                  />
                </TouchableOpacity>
                {/* isDone */}
                <TouchableOpacity>
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
