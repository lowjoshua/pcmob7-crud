import React from 'react'
import { Image } from 'react-native'

const Logo = props => (
  <Image
    source={require('../images/tudu-logo.png')}
    {...props}
  />
)

export default Logo
