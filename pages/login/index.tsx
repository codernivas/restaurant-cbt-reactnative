import {View, Text, Button} from 'react-native';
import React,{useState} from 'react';
import axios from 'axios';

const LoginPage = () => {
 const [data, setData]= useState("")
  const handleAPI = async () => {
    try {
      const response = await axios.get(
        'https://restaurant1-ym87.onrender.com/',
     
      );
      console.log(response.data); // Log the response from the server
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };
  return (
    <View>
      <Text>App</Text>
      <Button title="Login" onPress={() => handleAPI()}></Button>
    </View>
  );
};

export default LoginPage;
