import Select from "./Select";
import './FieldStyle.css';

export default function FieldSelect({id, label, options}) {
    return  <div className="form-group">
                <label htmlFor={id}>{label}</label>
                <Select id={id} options={options}/>
            </div>
}