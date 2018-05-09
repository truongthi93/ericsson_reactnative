/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {
  StackNavigator
} from 'react-navigation';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Content,
  Dimensions,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
  NavigatorIOS,
  ScrollView,
  HttpUtil,
  ActivityIndicator,
  ListView,
} from 'react-native';

class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Login',
    headerStyle: {
      backgroundColor: 'white',
    },
    headerTitleStyle: {
      color: 'transparent',
    },
  };

  constructor(props) {
    super(props);
    this.state = { password: 'Input pass', email: 'Input email' };
  }

  checkLogin(props) {
    if (props.email == '') {
      Alert.alert('Please input name');
      //console.log('1212121');
    } else {
      if (props.password == '') {
        Alert.alert('Please input password');
      } else {
        Alert.alert('OK');
      }
    }
  }

  render() {
    const { width, height } = Dimensions.get('window')
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'column',
      },
      viewPartBig: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
      },
      viewPartInput: {
        height: 90,
        backgroundColor: 'transparent',
        flexDirection: 'column'
      },
      viewPartSmall: {
        flex: 2,
        backgroundColor: 'transparent',
        flexDirection: 'column'
      },
      imageLogo: {
        width: width / 3,
        height: height / 9,
        marginTop: 52,
      },
      inputNamePassWord: {
        height: 35,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 10,
        marginLeft: 15,
        marginRight: 15,
        flex: 1,
      },
      viewSocialLogin: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
      },
      forgorPasswordText: {
        fontSize: 12,
        fontWeight: 'normal',
        color: 'blue',
        marginTop: 5,
        marginRight: 15,
        textAlign: 'right',
      },
      registerText: {
        fontSize: 12,
        fontWeight: 'normal',
        color: 'black',
        marginTop: 5,
        textAlign: 'center',
      },
      viewButtonSignIn: {
        backgroundColor: 'green',
        marginLeft: 15,
        marginRight: 15,
        marginTop: 10,
      },
      viewRegister: {
        height: 40,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
      },
      imageSocial: {
        width: 40,
        height: 40,
        marginLeft: 5,
        marginRight: 5,
      },
    });



    return (
      <ImageBackground
        source={require('./images/background.png')}
        style={{ width: '100%', height: '100%' }}>
        <View style={styles.container}>
          <View style={styles.viewPartBig}>
            <Image source={require('./images/logo.png')}
              style={styles.imageLogo}>
            </Image>
          </View>
          <View style={styles.viewPartInput}>
            <TextInput
              style={styles.inputNamePassWord}
              onChangeText={(text) => this.setState({ text })}
              value={this.state.email}
            />
            <TextInput
              style={styles.inputNamePassWord}
              onChangeText={(text) => this.setState({ text })}
              value={this.state.password}
            />
          </View>
          <View style={styles.viewPartSmall}>
            <Text style={styles.forgorPasswordText}>Forgot your password</Text>
            <View style={styles.viewButtonSignIn}>
              <Button
                title="LOGIN"
                color="white"
                accessibilityLabel="Tap Data"
                onPress={() => {
                  this.props.navigation.navigate('Home')
                }
                }
              />
            </View>
            <View style={styles.viewRegister}>
              <Text style={styles.registerText}>Dont't have an account?</Text>
              <Text style={styles.forgorPasswordText}>Register</Text>
            </View>
            <Text style={styles.registerText}>---OR---</Text>
          </View>
          <View style={styles.viewPartSmall}>
            <View style={styles.viewSocialLogin}>
              <Image source={require('./images/facebook.png')}
                style={styles.imageSocial}>
              </Image>
              <Image source={require('./images/google.png')}
                style={styles.imageSocial}>
              </Image>
              <Image source={require('./images/twice.png')}
                style={styles.imageSocial}>
              </Image>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
};

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
    headerStyle: {
      backgroundColor: 'white',
    },
    headerTitleStyle: {
      color: 'blue',
    },
  };

  render() {
    const { width, height } = Dimensions.get('window')
    return (
      <View style={{ marginTop: 22, flex: 1, flexDirection: 'column' }}>
        <View style={{ height: 40, alignItems: 'center', justifyContent: 'center' }}>
          {/* <Button
            title="Go back to Login"
            onPress={() => this.props.navigation.goBack()}
          /> */}
          <Button
            title="View list Field"
            onPress={() => {
              this.props.navigation.navigate('FieldList')
            }
            }
          />
        </View>
        <ScrollView>
          <Image source={require('./images/map.png')} style={{ height: 210, width: width }} />
          <Image source={require('./images/weather.png')} style={{ height: 170, width: width }} />
          <Image source={require('./images/8days.png')} style={{ height: 170, width: width }} />
          <Text style={{ fontSize: 23, marginLeft: 20 }}>Advice</Text>
          <Image source={require('./images/advice.png')} style={{ height: 200, width: width, marginLeft: 20 }} />
        </ScrollView>
      </View>
    );
  }
}

class ListFieldScreen extends React.Component {
  static navigationOptions = {
    title: 'CallAPI show in listView',
    headerStyle: {
      backgroundColor: 'white',
    },
    headerTitleStyle: {
      color: 'blue',
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {
    return fetch('https://facebook.github.io/react-native/movies.json')
      .then((response) => response.json())
      .then((responseJson) => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson.movies),
        }, function() {
          // do something with new state
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1}}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={{flex: 1}}>
        <ListView
          style={{backgroundColor:'white'}}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => 
          <View style={{height: 44, marginLeft: 20, marginRight: 20 , marginTop: 20 ,backgroundColor: "red"}}>
            <Text style={{ color: 'white', fontSize: 15, fontWeight: 'normal', marginLeft: 10}}>From Year: {rowData.releaseYear}</Text>
            <Text style={{ color: 'yellow', fontSize: 20, fontWeight: 'bold', marginLeft: 20}}>Field Name: {rowData.title}</Text>
            <View style={{height: 10, backgroundColor: "white"}}>   
            </View>
          </View>
        }
        />
      </View>
    );
  }
}
const RootStack = StackNavigator(
  {
    Login: {
      screen: LoginScreen,
    },
    Home: {
      screen: HomeScreen,
    },
    FieldList: {
      screen: ListFieldScreen,
    },
  },
  {
    initialRouteName: 'Login',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

