import MainPage from '../main-page/main-page';

type AppProps = {
  availableApartments: number;
};

function App({ availableApartments }: AppProps): JSX.Element {
  return <MainPage availableApartments={availableApartments} />;
}

export default App;
