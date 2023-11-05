import React from 'react';

const LogViewer = ({ sections }) => {
    // Controllo se 'sections' è un array. Se non lo è, mostra un messaggio di errore o null.
    if (!Array.isArray(sections)) {
        console.error('sections is not an array', sections);
        return <div>Le sezioni non sono disponibili.</div>;
    }

    return (
        <div>
            {sections.map((section, index) => (
                <div key={index}>
                    <h2>Sezione {section.sectionNumber}</h2>
                    <p>{Array.isArray(section.content) ? section.content.join(' ') : section.content}</p>
                </div>
            ))}
        </div>
    );
};

export default LogViewer;
