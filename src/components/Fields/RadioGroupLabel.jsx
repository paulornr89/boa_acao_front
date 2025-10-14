import RadioGroup from "./RadioGroup";

export default function RadioGroupLabel({text, name, options}) {
    return <div className="form-group">
                <label>{text}</label>
                <RadioGroup name={name} options={options}/>
           </div>
}