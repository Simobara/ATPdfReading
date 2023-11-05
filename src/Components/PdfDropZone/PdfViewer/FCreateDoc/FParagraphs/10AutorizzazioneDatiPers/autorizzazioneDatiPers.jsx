import { Paragraph, TextRun } from 'docx';

const extractAutDatPer = (origText) => {
    const keywords = [
        "Autorizzazione Dati Personali", "Declaration", "Permessi", "Consensi", "Concessioni", "Licenze", "Approvazioni", "Assensi", "Validazioni", "Ratifiche", "Sanzioni", "Abilitazioni"
    ];

    // Prova a cercare fino a "2003"
    let regex = new RegExp(`(${keywords.join("|")})([^]*?2003)`, "i");
    let match = origText.match(regex);

    if (!match) {
        // In alternativa, prova a cercare fino a "GDPR"
        regex = new RegExp(`(${keywords.join("|")})([^]*?GDPR)`, "i");
        match = origText.match(regex);
    }

    if (!match) {
        // Se non trovi nessuno dei due, usa la logica originale
        regex = new RegExp(`(${keywords.join("|")})([^.]*\\.)`, "i");
        match = origText.match(regex);
    }

    if (match) {
        return match[2].trim();
    }

    return null;
};

const extractAutDatPerSection = (origText) => {
    const keywords = [
        "Autorizzazione Dati Personali", "Declaration", "Permessi", "Consensi", "Concessioni", "Licenze", "Approvazioni", "Assensi", "Validazioni", "Ratifiche", "Sanzioni", "Abilitazioni"
    ];

    const sections = origText.split(/\n\s*\n/);

    for (const section of sections) {
        for (const keyword of keywords) {
            if (section.trim().startsWith(keyword)) {
                return section.trim();
            }
        }
    }

    return null;
};

export const getAutDatPer = async (origText) => {
    let autDatPer = await extractAutDatPer(origText);
    if (!autDatPer) {
        autDatPer = await extractAutDatPerSection(origText);
    }

    console.log("Dati personali trovati:", autDatPer);

    return new Paragraph({
        alignment: "left",
        children: [
            new TextRun(`Autorizzazione Dati Personali: ${autDatPer ? autDatPer : " / NON CONCESSA "}`)
        ]
    });
};

