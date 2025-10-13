export default function InputLogin({type, id, placeholder}) {
    return <div className="form-group">
                  <input type={type} id={id} name={id} className="form-control" placeholder={placeholder}/>
              </div>
}