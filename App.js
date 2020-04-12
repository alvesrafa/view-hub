import * as React from 'react';
import { YellowBox } from 'react-native';
import Routes from './src/routes';
YellowBox.ignoreWarnings([
  'Failed prop type'
])
export default function App() {
  return (
    <>
    <Routes/>
    </>
  );
}