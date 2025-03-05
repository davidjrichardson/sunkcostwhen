import { useState } from 'react';
import './suno-button.css';

function SunoButton() {
    const [showSuno, setShowSuno] = useState(false);

    return (
        <button className="suno-button" onClick={() => setShowSuno(!showSuno)}>
            {showSuno ? 'Suno' : 'Sunk'}
        </button>
    );
}

export { SunoButton };
