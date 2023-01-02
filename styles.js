import styled from "@emotion/native";

const StyledCategory = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0;
`;

const StyledTouchable = styled.TouchableOpacity({
  backgroundColor: "#579BB1",
  alignItems: "center",
  padding: 10,
  justifyContent: "center",
  width: 100,
});

const StyledBtns = styled.Text({
  fontSize: 14,
  fontWeight: "bold",
});

const StyledInputBox = styled.View`
  border-top-width: 3px;
  border-bottom-width: 3px;
  padding: 20px;
`;

const StyledTextInput = styled.TextInput({
  borderWidth: 3,
  padding: 10,
});

const StyledList = styled.View`
  background-color: #e1d7c6;
  height: 50px;
  margin-top: 10px;
  font-weight: bold;
  font-size: 18px;
  flex-direction: row;
  justify-content: space-between; ;
`;

export {
  StyledCategory,
  StyledList,
  StyledInputBox,
  StyledBtns,
  StyledTextInput,
  StyledTouchable,
};
