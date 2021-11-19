import React, {useState, useEffect} from 'react';

import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
} from 'react-native';

const Search = () => {
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [showList, setShowList] = useState(false);

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

  useEffect(() => {
    setFilteredDataSource(dados);
    setMasterDataSource(dados);
  }, []);

  const searchFilterFunction = (text: any) => {
    if (text) {
      const newData = masterDataSource.filter(function (item: any) {
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
      setShowList(false);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const ItemSeparatorView = () => {
    return (
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
    setShowList(!showList);
    setSearch(item.title);
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
        {!showList ? (
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
        ) : (
          <></>
        )}
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
