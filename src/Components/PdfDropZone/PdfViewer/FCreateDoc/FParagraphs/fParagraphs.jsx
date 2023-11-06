import { Paragraph, TextRun } from 'docx';

//SEZIONE 1
import { getNome } from './1PersonaInf/GetNome/getNome';                                    // OKK
import { getTel } from './1PersonaInf/GetTelefono/getTelefono';                             // OKK
// -------------------------------------------------------------
import { getPro } from './1PersonaInf/1GetProfilo/getProfilo';                              //IMPLEMENTARE
import { getDob } from './1PersonaInf/2GetDob/getDob';                                      // OKK
import { getNaz } from './1PersonaInf/3GetNazionalita/getNazionalita';                      // OKK
import { getLoc } from './1PersonaInf/4GetLocalita/getLocalita';                            // OKK
//SEZIONE 2
import { getEspLav } from './2EsperienzeLavorativ/esperienzeLavorative'
//SEZIONE 3
import { getIstEFor } from './3IstruzioneEFormazion/istruzioneEFormazione';
//SEZIONE 4
import { getUltInf } from './4UlterioriInformazion/ulterioriInformazioni';
//SEZIONE 5
import { getComOrgEGes } from './5CompetenzeOrganizzativeEGestional/competenzeOrgEGes';
//SEZIONE 6
import { getCapEComRel } from './6CapacitaECompetenzeRelazional/capacitaEComRel';
//SEZIONE 7
import { getCapEComTec } from './7CapacitaECompetenzeTecnich/capacitaECompetenzeTecniche';
//SEZIONE 8
import { getAltCap } from './8AltreCapacit/altreCapacita';                                  // OKK
import { createTable } from './8AltreCapacit/FCreazioneTabella/fCreazioneTabella'
//SEZIONE 9
import { getPat } from "./9Patent/patente";                                                 // OKK
//SEZIONE 10
import { getAutDatPer } from "./10AutorizzazioneDatiPers/autorizzazioneDatiPers";           // OKK



// ---------------------------------------------------------------------MAIN
//SEZIONE 1
export const personaInf = async (sect1, fullText) => {
    const results = [];
    const searchFunctions = [
        { func: getNome, label: "NomeCognome" },
        { func: getTel, label: "Telefono" },
        // -------------------------------------
        { func: getPro, label: "Professione" },
        { func: getDob, label: "DataDiNascita" },
        { func: getNaz, label: "Nazionalità" },
        { func: getLoc, label: "Località" }
    ];
    for (const { func, label } of searchFunctions) {
        try {
            let result = await func(sect1);
            if (!result) {
                result = await func(fullText);
                if (!result) {
                    result = new Paragraph({
                        alignment: "left",
                        children: [new TextRun(`${label}: nd`)]
                    });
                }
            }
            results.push(result);
        } catch (error) {
            console.error(`Errore recupero info con funzione ${func.name}:`, error);
            results.push(new Paragraph({
                alignment: "left",
                children: [new TextRun(`${label}: nd`)]
            }));
        }
    }
    return results;
};

//SEZIONE 2
export const esperienzeLavorativ = async (text) => {
    try {
        return [await getEspLav(text)];
    } catch (error) {
        console.error('Errore nel recupero delle esperienze lavorative:', error);
        return [null];
    }
}

//SEZIONE 3
export const istruzioneEFormazion = async (text) => {
    try {
        return [await getIstEFor(text)];
    } catch (error) {
        console.error('Errore nel recupero dell’istruzione e formazione:', error);
        return [null];
    }
}

//SEZIONE 4
export const ulterioriInformazion = async (text) => {
    try {
        return [await getUltInf(text)];
    } catch (error) {
        console.error('Errore nel recupero delle ulteriori informazioni:', error);
        return [null];
    }
}

//SEZIONE 5
export const competenzeOrganizzativeEGestional = async (text) => {
    try {
        return [await getComOrgEGes(text)];
    } catch (error) {
        console.error('Errore nel recupero delle competenze organizzative e gestionali:', error);
        return [null];
    }
}

//SEZIONE 6
export const capacitaECompetenzeRelazional = async (text) => {
    try {
        return [await getCapEComRel(text)];
    } catch (error) {
        console.error('Errore nel recupero delle capacità e competenze relazionali:', error);
        return [null];
    }
}

//SEZIONE 7
export const capacitaECompetenzeTecnich = async (text) => {
    try {
        return [await getCapEComTec(text)];
    } catch (error) {
        console.error('Errore nel recupero delle capacità e competenze tecniche:', error);
        return [null];
    }
}

//SEZIONE 8
export const altreCapacit = async (fullText) => {
    try {
        let elements = await getAltCap(fullText);
        if (!elements || elements.length === 0) {
            elements = [createTable()];
        }
        return elements;
    } catch (error) {
        console.error('Errore nel recupero delle altre capacità:', error);
    }
};

//SEZIONE 9
export const patent = async (sect9, fullText) => {
    try {
        let result = await getPat(sect9);
        if (!result) {
            result = await getPat(fullText);
            if (!result) {
                result = new Paragraph({
                    alignment: "left",
                    children: [new TextRun("Patente: nd")]
                });
            }
        }
        return [result];
    } catch (error) {
        console.error('Errore nel recupero della patente:', error);
        return [new Paragraph({
            alignment: "left",
            children: [new TextRun("Patente: nd")]
        })];
    }
};

//SEZIONE 10
export const autorizzazioneDatiPersonal = async (sect10, fullText) => {
    try {
        let result = await getAutDatPer(sect10);
        if (!result) {
            result = await getAutDatPer(fullText);
            if (!result) {
                result = new Paragraph({
                    alignment: "left",
                    children: [new TextRun("Autorizzazione Dati Personali: nd")]
                });
            }
        }
        return [result];
    } catch (error) {
        console.error('Errore nel recupero dell autorizzazioni dati personali:', error);
        return [new Paragraph({
            alignment: "left",
            children: [new TextRun("Autorizzazione Dati Personali: nd")]
        })];
    }
}
