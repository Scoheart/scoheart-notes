


function insertionSort(originalArray: number[]): number[] {
    const sortedArray = [...originalArray];
    const arrayLength = sortedArray.length;
    for (let unsortedStartIndex = 1; unsortedStartIndex < arrayLength; unsortedStartIndex++) {
        const currentElement = sortedArray[unsortedStartIndex];
        let sortedEndIndex = unsortedStartIndex - 1;
        while (sortedEndIndex >= 0 && sortedArray[sortedEndIndex] > currentElement) {
            sortedArray[sortedEndIndex + 1] = sortedArray[sortedEndIndex];
            sortedEndIndex--;
        }
        sortedArray[sortedEndIndex + 1] = currentElement;
    }
    return sortedArray;
}