const date = new Date();

// Function to convert
// single digit input
// to two digits
const formatData = (input) => {
    if (input > 9) {
        return input;
    } else return `0${input}`;
};

// Function to convert
// 24 Hour to 12 Hour clock
const formatHour = (input) => {
    if (input > 12) {
        return input - 12;
    }
    return input;
};

module.exports = {formatData};