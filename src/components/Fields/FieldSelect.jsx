import Select from "./Select";
import { forwardRef } from 'react';

export default forwardRef(function FieldSelect({id, label, options, defaultValue}, ref) {
    return  <div className="font-bold w-full">
                <label htmlFor={id}>{label}</label>
                <Select id={id} options={options} ref={ref} defaultValue={defaultValue}/>
            </div>
});