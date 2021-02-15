import React, { PureComponent } from 'react'

import {
  View,
  StyleSheet,
} from 'react-native'

//import WelcomeScreen from './Welcome'
import ApplicationScreen from '../routes'

class Root extends PureComponent {
  state = {
    loading: true,
  }

  async componentDidMount() {
    try {
      this.setState({
        loading: false
      })
    } catch(e) {}
  }

  render() {
    const {  loading } = this.state

    if (loading) return null

    return (
      <View style={styles.wrapper}>
        <ApplicationScreen />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
})

export default Root
