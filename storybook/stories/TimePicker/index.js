import React from 'react';
import { View, DatePickerIOS } from 'react-native';

export default class Welcome extends React.Component {
  styles = {
    wrapper: {
      flex: 1,
      padding: 24,
      justifyContent: 'center',
    },
    header: {
      fontSize: 18,
      marginBottom: 18,
    },
    content: {
      fontSize: 12,
      marginBottom: 10,
      lineHeight: 18,
    },
  };

  render() {
    return (
      <View style={this.styles.wrapper}>
        <DatePickerIOS date={new Date()} mode="time" minuteInterval={30} />
      </View>
    );
  }
}
