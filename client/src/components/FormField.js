const FormField = ({label, type, value, name, handleChange, max}) => {
  if(type === 'date'){
    console.log(value)
    return (
      <>
      {label && <label className="form-label" htmlFor={name}>{name}:</label>}
      <br/>
      <input 
      className='form-field' 
      name={name}
      type={type}  
      value={value}
      max={max} 
      onChange={handleChange} />
      </>
    )
  }

  return (
    <>
    {label && <label className="form-label" htmlFor={name}>{name}:</label>}
    <br/>
    <input 
    className='form-field' 
    name={name}
    type={type}  
    placeholder={value} 
    onChange={handleChange} />
    </>
  )
}
export default FormField