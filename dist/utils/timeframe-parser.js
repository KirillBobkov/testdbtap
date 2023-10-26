const validValues = [
    {
        value: 'y',
        type: 'y',
    },
    {
        value: 'Y',
        type: 'y',
    },
    {
        value: 'year',
        type: 'y',
    },
    {
        value: 'M',
        type: 'mo',
    },
    {
        value: 'month',
        type: 'mo',
    },
    {
        value: 'W',
        type: 'w',
    },
    {
        value: 'w',
        type: 'w',
    },
    {
        value: 'week',
        type: 'w',
    },
    {
        value: 'D',
        type: 'd',
    },
    {
        value: 'd',
        type: 'd',
    },
    {
        value: 'day',
        type: 'd',
    },
    {
        value: 'h',
        type: 'h',
    },
    {
        value: 'H',
        type: 'h',
    },
    {
        value: 'hour',
        type: 'h',
    },
    {
        value: 'm',
        type: 'm',
    },
    {
        value: 'min',
        type: 'm',
    },
    {
        value: 'minutes',
        type: 'm',
    },
    {
        value: '',
        type: 'm',
    },
    {
        value: 's',
        type: 's',
    },
    {
        value: 'S',
        type: 's',
    },
    {
        value: 'sec',
        type: 's',
    },
    {
        value: 'seconds',
        type: 's',
    },
    {
        value: 'tick',
        type: 't',
    },
    {
        value: 't',
        type: 't',
    },
    {
        value: 'T',
        type: 't',
    },
    {
        value: 'range',
        type: 'r',
    },
    {
        value: 'r',
        type: 'r',
    },
    {
        value: 'v',
        type: 'v',
    },
    {
        value: 'volume',
        type: 'v',
    },
    {
        value: 'V',
        type: 'v',
    },
];
const numberWords = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
const regex = /(\d+[.]?\d*)*\s*(\w*)/;
export const parsePeriod = (input) => {
    const allowedCharsPattern = /^[a-zA-Z0-9\.\s]+$/;
    if (!allowedCharsPattern.test(input)) {
        return undefined;
    }
    let replacedInput = input;
    numberWords.forEach((word, i) => (replacedInput = replacedInput.replace(word, `${i + 1}`)));
    const split = regex.exec(replacedInput);
    if (split) {
        const value = parseValue(split[1] || '1');
        const type = parseType(split[2] || 'm');
        if (value && type) {
            return {
                duration: value,
                durationType: type,
            };
        }
    }
    return undefined;
};
// Valid only positive integer numbers
const parseValue = (value) => {
    const dur = Number(value);
    return dur % 1 === 0 && dur > 0 ? dur : undefined;
};
const parseType = (input) => {
    let maxMatchType = 'm';
    let maxMatchPercent = 0;
    validValues.forEach(v => {
        const res = jaroWrinkerAlg(input, v.value);
        if (res > maxMatchPercent) {
            maxMatchType = v.type;
            maxMatchPercent = res;
        }
    });
    return maxMatchPercent > 0.8 ? maxMatchType : undefined;
};
const jaroWrinkerAlg = (s1, s2) => {
    let m = 0;
    // Exit early if either are empty.
    if (s1.length === 0 || s2.length === 0) {
        return 0;
    }
    // Exit early if they're an exact match.
    if (s1 === s2) {
        return 1;
    }
    const range = Math.floor(Math.max(s1.length, s2.length) / 2) - 1;
    const s1Matches = new Array(s1.length);
    const s2Matches = new Array(s2.length);
    let i;
    let j;
    for (i = 0; i < s1.length; i++) {
        const low = i >= range ? i - range : 0;
        const high = i + range <= s2.length ? i + range : s2.length - 1;
        for (j = low; j <= high; j++) {
            if (s1Matches[i] !== true && s2Matches[j] !== true && s1[i] === s2[j]) {
                ++m;
                s1Matches[i] = s2Matches[j] = true;
                break;
            }
        }
    }
    // Exit early if no matches were found.
    if (m === 0) {
        return 0;
    }
    // Count the transpositions.
    let k = 0;
    let n_trans = 0;
    for (i = 0; i < s1.length; i++) {
        if (s1Matches[i] === true) {
            for (j = k; j < s2.length; j++) {
                if (s2Matches[j] === true) {
                    k = j + 1;
                    break;
                }
            }
            if (s1[i] !== s2[j]) {
                ++n_trans;
            }
        }
    }
    let weight = (m / s1.length + m / s2.length + (m - n_trans / 2) / m) / 3;
    let l = 0;
    const p = 0.1;
    if (weight > 0.7) {
        while (s1[l] === s2[l] && l < 4) {
            ++l;
        }
        weight = weight + l * p * (1 - weight);
    }
    return weight;
};
