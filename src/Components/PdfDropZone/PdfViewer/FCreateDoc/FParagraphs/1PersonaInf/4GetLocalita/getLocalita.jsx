import { Paragraph, TextRun } from 'docx';
import nlp from 'compromise';

const keywords = [
    "città", "residenza", "località", "vivo a", "situato a", "ubicato a", "residente a", "address"
];

const extractLocalitaWithNLP = (text) => {
    let foundLocalita = null;
    for (let keyword of keywords) {
        if (nlp(text).match(keyword).found) {
            const sentences = nlp(text).sentences().out('array');
            for (let sentence of sentences) {
                if (sentence.includes(keyword)) {
                    const words = sentence.split(' '); // Estrae la parola successiva alla parola chiave come possibile località.
                    const keywordIndex = words.indexOf(keyword);
                    if (keywordIndex !== -1 && keywordIndex + 1 < words.length) {
                        foundLocalita = words[keywordIndex + 1];
                        break;
                    }
                }
            }
        }
        if (foundLocalita) break;
    }
    return foundLocalita;
};

const extractLocalita = (origText) => {
    // Prima si cerca con il metodo regex standard
    for (let keyword of keywords) {
        const regex = new RegExp(`\\b${keyword}\\b\\s+(\\w+(?:\\s+\\w+){0,4})`, "i"); // parola chiave seguita da 1-5 parole
        const match = origText.match(regex);
        if (match && match[1]) {
            // Prendi la prima parola dopo la parola chiave come possibile località
            return match[1].split(' ')[0];
        }
    }

    // Se non si trova nulla, si esegue una ricerca hardcoded per una o due parole dopo la keyword
    for (let keyword of keywords) {
        const hardcodedRegex = new RegExp(`${keyword}\\s+(\\S+)(?:\\s+(\\S+))?`, "i"); // Cerca la keyword e prendi le prossime 1 o 2 parole
        const hardcodedMatch = origText.match(hardcodedRegex);
        if (hardcodedMatch && hardcodedMatch[1]) {
            // Restituisce la prima parola o le prime due parole successive alla keyword
            return hardcodedMatch[1] + (hardcodedMatch[2] ? ` ${hardcodedMatch[2]}` : '');
        }
    }
    return null;
};


export const getLoc = async (origText) => {
    let localita = await extractLocalita(origText);
    if (!localita) {
        localita = extractLocalitaWithNLP(origText);
    }
    console.log(`LOCALITA: ${localita ? localita : " nd "}`);
    return new Paragraph({
        alignment: "left",
        children: [
            new TextRun(`Localita: ${localita ? localita : " / "}`)
        ]
    });
};
