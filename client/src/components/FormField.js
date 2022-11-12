const FormField = ({label, type, value, name, handleChange}) => {
  return (
    <>
    {label && <label className="form-label" htmlFor={name}>{name}:</label>}
    <br/>
    <input 
    className='form-field' 
    name={name}
    type={type}  
    placeholder={value || name} 
    onChange={handleChange} />
    </>
  )
}
export default FormField