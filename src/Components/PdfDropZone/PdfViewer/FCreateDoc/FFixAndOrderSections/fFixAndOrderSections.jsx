export const fixAndOrderSections = (sectionsArray) => {
    if (sectionsArray[0] && sectionsArray[0].sectionNumber === '') {
        sectionsArray[0].sectionNumber = '1';
    }
    const maxSectionNumber = Math.max(...sectionsArray.map(section => parseInt(section.sectionNumber) || 0), 0);
    for (let i = 1; i <= maxSectionNumber; i++) {
        if (!sectionsArray.some(section => parseInt(section.sectionNumber) === i)) {
            sectionsArray.push({ sectionNumber: i.toString(), content: ["NESSUN DATO PRESENTE"] });
        }
    }
    sectionsArray.sort((a, b) => parseInt(a.sectionNumber) - parseInt(b.sectionNumber));
    if (sectionsArray[0] && !sectionsArray[0].sectionNumber) {
        sectionsArray[0].sectionNumber = '1';
    }
    sectionsArray.forEach(section => {
        if (!section.content || section.content.length === 0) {
            section.content = ["NESSUN DATO PRESENTE"];
        }
    });
    return sectionsArray;
};