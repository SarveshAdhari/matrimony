const FormField = ({type, value, name, handleChange}) => {
  return (
    <input 
    className='form-field' 
    type={type}  
    placeholder={value || name} 
    onChange={handleChange} />
  )
}
export default FormField