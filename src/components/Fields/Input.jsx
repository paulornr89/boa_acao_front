export default function Input({type, id, placeholder}) {
    const typeDefault = type ? type : 'text';
    
    return <div className="form-group">
                  <input type={type} id={id} name={id} className="form-control" placeholder={placeholder}/>
              </div>
}