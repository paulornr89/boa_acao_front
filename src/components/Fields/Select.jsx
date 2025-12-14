import { forwardRef } from 'react';

export default forwardRef(function Select({id, options, defaultValue}, ref) {
    return <select className="form-control font-normal h-[60px] bg-white w-[300px] 
                  rounded-[10px] border border-[#68C8E8] text-[--color-content] text-lg pl-2.5 outline-none
                  hover:border-[--color-content] focus:border-[--color-content] w-full" 
                  id={id} 
                  name={id} 
                  ref={ref}
                  defaultValue={defaultValue}>
            {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
});