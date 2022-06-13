import React from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { oneDark } from '@codemirror/theme-one-dark';

function Codemirror() {
    return (
        <div className='App'>
            <header className='App-header'>
            <CodeMirror
          placeholder="Enter your code here"
          height="400px"
          theme={oneDark}
          onChange={(value, viewUpdate) => {
            console.log('value:', value);
          }}
        />
            </header>
        </div>
      );
}

export default Codemirror