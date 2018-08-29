import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
  Platform,
  TouchableNativeFeedback,
} from 'react-native';
import { human } from 'react-native-typography';
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
  responsiveFontSize as fp,
} from 'react-native-responsive-dimensions';
import colors from '@constants/colors';
const Touchable = Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback;

export default class LoadingButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
    this.defaultLoadingValue = {
      width: new Animated.Value(props.viewStyle.width),
    };
  }

  defaultLoadingAnimation(start, end) {
    this.defaultLoadingValue.width.setValue(start);
    Animated.timing(this.defaultLoadingValue.width, {
      toValue: end,
      duration: this.props.animationDelay,
    }).start();
  }

  loadingContent() {
    return (
      <ActivityIndicator
        style={styles.loadingContent}
        color={this.props.activityIndicatorColor}
        size={this.props.activityIndicatorSize}
      />
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoading)
      this.defaultLoadingAnimation(this.props.viewStyle.width, this.props.whenAnimationViewWidth);
    else
      this.defaultLoadingAnimation(this.props.whenAnimationViewWidth, this.props.viewStyle.width);
  }

  defaultLoadingButton() {
    return (
      <Animated.View
        style={[
          this.props.viewStyle,
          {
            width: this.props.enableWidthAnimation
              ? this.defaultLoadingValue.width
              : this.props.viewStyle.width,
          },
        ]}>
        <Touchable
          onPress={() => {
            this.props.onPress();
          }}
          style={[
            styles.defaultLoadingTouch,
            {
              width: this.props.enableWidthAnimation
                ? styles.defaultLoadingTouch.width
                : this.props.viewStyle.width,
            },
          ]}>
          {this.props.childView || (
            <Text style={[human.headline, styles.defaultLoadingText]}>{this.props.title}</Text>
          )}
          {this.props.isLoading ? this.loadingContent() : null}
        </Touchable>
      </Animated.View>
    );
  }

  render() {
    return <View>{this.defaultLoadingButton()}</View>;
  }
}

LoadingButton.defaultProps = {
  onPress: () => {
    alert('press');
  },
  title: 'button',
  isLoading: false,
  activityIndicatorColor: colors.borderwhite,
  activityIndicatorSize: 'small',
  viewStyle: {
    width: wp(50),
    height: hp(5.5),
    backgroundColor: colors.pink,
    borderRadius: fp(0.5),
  },
  animationDelay: 200,
  whenAnimationViewWidth: wp(50),
  enableWidthAnimation: true,
};

const styles = StyleSheet.create({
  defaultLoadingTouch: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  defaultLoadingText: {
    color: colors.white,
  },
  loadingContent: { position: 'absolute', right: wp(5) },
});
