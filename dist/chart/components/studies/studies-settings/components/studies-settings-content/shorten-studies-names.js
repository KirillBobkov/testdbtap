export const shortenStudiesNames = (title) => {
    const studiesTitles = title.split(' ');
    const oneWordTitleMaxLength = 8;
    if (studiesTitles.length > 1) {
        if (studiesTitles.join('').includes('.')) {
            const studyTitleWithDot = studiesTitles.map(el => (el.includes('.') ? el : el.charAt(0).toUpperCase()));
            return studyTitleWithDot.join('');
        }
        else {
            const tempTitles = [];
            studiesTitles.forEach(el => {
                if ((el.includes('(') && el.includes(')')) || (el.toUpperCase() === el && el.length === 2)) {
                    tempTitles.push(el);
                }
                else {
                    tempTitles.push(el.charAt(0).toUpperCase());
                }
            });
            return tempTitles.join('');
        }
    }
    if (studiesTitles.length === 1) {
        const tempElements = [];
        if (studiesTitles.includes('/')) {
            tempElements.push();
            studiesTitles[0].split('/').forEach(word => {
                tempElements.push(word[0].charAt(0).toUpperCase());
            });
            return tempElements.join('/');
        }
        else {
            if (studiesTitles.join('').length > oneWordTitleMaxLength) {
                studiesTitles[0] = studiesTitles[0].replace(/[a-z]/g, '');
                return studiesTitles[0];
            }
            else {
                return studiesTitles.join('');
            }
        }
    }
    return title;
};
