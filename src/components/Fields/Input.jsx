import { forwardRef } from 'react';

export default forwardRef(function Input({type, id, placeholder, onChange, defaultValue}, ref) {
    const typeDefault = type ? type : 'text';
    
    return <div className="form-group">
                  <input 
                        className="form-control font-medium h-[60px] bg-white w-[300px] 
                  rounded-[10px] border border-[#68C8E8] text-[--color-content] text-lg pl-2.5 outline-none
                  hover:border-[--color-content] focus:border-[--color-content] w-full" 
                        type={type} 
                        id={id} name={id} 
                        placeholder={placeholder} 
                        ref={ref} 
                        defaultValue={defaultValue}
                        onChange={onChange}/>
              </div>
});