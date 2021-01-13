// Author: Ryan Murney
// Main javascript file for Catan Board Generator Application

// Numbers on the board
// boardNums = [2,12,3,3,11,11,4,4,10,10,5,5,9,9,6,6,8,8]

// Terrains on the board in the form of numbers
// 1 - Wood, 2 - Sheep, 3 - Wheat, 4 - Clay, 5 - Rocks, 6 - Desert
// terrains = [1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,5,5,5,6]

// Ports on the board in the form of numbers
// 1 - 3:1, 2 - Wood, 3 - Sheep, 4 - Wheat, 5 - Clay, 6 - Rocks
// ports = [1,1,1,1,2,3,4,5,6]

// Generates the each number by using the numGen() function then places them
// together to form the catan board. Checks numbers at the end to ensure rules
// of generation.

var fails = 0;

function boardGen() {
    var boardNums = [0,2,12,3,3,11,11,4,4,10,10,5,5,9,9,6,6,8,8]

    // terrains = [1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,5,5,5,6]
    // ports = [1,1,1,1,2,3,4,5,6]

    var boardNums = randomizer(boardNums)
    if (arrayCheck(boardNums)) {
        console.log('BOOM!');
        console.log('This failed: ' + fails);
        console.log(boardNums);

        console.log('   ' + boardNums[0] + ' ' + boardNums[1] + ' ' + boardNums[2] + ' ')
        console.log(' ' + boardNums[3] + ' ' + boardNums[4] + ' ' + boardNums[5] + ' ' + boardNums[6])
        console.log(boardNums[7] + ' ' + boardNums[8] + ' ' + boardNums[9] + ' ' + boardNums[10] + ' ' + boardNums[11])
        console.log(' ' + boardNums[12] + ' ' + boardNums[13] + ' ' + boardNums[14] + ' ' + boardNums[15])
        console.log('   ' + boardNums[16] + ' ' + boardNums[17] + ' ' + boardNums[18] + ' ')
        
    } else {
        fails = fails + 1
        console.log('fail');
        boardGen();
    }
    // document.getElementById('.test').addEventListener('click', () => {
    //     console.log(boardNums);
    // });
}

// **old concept?
// Randomly selects number based off places next to eachother 
// function numGen(one, two, three, four, five, six) {
// }

// Array randomizer function
function randomizer(array) {
    for(let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i)
        const temp = array[i];
        array[i] = array[j]
        array[j] = temp
    }
    return array;
}

// Check number equality and 6/8, 2/12
// Should eventually maybe check if certain input exists to save time
function numCheck(a, b, c, d) {
    if (a != b && a != c && a != d) {
        if (a == 6 || a == 8 || a == 2 || a == 12) {
            if (a== 6 || a == 8) {
                if (b == 6 || b == 8 || c == 6 || c == 8 || d == 6 || d == 8) {
                    return false;
                } else {
                return true; 
                }
            } else {
                if (a == 2 || a == 12) {
                    if (b == 2 || b == 12 || c == 2 || c == 12 || d == 2 || d == 12) {
                        return false;
                    } else {
                        return true;
                    }
                }
            }
        } else {
            return true;
        }
    } else {
        return false;
    }
}

function arrayCheck(array) {
    if (numCheck(array[0], array[1], array[3], array[4]) && 
        numCheck(array[1], array[2], array[4], array[5]) && 
        numCheck(array[2], array[5], array[6]) && 
        numCheck(array[3], array[4], array[7], array[8]) && 
        numCheck(array[4], array[5], array[8], array[9]) && 
        numCheck(array[5], array[6], array[9], array[10]) && 
        numCheck(array[6], array[10], array[11]) && 
        numCheck(array[7], array[8], array[12]) && 
        numCheck(array[8], array[9], array[12], array[13]) && 
        numCheck(array[9], array[10], array[13], array[14]) && 
        numCheck(array[10], array[11], array[14], array[15]) && 
        numCheck(array[11], array[15]) && 
        numCheck(array[12], array[13], array[16]) && 
        numCheck(array[13], array[14], array[16], array[17]) && 
        numCheck(array[14], array[15], array[17], array[18]) && 
        numCheck(array[15], array[18]) && 
        numCheck(array[16], array[17]) && 
        numCheck(array[17], array[18])) {
        return true;
    } else {
        return false;
    }
}