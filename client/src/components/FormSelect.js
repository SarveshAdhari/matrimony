const FormSelect = ({label, name, options, value, handleChange}) => {
  return (
    <div>
        {label && <label className="form-label" htmlFor={name}>{name}:</label>}
        <br/>
        <select className='form-field' name={name} value={value} onChange={handleChange} >
            {options.map((opt, index)=>{
                return <option value={opt} key={index}>{opt}</option>
            })}
        </select>
    </div>
  )
}
export default FormSelect