import Input from "./Input";
import Label from "./Label";
import './FieldStyle.css'

export default function InputLabel({text, type, id, placeholder}) {
    return  <div >
                <Label text={text}/>
                <Input type={type} id={id} placeholder={placeholder}/>
            </div>
}