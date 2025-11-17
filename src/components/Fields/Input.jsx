export default function Input({type, id, placeholder, onChange}) {
    const typeDefault = type ? type : 'text';
    
    return <div className="form-group">
                  <input type={type} id={id} name={id} className="form-control font-medium h-[60px] bg-white w-[300px] 
                  rounded-[10px] border border-[#68C8E8] text-[#3C474D] font-light text-lg pl-[10px] outline-none
                  hover:border-[#3C474D] focus:border-[#3C474D]" placeholder={placeholder} onChange={onChange}/>
              </div>
}