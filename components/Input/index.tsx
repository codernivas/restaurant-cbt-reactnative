import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const CustomInput = () => {
  const [text, setText] = useState('');

  const onChangeText = (inputText: string) => {
    setText(inputText);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="Type something..."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 42,
    width: 297,
    color: '#797979',
    borderColor: 'rgba(0, 0, 0, 0.4)',
    fontSize:14,
    fontWeight:"500",
    borderRadius:5,
    borderWidth: 1,
    paddingHorizontal: 10,
  },
});

export default CustomInput;
