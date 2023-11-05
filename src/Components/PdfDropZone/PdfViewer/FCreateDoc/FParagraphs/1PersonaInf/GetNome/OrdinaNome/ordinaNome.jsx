import React, { useState } from 'react';
import { nomiMaschili } from '../NomiMaschili/nomiMaschili'

const ListaNomi = () => {
    const nomiUnici = Array.from(new Set(nomiMaschili)).sort(); // Filtra i doppioni e ordina i nomiMaschili
    const [nomi, setNomi] = useState(nomiUnici);
    const [nomeInput, setNomeInput] = useState('');
    const aggiungiNome = () => {
        if (!nomi.includes(nomeInput)) { // Controlla se il nome non è già presente
            setNomi(prevNomi => [...prevNomi, nomeInput].sort()); // Aggiunge e riordina
        }
        setNomeInput('');
    }
    return (
        <div>
            <input
                value={nomeInput}
                onChange={e => setNomeInput(e.target.value)}
                placeholder="Inserisci un nome"
            />
            <button onClick={aggiungiNome}>Aggiungi Nome</button>
            <h3>Totale nomi: {nomi.length}</h3>
            <h2>Nomi in ordine alfabetico:</h2>
            <p>{nomi.map(nome => `"${nome}"`).join(', ')}</p>
        </div>
    );
}
export default ListaNomi;




