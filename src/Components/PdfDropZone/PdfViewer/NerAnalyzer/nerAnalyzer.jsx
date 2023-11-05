// nerAnalyzer.js
import nlp from 'compromise';

export const analyzeTextWithNER = (text) => {
    const doc = nlp(text);
    const people = doc.people().out('array');  // Estrae nomi di persone
    // Aggiungi ulteriore logica per identificare altre entità se necessario
    return people;
}
