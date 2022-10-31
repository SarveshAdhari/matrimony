const FormField = ({type, value, name, handleChange}) => {
  return (
    <input 
    className='form-field' 
    name={name}
    type={type}  
    placeholder={value || name} 
    onChange={handleChange} />
  )
}
export default FormField