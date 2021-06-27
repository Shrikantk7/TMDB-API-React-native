
import React from 'react';
import {
  View,
} from 'react-native';
import Search from './Navigation/search';
import Movie from "./Navigation/Movies"
import axios from 'axios';

function App() {

  return (
    <View>
      <Search />
      <Movie />
    </View>
  )
};

export default App;
