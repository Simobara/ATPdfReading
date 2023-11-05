import { Paragraph, TextRun } from 'docx';
import nlp from 'compromise';

const keywords = [
    "affiliation", "allegiance", "appartenenza", "belongingness", "cittadinanza", "citizenship", "civics", "cultura", "enfranchisement", "etnia", "identità", "membership", "national identity", "nationality", "naturalization", "origine", "patriotism", "provenienza", "razza"
];
const nationalities = [
    "American", "Andorran", "Australian", "Austrian", "Basque", "Belgian", "Breton", "British", "Canadian", "Catalan", "Corsican", "Cypriot", "Danish", "Dutch", "Faroese", "Finnish", "French", "German", "Greek", "Guernsey", "Icelandic", "Irish", "Italian", "Jersey", "Liechtensteiner", "Luxembourger", "Maltese", "Manx", "Monégasque", "New Zealander", "Northern Irish", "Norwegian", "Portuguese", "San Marinese", "Scottish", "Spanish", "Swedish", "Swiss", "Vatican", "Welsh"
];
const nazionalitaMaschile = [
    "Americano", "Andorrano", "Australiano", "Austriaco", "Basco", "Belga", "Bretone", "Britannico", "Canadese", "Catalano", "Corso", "Cipriota", "Danese", "Olandese", "Faroese", "Finlandese", "Francese", "Tedesco", "Greco", "Guernsey", "Islandese", "Irlandese", "Italiano", "Jersista", "Liechtensteinese", "Lussemburghese", "Maltese", "Manxese", "Monegasco", "Neo-zelandese", "Nord-irlandese", "Norvegese", "Portoghese", "Sammarinese", "Scozzese", "Spagnolo", "Svedese", "Svizzero", "Vaticanense", "Gallese"
];
const nazionalitaFemminile = [
    "Americana", "Andorrana", "Australiana", "Austriaca", "Basca", "Belga", "Bretone", "Britannica", "Canadese", "Catalana", "Corsa", "Cipriota", "Danese", "Olandese", "Faroese", "Finlandese", "Francese", "Tedesca", "Greca", "Guernsey", "Islandese", "Irlandese", "Italiana", "Jersista", "Liechtensteinese", "Lussemburghese", "Maltese", "Manxese", "Monegasca", "Neo-zelandese", "Nord-irlandese", "Norvegese", "Portoghese", "Sammarinese", "Scozzese", "Spagnola", "Svedese", "Svizzera", "Vaticanense", "Gallese"
];


const extractNazionalitaWithNLP = (text) => {
    const allNationalities = [...nationalities, ...nazionalitaMaschile, ...nazionalitaFemminile];
    const foundNations = [];
    allNationalities.forEach(nation => {
        if (nlp(text).match(nation).found) {
            foundNations.push(nation);
        }
    });
    return foundNations.length > 0 ? foundNations.join("-") : null;
}


const extractNazionalita = (origText) => {
    const isSimilarNation = (word) => {
        const firstFourLetters = word.substring(0, 4).toLowerCase();
        const allNationalities = [...nationalities, ...nazionalitaMaschile, ...nazionalitaFemminile];
        return allNationalities.some(nation => nation.toLowerCase().startsWith(firstFourLetters));
    };
    const regex = new RegExp(`\\b(${keywords.join("|")})\\s+(\\w+)`, "ig");
    let foundNazionalities = [];
    let match = regex.exec(origText);
    while (match !== null) {
        const possibleNation = match[2];
        if (nationalities.includes(possibleNation) ||
            nazionalitaMaschile.includes(possibleNation) ||
            nazionalitaFemminile.includes(possibleNation) ||
            isSimilarNation(possibleNation)) {
            foundNazionalities.push(possibleNation);
        }
        match = regex.exec(origText);
    }
    return foundNazionalities.length > 0 ? foundNazionalities.join("-") : null;
}



export const getNaz = async (origText) => {
    let nazionalita = await extractNazionalita(origText);
    if (!nazionalita) {
        nazionalita = extractNazionalitaWithNLP(origText);
    }
    console.log(`NAZIONALITA: ${nazionalita ? nazionalita : "nd "}`);
    return new Paragraph({
        alignment: "left",
        children: [
            new TextRun(`Nazionalità: ${nazionalita ? nazionalita : " / "}`)
        ]
    });
};




