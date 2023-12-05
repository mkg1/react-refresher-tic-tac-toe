import { useState } from 'react';

export default function Player({initialName, symbol, isActive, onChangeName}) {
    const [isEditing, setIsEditing ] = useState(false);
    const [name, setName] = useState(initialName);

    function handleOnClick() {
        setIsEditing((editing) => !editing);

        if (isEditing) {
            onChangeName(symbol, name);
        }
    }

    function handleChange(event) {
        console.log(event)
        setName(event.target.value);
    }

    let buttonValue = "Edit"

    return (
      <li className={isActive ? 'active' :  undefined}>
        <span className="player">
            { isEditing ? <input type="text" required defaultValue={name} onChange={handleChange}/> : 
            <span className="player-name">{name}</span>
            }
            <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={handleOnClick}>{isEditing ? 'Save' : 'Edit'}</button>
      </li>

    )
};