import { View, Text as RnText, TextProps } from "react-native";
import React from "react";

export const Text = (props: TextProps) => {
  const propsStyle = props?.style || ({} as Partial<TextProps["style"]>);
  return (
    <RnText
      style={{
        ...propsStyle,
        fontFamily: "Dm-Sans",
      }}
    >
      {props.children}
    </RnText>
  );
};
