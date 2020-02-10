import React, {useState} from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, TextInput, ScrollView, Image, TouchableHighlight, Modal} from 'react-native';

export default function App() {
  const apiurl = 'http://www.omdbapi.com/?apikey=63df5a0b';
  const [state, setState] = useState({
    s: "Enter a movie...",
    results: [],
    selected: {}
  });

  const search = () => {
    axios(apiurl + "&s=" +  state.s)
    .then(({data}) => {
      let results = data.Search;
      setState(prevState => {
        return {...prevState, results: results}
      })
    })
  }

  const openPopup = (id) => {
    axios(apiurl + "&i=" + id)
    .then(({data}) => {
      let result = data;

      console.log(result)
      setState(prevState => {
        return {...prevState, selected: result}
      })
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Movie Base</Text>
      <TextInput 
      style={styles.searchbox} 
      value={state.s}
      onChangeText={text => setState(prevState => {
        return {...prevState, s: text}
      })}
      onSubmitEditing={search}>
      </TextInput>

      <ScrollView style={StyleSheet.results}>
        {state.results.map(result => (

          <TouchableHighlight 
          key={result.imdbID} 
          onPress={() => openPopup(result.imdbID)}
          >
            <View key={result.imdbID} style = {styles.result}>
              <Text style = {styles.heading}>
                {result.Title}
              </Text>
                <Image source={{uri: result.Poster}} style={{
                  width: '100%',
                  height: 340,
                  borderRadius: 6,
                }}
                resizeMode="cover"></Image>
              

              
            </View>

          </TouchableHighlight>
        ))}
      </ScrollView>
      <Modal 
      animationType="fade"
      transparent={false}
      visible={(typeof state.selected.Title !=  "undefined")}
      >

        <View style={styles.popup}>        
          <Text style={styles.poptitle}>{state.selected.Title}</Text>
          <Text style={styles.poprating}>Rating: {state.selected.imdbRating}</Text>
          <Text style = { styles.poptext}>{state.selected.Plot}</Text>
        </View>

        <TouchableHighlight onPress={() => setState(prevState => {
          return {...prevState, selected: {}}
        })}>
            <Text style = {styles.closeBtn}>Close</Text>
        </TouchableHighlight>

      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2e2e2e',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'left', 
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  searchbox: {
    fontSize: 18,
    fontWeight: '300',
    paddingLeft: 24,
    paddingTop: 8,
    paddingRight: 24,
    paddingBottom: 8,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 40,
  },
  results: {
    flex: 1,
  },
  result: {
    flex: 1,
    width: '100%',
    marginBottom: 20,
  },
  heading: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 5,
  },
  popup: {
    padding: 20,
    backgroundColor: '#2e2e2e',
  },
  poptitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 5,
    color: '#fff'
  },
  closeBtn: {
    padding: 20,
    fontSize: 20,
    fontWeight: '700',
    backgroundColor: '#191414',
    color: '#fff',
  },
  poptext: {
    color: '#fff',
  },
  poprating: {
    color: '#fff',
    marginBottom: 20,
  }

});
