import Reactotron from 'reactotron-react-native';

declare global {
  interface Console {
    dev: (...args: any) => void;
  }
}

console.dev = () => ({});

(() => {
  if (!__DEV__) {
    return;
  }

  console.dev = function logDev(...args: any) {
    console.log(`\n============== DEBUG ==============\n\n`);
    console.log(...args);
    Reactotron.log(...args);
    console.log(`\n============== END DEBUG ==============\n\n`);
  };
})();
