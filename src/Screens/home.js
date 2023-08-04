/* eslint-disable no-fallthrough */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  FlatList,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {clacFields} from './fields/calcFields';

const width = Dimensions.get('screen').width;

const Home = () => {
  const [operator, setOperator] = useState(null);
  const [val1, setVal1] = useState('0');
  const [val2, setVal2] = useState('0');
  const [negative, setNagative] = useState(false);
  console.log(negative);
  console.log('operator: ', operator);
  console.log('val1: ', Number(val1));

  const handleClick = x => {
    if (x.type === 'operation') {
      console.log(x.value);
      setVal1('0');
    } else if (x.type === 'operator') {
      setVal2(val1);
      setVal1('0');
      setOperator(x.value);
    } else if (x.type === 'number') {
      const num = val1 === '0' ? x.name : val1 + x.name;
      if (val1.toString().length < 9) {
        console.log(num);
        setVal1(Number(num));
      }
    } else if (x.type === 'percentage') {
      setVal1(val1 / 100);
    } else if (x.type === 'negative') {
      setNagative(!negative);
      setVal1(!negative ? -Math.abs(val1) : Math.abs(val1));
    } else if (x.type === 'equal') {
      switch (operator) {
        case '+':
          console.log(operator);
          setVal1(val2 + val1);
          break;
        case '-':
          console.log(operator);
          setVal1(val2 - val1);
          break;
        case '/':
          console.log(operator);
          setVal1(val2 / val1);
          break;
        case '*':
          console.log(operator);
          setVal1(val1 * val2);
          break;
        default:
          break;
      }
    }
  };
  return (
    <View style={{flex: 1, width: '100%', backgroundColor: '#1a1a1a'}}>
      <View
        style={{
          width: '100%',
          height: '35%',
          flexDirection: 'row-reverse',
          justifyContent: 'flex-start',
          alignItems: 'flex-end',
        }}>
        <Text
          style={{
            color: '#fff',
            fontSize: val1.toString().length <= 7 ? width / 4 : width / 6,
          }}>
          {val1}
        </Text>
      </View>
      <FlatList
        data={clacFields}
        numColumns={4}
        key={4}
        renderItem={({item}) => (
          <TouchableOpacity
            style={item.containerStyle}
            onPress={() => handleClick(item)}>
            <Text style={item.textStyle}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Home;
