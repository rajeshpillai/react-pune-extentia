import React, {useState} from 'react';
import './style.css';

export default function Autocomplete(props) {
  const [data, _] = useState(props.data);
  const [filteredData, setFiltered] = useState([]);
  const inputRef = React.createRef();

  const onFocus = (event) => event.target.select();

  const onChange = (e) => {
    let search = e.target.value;
    if (search.trim() == "") {
      setFiltered([]);
      return;
    }
    let result = data.filter((d) => {
      if (d.toLowerCase().startsWith(search.toLowerCase())) {
        return d;
      }
    });

    console.log("result: ", result);

    setFiltered(result);
  }

  const onSelect = (d) => {
    inputRef.current.value = d;
    props.onItemSelected(d);
    setFiltered([]);
  }

  return (
    <div>
      <input ref={inputRef} 
          onFocus={onFocus}
          onChange={onChange}
          type="text"
          placeholder = {props.placeholder}
      />

      {(filteredData && filteredData.length) > 0 && <ul className="autocomplete">
        {filteredData.map((f, i) => {
          return (
            <li tabIndex={i} key={f}><button onClick={() => onSelect(f)} href="#">{f}</button></li>
          )
        })}
      </ul>}

    </div>
  );
}