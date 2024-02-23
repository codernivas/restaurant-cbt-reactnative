import React, { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"

interface RadioButtonProps {
  options: string[]
  onOptionSelect: (option: string) => void; // Callback function to handle option selection

}

const RadioButton: React.FC<RadioButtonProps> = ({ options,onOptionSelect }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    onOptionSelect(option); 
  };
  return (
    <View style={styles.container}>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          onPress={() => handleOptionSelect(option)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingLeft: 20,
          }}
        >
          <View
            style={{
              height: 24,
              width: 24,
              borderRadius: 12,
              borderWidth: 2,
              borderColor: selectedOption === option ? "#FDA058" : "gray",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {selectedOption === option && (
              <View
                style={{
                  height: 12,
                  width: 12,
                  borderRadius: 6,
                  backgroundColor: "#FDA058",
                  paddingLeft: 10,
                }}
              />
            )}
          </View>
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { display: "flex", flexDirection: "row", zIndex: 1 },
  optionText: {
    marginLeft: 5,
    color: "#595757",
    fontWeight: "600",
  },
})

export default RadioButton
