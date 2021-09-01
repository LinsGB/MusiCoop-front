// Searching using Search Bar Filter in React Native List View
// https://aboutreact.com/react-native-search-bar-filter-on-listview/

// import React in our code
import React, {useState, useEffect} from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import reactotron from '../../config/Reactotron.config';

const Search = () => {
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const dados: any = [
    {
      userId: 1,
      id: 1,
      title: 'musica classica',
    },
    {
      userId: 1,
      id: 2,
      title: 'roque e rou',
    },
    {
      userId: 1,
      id: 3,
      title: 'musica incrivel',
    },
  ];
  // reactotron.debug!(dados);
  useEffect(() => {
    // fetch('https://jsonplaceholder.typicode.com/posts')
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //     reactotron.debug!(responseJson);
    //     setFilteredDataSource(responseJson);
    //     setMasterDataSource(responseJson);
    //   })

    //   .catch((error) => {
    //     console.error(error);
    //   });
    // reactotron.debug!(dados);

    setFilteredDataSource(dados);
    setMasterDataSource(dados);
  }, []);

  const searchFilterFunction = (text: any) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = masterDataSource.filter(function (item: any) {
        // Applying filter for the inserted text in search bar
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  // const ItemView = ({item}: any) => {
  //   return (
  //     // Flat List Item

  //   );
  // };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  const getItem = (item: any) => {
    // Function for click on an item
    // alert(item.title);
    setSearch(item.title);
    setRefresh(true);
    reactotron.debug!(refresh);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Escolha a categoria"></TextInput>
        <FlatList
          data={filteredDataSource}
          extraData={search}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={({item}: any) => (
            <Text style={styles.itemStyle} onPress={() => getItem(item)}>
              {item.title}
            </Text>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  itemStyle: {
    padding: 10,
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: '#C8C8C8',
    backgroundColor: '#FFFFFF',
  },
});

export default Search;
