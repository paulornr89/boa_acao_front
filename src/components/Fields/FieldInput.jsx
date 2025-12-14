import Input from "./Input";
import Label from "./Label";
import './FieldStyle.css';
import { forwardRef } from 'react';

export default forwardRef(function InputLabel({text, type, id, placeholder, defaultValue}, ref)  {
    return  <div className="w-full">
                <Label text={text}/>
                <Input type={type} id={id} placeholder={placeholder} defaultValue={defaultValue} ref={ref} />
            </div>
});