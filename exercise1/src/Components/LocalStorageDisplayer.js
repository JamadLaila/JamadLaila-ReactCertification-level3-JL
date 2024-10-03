import  useLocalStorage  from './useLocalStorage';

import React from 'react'

const LocalStorageDisplayer = () => {
    const [value] = useLocalStorage('Key', '');


  return (
    <div style={{marginTop:'100px'}}>
        <h2>This is the displayer Example: </h2>
        <p>Current Value :<b>{value}</b> </p>
    </div>
  )
}


export default LocalStorageDisplayer