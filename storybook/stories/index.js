import React from 'react';
import { Text } from 'react-native';
import { StateDecorator, Store } from '@sambego/storybook-state';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import Button from './Button';
import LoadingButton from './LoadingButton';
import CenterView from './CenterView';
import Welcome from './Welcome';

const store = new Store({
  isLoading: false,
});

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .addDecorator(StateDecorator(store))
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('with text', () => (
    <Button onPress={action('clicked-text')}>
      <Text>Hello Button</Text>
    </Button>
  ))
  .add('with loading', () => (
    <LoadingButton
      onPress={() => store.set({ isLoading: !store.get('isLoading') })}
      title="Log In"
      isLoading={store.get('isLoading')}
    />
  ))
  .add('with some emoji', () => (
    <Button onPress={action('clicked-emoji')}>
      <Text>😀 😎 👍 💯</Text>
    </Button>
  ));
