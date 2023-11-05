
import {
    personaInf,
    esperienzeLavorativ,
    istruzioneEFormazion,
    ulterioriInformazion,
    competenzeOrganizzativeEGestional,
    capacitaECompetenzeRelazional,
    capacitaECompetenzeTecnich,
    altreCapacit,
    patent,
    autorizzazioneDatiPersonal,
} from '../FParagraphs/fParagraphs';//*IMPORTANT----------------------------

export const fetchData = async (sections, originalText) => {

    let data = {};

    try {// Persona Info
        data.personaInfo = await personaInf(originalText);
    } catch (error) {
        console.error("Errore durante l'esecuzione di personaInf:", error);
    }

    try {// Esperienze Lavorative
        data.esperienzeLavorative = await esperienzeLavorativ(originalText);
    } catch (error) {
        console.error("Errore durante l'esecuzione di esperienzeLavorativ:", error);
    }

    try {// Istruzione e Formazione
        data.istruzioneEFormazione = await istruzioneEFormazion(originalText);
    } catch (error) {
        console.error("Errore durante l'esecuzione di istruzioneEFormazion:", error);
    }

    try {// Ulteriori Informazioni
        data.ulterioriInformazioni = await ulterioriInformazion(originalText);
    } catch (error) {
        console.error("Errore durante l'esecuzione di ulterioriInformazion:", error);
    }

    try {// Competenze Organizzative e Gestionale
        data.competenzeOrganizzativeEGestionali = await competenzeOrganizzativeEGestional(originalText);
    } catch (error) {
        console.error("Errore durante l'esecuzione di competenzeOrganizzativeEGestional:", error);
    }

    try {// Capacita e Competenze Relazionali
        data.capacitaECompetenzeRelazionali = await capacitaECompetenzeRelazional(originalText);
    } catch (error) {
        console.error("Errore durante l'esecuzione di capacitaECompetenzeRelazional:", error);
    }

    try {// Capacita e Competenze Tecniche
        data.capacitaECompetenzeTecniche = await capacitaECompetenzeTecnich(originalText);
    } catch (error) {
        console.error("Errore durante l'esecuzione di capacitaECompetenzeTecnich:", error);
    }

    try {// Altre Capacita
        data.altreCapacita = await altreCapacit(originalText);
    } catch (error) {
        console.error("Errore durante l'esecuzione di altreCapacit:", error);
    }

    try {// Patenti
        data.patenti = await patent(originalText);
    } catch (error) {
        console.error("Errore durante l'esecuzione di patent:", error);
    }

    try {// Autorizzazione Dati Personali
        data.autorizzazioneDatiPersonali = await autorizzazioneDatiPersonal(originalText);
    } catch (error) {
        console.error("Errore durante l'esecuzione di autorizzazioneDatiPersonal:", error);
    }

    return data;
};