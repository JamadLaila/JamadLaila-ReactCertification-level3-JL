import  useLocalStorage  from './useLocalStorage';



const LocalStorageSetter = ()  => {
    const [value, setValue] = useLocalStorage('Key', '');


  return (
    <div style={{marginTop:'100px'}}>
        <h2>This is the Setter Component Example:</h2>
        <input style={{border: '2px solid black',borderradius: '4px'}}  type="text" value={value} onChange={(e) => setValue(e.target.value )} placeholder='Enter the value you want to store' />
    </div>
  )
};

export default LocalStorageSetter;