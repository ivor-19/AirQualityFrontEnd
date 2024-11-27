import { View, Text, SafeAreaView, TextInput } from 'react-native'
import React, { useState } from 'react'
import CustomButton from '../../../components/CustomButton'
import axios from 'axios';

const about = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const handleSubmit = async () => {
    const newStudent = { name, age };
    try {
      const response = await axios.post('https://air-quality-back-end.vercel.app/api/students', newStudent);
      console.log('Student is added in the database', response.data);
      setName('');
      setAge('');
    } catch (error) {
      console.error('Error adding student', error);
    }
  }
  return (
    <SafeAreaView className='flex-1'>
      <View className='flex-1 bg-white items-center justify-center' style={{ gap: 20 }}>
        <TextInput
          name='inputName'
          className='w-[50%] bg-gray-200 rounded-xl'
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          name='inputAge'
          className='w-[50%] bg-gray-200 rounded-xl'
          value={age}
          onChangeText={(text) => setAge(text)}
        />
        <CustomButton
          title='Submits'
          customButtomStyle={'w-[50%] bg-blue-200'}
          onPress={handleSubmit}
        />
      </View>
    </SafeAreaView>
  )
}

export default about