import * as React from 'react';
import { YellowBox, StatusBar } from 'react-native';
import Routes from './src/routes';
YellowBox.ignoreWarnings([
  'Failed prop type'
])
export default function App() {
  return (
    <>
    <StatusBar backgroundColor="#22262b"/>
    <Routes/>
    </>
  );
}