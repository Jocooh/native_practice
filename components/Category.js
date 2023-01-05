import React from "react";
import { StyledCategory, StyledTouchable, StyledBtns } from "../styles";
import { View } from "react-native";
import { updateDoc, doc } from "firebase/firestore";
import { dbService } from "../firebase";

function Category({ category, setCategory }) {
  //카테고리를 저장하는 함수,카테고리를 인자로 받아서 setState를 실행한다.
  const setCate = async (cat) => {
    setCategory(cat);
    //이 파일 안에 category는 cat으로 한다. =>파이어베이스에 react로 변경된 것을 알 수 있다.
    await updateDoc(doc(dbService, "category", "currentCategory"), {
      category: cat,
    });
  };
  return (
    <StyledCategory>
      <StyledTouchable
        onPress={() => {
          setCate("js");
        }}
        style={{
          ...StyledTouchable,
          backgroundColor: category === "js" ? "#FFB100" : "#579BB1",
        }}
      >
        <View>
          <StyledBtns>javascript</StyledBtns>
        </View>
      </StyledTouchable>
      <StyledTouchable
        onPress={() => {
          setCate("react");
        }}
        style={{
          ...StyledTouchable,
          backgroundColor: category === "react" ? "#FFB100" : "#579BB1",
        }}
      >
        <View>
          <StyledBtns>react</StyledBtns>
        </View>
      </StyledTouchable>
      <StyledTouchable
        onPress={() => {
          setCate("ct");
        }}
        style={{
          ...StyledTouchable,
          backgroundColor: category === "ct" ? "#FFB100" : "#579BB1",
        }}
      >
        <View>
          <StyledBtns>codingTest</StyledBtns>
        </View>
      </StyledTouchable>
    </StyledCategory>
  );
}

export default Category;
