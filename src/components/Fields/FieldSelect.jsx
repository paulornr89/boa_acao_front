import Select from "./Select";
import './FieldStyle.css';

export default function FieldSelect({id, label, options}) {
    return  <div class="form-group">
                <label for={id}>{label}</label>
                <Select id={id} options={options}/>
            </div>
}