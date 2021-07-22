import React, { useState } from 'react';

import {
    TextInput,
    Button,
    Text,
    View,
} from 'react-native';
import axios from 'axios';

const Search = () => {

    const [searchdata, setSearchdata] = useState(''); //input value
    const [titledata, setTitledata] = useState([]); //title by handlesubmit

    const handleSubmit = async () => {
        const fetchdata = await axios("https://api.themoviedb.org/3/search/movie",
            {
                params: {
                    api_key: "",
                    query: searchdata
                }
            });
        setTitledata(fetchdata.data.results);
        console.log(fetchdata.data.results);
    }

    // rendering title after button onPress
    const render = () => {
        return titledata.map(el => {
            return (
                <Text key={el.id}> {el.original_title} </Text>
            )
        })
    }

    return (
        <View>
            <TextInput
                value={searchdata}
                onChangeText={searchdata => setSearchdata(searchdata)}
            />
            <Button onPress={handleSubmit} title="Go" />
            {render()}
        </View>
    )
};

export default Search;