import RadioGroup from "./RadioGroup";

export default function RadioGroupLabel({text, name, options, onChange}) {
    return <div className="font-bold">
                <label>{text}</label>
                <RadioGroup name={name} options={options} onChange={onChange}/>
           </div>
}