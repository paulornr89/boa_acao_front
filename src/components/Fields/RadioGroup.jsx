import RadioOption from "./InputRadioLabel";
import './FieldStyle.css'

export default function RadioGroup({name, options}) {
    return <div class="list-radio">
        {
            options.map((option) => <RadioOption key={option.id} id={option.id} name={name} value={option.value} text={option.text}/>)
        }
    </div>
}