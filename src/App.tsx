import { styled } from '@linaria/react';
import './App.css';
import { CurrencyConverter } from './components/CurrencyConverter';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

function App() {
  return (
    <>
      <Wrapper>
        <CurrencyConverter />
      </Wrapper>
    </>
  );
}

export default App;
