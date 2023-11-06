import { Paragraph, Table, TableRow, TableCell, WidthType, TextRun } from 'docx';
import { recoverDatas } from '../altreCapacita';

export const createTable = () => {
    const cellWidth = 1300; // Larghezza delle celle in twips (1/20 di un punto tipografico)
    const numCells = 8; // Numero di celle nella tabella
    const tableWidth = cellWidth * numCells; // Calcola la larghezza totale della tabella

    const cellsText = [
        'Lingua',
        'Comprensione',
        'Parlato',
        'Scritto',
        'Ascolto',
        'Lettura',
        'Interazione Orale',
        'Produzione Orale'
    ];
    // const cellsTextIns = [
    //     'Ins1',
    //     'Ins2',
    //     'Ins3',
    //     'Ins4',
    //     'Ins5',
    //     'Ins6',
    //     'Ins7',
    //     'Ins8'
    // ];

    const createHeaderRow = (texts) => new TableRow({
        children: texts.map(text => new TableCell({
            children: [new Paragraph({
                children: [new TextRun({
                    text: text,
                    bold: true
                })]
            })],
            width: {
                size: cellWidth,
                type: WidthType.DXA
            }
        }))
    });

    const createDataRow = (texts) => new TableRow({
        children: texts.map(text => new TableCell({
            children: [new Paragraph({
                children: [new TextRun({
                    text: text,
                })]
            })],
            width: {
                size: cellWidth,
                type: WidthType.DXA
            }
        }))
    });

    const headerRow = createHeaderRow(cellsText);
    const secondRow = createDataRow(recoverDatas());//* IMP-------------------

    return new Table({
        rows: [headerRow, secondRow], // Aggiungi la seconda riga alla tabella
        width: {
            size: tableWidth,
            type: WidthType.DXA
        },
        layout: 'fixed'
    });
};
