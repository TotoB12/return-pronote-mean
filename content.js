function calculateAndDisplayMean() {
    const divs = document.querySelectorAll('div[aria-label]');

    const gradeDivs = Array.from(divs).filter(div => {
        const ariaLabel = div.getAttribute('aria-label');
        return /^ Moyenne élève : \d+(\,\d+)?$/.test(ariaLabel);
    });


    if (gradeDivs.length === 0) {
        return
    }

    let sum = 0;
    let count = 0;

    gradeDivs.forEach(div => {
        const grade = parseFloat(div.textContent.trim());
        if (!isNaN(grade)) {
            sum += grade;
            count++;
        }
    });

    const mean = count > 0 ? sum / count : 0;
    const formattedMean = mean.toFixed(2).replace('.', ',');

    const targetDiv = document.querySelector('.DonneesListe_DernieresNotes');
    if (targetDiv) {
        let meanDisplay = targetDiv.querySelector('.grade-mean-display');
        if (!meanDisplay) {
            meanDisplay = document.createElement('div');
            meanDisplay.className = 'grade-mean-display ie-titre-gros';
            targetDiv.appendChild(meanDisplay);
        }
        meanDisplay.textContent = `Moyenne générale: ${formattedMean}`;
        meanDisplay.style.fontWeight = 'bold';
        meanDisplay.style.margin = '10px';
        meanDisplay.style.color = 'red';
    }
}

calculateAndDisplayMean();