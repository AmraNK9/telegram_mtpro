function filterYearFromTitle(text = '') {
    let title = '';
    text = text.trim();
    if (text[text.length-1] == ")") {
        text = text.slice(0, -1)
        if (isLastFourCharsNumber(text)) {
            title = text.slice(0, -4)
            // console.log(title)
            if (title[title.length-1] == '(') {
                title = title.slice(0, -1)
                title = title.trim()
                return title;
            }
        }
    }
    if (isLastFourCharsNumber(text)) {
        title = text.slice(0, -4)
        // console.log(title)
        title = title.trim()
        return title;
    }
    return text;
}

// console.log(filterYearFromTitle("Happy Ghost 1 1984"))
// console.log(filterYearFromTitle("Happy Ghost II 1985"))
// console.log(filterYearFromTitle("Happy Ghost 1"))
// console.log(filterYearFromTitle("Happy Ghost 1 "))

// console.log(filterYearFromTitle("Happy Ghost 1 (1984)"))
// console.log(filterYearFromTitle("Happy Ghost 1 (1984) "))


function isLastFourCharsNumber(str) {
    // Extract the last 4 characters
    const lastFourChars = str.slice(-4);

    // Check if the last four characters are all numbers
    return !isNaN(lastFourChars) && lastFourChars.trim() !== '';
}

module.exports = {filterYearFromTitle}