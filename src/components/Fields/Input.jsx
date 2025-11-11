export default function Input({type, id, placeholder, onChange}) {
    const typeDefault = type ? type : 'text';
    
    return <div className="form-group">
                  <input type={type} id={id} name={id} className="form-control bg-white" placeholder={placeholder} onChange={onChange}/>
              </div>
}