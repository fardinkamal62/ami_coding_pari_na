const utils = module.exports

utils.bcrypt = require('./bcrypt')
utils.random = require('./random')

/*
* we're getting inputValues as a string from the client
* we need to format it into an array of integers
* we're also sorting the array in descending order
* so that we can use binary search
*/
utils.formatInputValues = (inputValues) => {
    inputValues = inputValues.split(',').map(input => input.trim());
    const formattedInputValues = [];
    for (let i = 0; i < inputValues.length; i++) {
        const input = inputValues[i];
        Number.isInteger(parseInt(input)) ? formattedInputValues.push(parseInt(input)) : null;
    }
    quickSortDesc(formattedInputValues);
    return formattedInputValues;
};

/*
* using quick sort to sort the array in descending order
* why?
* because it'll be faster to sort than JavaScript's built-in sort
*/
function quickSortDesc(arr, left = 0, right = arr.length - 1) {
    if (left < right) {
        const pivotIndex = partition(arr, left, right);
        quickSortDesc(arr, left, pivotIndex - 1);
        quickSortDesc(arr, pivotIndex + 1, right);
    }
}

function partition(arr, left, right) {
    const pivot = arr[right];
    let i = left - 1;

    for (let j = left; j < right; j++) {
        if (arr[j] >= pivot) {
            i++;
            swap(arr, i, j);
        }
    }

    swap(arr, i + 1, right);
    return i + 1;
}

function swap(arr, i, j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

/*
* binary search to search for the value in the inputValues
* we're using binary search because it's faster than linear search
*/
utils.search = async (searchValue, inputValues) => {
    let left = 0;
    let right = inputValues.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (inputValues[mid] === searchValue) {
            return true;
        } else if (inputValues[mid] > searchValue) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return false;
}