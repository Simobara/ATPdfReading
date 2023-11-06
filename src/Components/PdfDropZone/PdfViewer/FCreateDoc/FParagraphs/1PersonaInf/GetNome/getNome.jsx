import { Paragraph, TextRun } from 'docx';
import { nomiMaschili } from './NomiMaschili/nomiMaschili';
import { nomiFemminili } from './NomiFemminili/nomiFemminili';
import nlp from 'compromise';

const allNamesSet = new Set([...nomiMaschili, ...nomiFemminili].map(name => name.toLowerCase()));

const nameKeywords = ["nome", "name", "cognome", "surname", "sobrenome", "apellido"];

const analyzeTextWithNER = (text) => {
    const doc = nlp(text);
    const names = doc.people().out('array').filter(name => {
        const nameParts = name.split(' ').map(part => part.toLowerCase().trim());
        return nameParts.some(part => allNamesSet.has(part));
    });
    // console.log("Nomi riconosciuti (NER):", names);
    return names;
};

const extractNomeFromKeywords = (text) => {
    for (let keyword of nameKeywords) {
        const regex = new RegExp(`\\b${keyword}\\b\\s+(\\w+(?:\\s+\\w+)?)`, "i");
        const match = text.match(regex);
        if (match && match[1]) {
            const possibleNameParts = match[1].split(' ').map(part => part.toLowerCase().trim());
            if (possibleNameParts.some(part => allNamesSet.has(part))) {
                // console.log("Nome estratto dalle parole chiave:", match[1]);
                return match[1];
            }
        }
    }
    return null;
};

const extractFullNameFromNER = (text, firstName) => {
    // Divide il testo in base al nome trovato
    const parts = text.split(new RegExp(`\\b${firstName}\\b`, 'i'));
    const lastNameBefore = parts[0].trim().split(/\s+/).pop();
    const lastNameAfter = parts.length > 1 ? parts[1].match(/\b(\w{3,})/) : null;
    if (lastNameBefore && lastNameBefore.length >= 3 && allNamesSet.has(lastNameBefore.toLowerCase())) {// Controllo Cognome appare prima del nome e ha almeno 3 lettere
        return `${lastNameBefore} ${firstName}`;
    }
    if (lastNameAfter && lastNameAfter[1] && lastNameAfter[1].length >= 3) {// Controllo se il cognome appare dopo il nome e ha almeno 3 lettere
        return `${firstName} ${lastNameAfter[1]}`;
    }
    return firstName; // Se non viene trovato un cognome, restituisce solo il nome
};

const extractNome = (text) => {
    const validNames = analyzeTextWithNER(text);
    for (const firstName of validNames) {
        const fullName = extractFullNameFromNER(text, firstName);
        if (fullName) {
            return fullName;
        }
    }
    const nomeCognome = extractNomeFromKeywords(text);
    if (nomeCognome) {
        return nomeCognome;
    }
    return null;
};



// ------------------------------------------------------------OUTPUT
export const getNome = async (text) => {
    const nomeCognome = extractNome(text);
    console.log(`NOME COGNOME: ${nomeCognome ? nomeCognome : " nd "}`);
    if (!nomeCognome) {
        return null;
    }
    return new Paragraph({
        alignment: "left",
        children: [new TextRun(`Nome Cognome: ${nomeCognome}`)]
    });
};
