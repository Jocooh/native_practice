import React from "react";
import { StyledCategory, StyledTouchable, StyledBtns } from "../styles";
import { View } from "react-native";

function Category({ category, setCategory }) {
  //카테고리를 저장하는 함수,카테고리를 인자로 받아서 setState를 실행한다.
  const setCate = async (cat) => {
    setCategory(cat);
    await AsyncStorage.setItem("category", cat); //데이터 타입이 문자열이기 때문에 따로 JSON 할 필요 없이 바로 저장가능하다.
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
