// Функция для подсчёта гласных букв в слове
const vowels = ["a", "e", "i", "o", "u"];
const countVowels = (word) => {
    let counter = 0;
    for (const letter of word) {
        if (vowels.includes(letter)) counter++;
    }
    return counter;
};
