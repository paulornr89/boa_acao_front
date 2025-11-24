import Select from "./Select";

export default function FieldSelect({id, label, options}) {
    return  <div className="font-bold w-full">
                <label htmlFor={id}>{label}</label>
                <Select id={id} options={options}/>
            </div>
}