import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';

import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    View,
} from 'react-native';

// movie list by movie_id
const MovieList = ({ navigation }) => {

    const [id, setId] = useState("");
    const [data, setData] = useState([]);

    // fetch movie lists 
    // data : results: []
    const lists = async () => {
        const fetchlists = await axios("https://api.themoviedb.org/3/movie/550/lists",
            {
                params: {
                    api_key: "ed91833294a575a7469cf7c8e13501ad",
                    movie_id: "550"
                }
            });
        setData(fetchlists.results);
    }

    // movies names lists 
    const Movie_name = () => {
        return data.map(ell => {
            return (
                <View style={styles.container} >
                    <TouchableOpacity onPress={() => navigation.navigate('Details', {
                        sendToDetails: "550"
                    })}>
                        <Text key={ell.id}> {ell.name} </Text>
                    </TouchableOpacity>
                </View>
            )
        })
    }

    return (
        <View>
            {lists()}
            {Movie_name()}
        </View>
    )
};

//  style sheet for movie Lists
styles = StyleSheet.create({
    container: {
        marginTop: 100,
    }
});

// Details by movie_id
const Details = ({ route, navigation }) => {
    const { sendToDetails } = route.params
    const [MovieDetails, setMovieDetails] = useState([]);

    const fetchDetails = async () => {
        const response = await axios("https://api.themoviedb.org/3/movie/{movie_id}",
            {
                params: {
                    api_key: "ed91833294a575a7469cf7c8e13501ad",
                    movie_id: sendToDetails
                }
            });
        setMovieDetails(response);
    }

    // rendering budget and overview
    return (
        <Fragment>
            {fetchDetails()}
            <Text> "budget:" {MovieDetails.budget} </Text>
            <Text> "budget:" {MovieDetails.overview} </Text>
        </Fragment>
    )
};

const Movie = () => {

    const Stack = createStackNavigator();

    return (
        <View>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="MovieTrend" component={MovieList} />
                    <Stack.Screen name="Details" component={Details} />
                </Stack.Navigator>
            </NavigationContainer>
        </View>

    )
};


export default Movie;