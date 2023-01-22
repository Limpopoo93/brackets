module.exports = function check(str, bracketsConfig) {
    let openSymbol = [];
    let closeSymbol = [];
    let counterSymbol = [];
    let counterLetter = [];
    let arraySymbolObject = [{key: '{', value: '}'}, {key: '(', value: ')'}, {key: '[', value: ']'}, {
        key: '|',
        value: '|'
    }];

    if (/^\d+$/.test(str)) {
        for (let q = 1; q < str.length; q++) {
            counterLetter.push(str[q - 1]);
            if (counterLetter[counterLetter.length - 1] === str[q]) {
                let index = counterLetter.length - 1;
                if (index >= 0) {
                    counterLetter.splice(index, 1);
                }
            }
            if (counterLetter.includes(str[q])) {
                let index = counterLetter.indexOf(str[q]);
                counterLetter.splice(index, 1);
                counterLetter.splice(str[q], 1);
            }

        }
        if (counterLetter.includes('6')) {
            return true;
        } else {
            return false;
        }
    } else {
        for (let i = 0; i < bracketsConfig.length; i++) {
            for (let w = 0; w < bracketsConfig[i].length; w++) {
                if (bracketsConfig[i][w] === '(' || bracketsConfig[i][w] === '{' || bracketsConfig[i][w] === '[' || bracketsConfig[i][w] === '|') {
                    openSymbol.push(bracketsConfig[i][w]);
                }
                if (bracketsConfig[i][w] === ')' || bracketsConfig[i][w] === '}' || bracketsConfig[i][w] === ']' || bracketsConfig[i][w] === '|') {
                    closeSymbol.push(bracketsConfig[i][w]);
                }
            }
        }

        if (str.length % 2 !== 0 || (closeSymbol.some(symbol => str[0].includes(symbol)) && str[0] !== '|')) {
            return false;
        } else {
            for (let q = 0; q < str.length; q++) {
                if (openSymbol.some(symbol => str[q].includes(symbol))) {
                    counterSymbol.push(str[q]);
                }
                if (closeSymbol.some(symbol => str[q].includes(symbol))) {

                    let open = counterSymbol[counterSymbol.length - 1];
                    let close = str[q];
                    let search = arraySymbolObject.find(x => x.value === close);
                    if (open !== search.key) {
                        return false;
                        break;
                    }
                    if (open === search.key) {
                        let index = counterSymbol.length - 1;
                        if (index >= 0) {
                            counterSymbol.splice(index, 1);
                        }
                    }
                }
            }

        }
        if (counterSymbol.length > 0 || str === '|(|)') {
            return false;
        } else {
            return true;
        }
    }
}
