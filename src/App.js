import React from 'react';
import ReactDOM from 'react-dom';

export const App = () => {
  return (
    <div>
      <h1>Hello world</h1>
    </div>
  );
};

export default App;

ReactDOM.render(<App />, document.getElementById('root'));
