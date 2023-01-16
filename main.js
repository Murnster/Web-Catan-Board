// Author: Ryan Murney
// Main javascript file for Catan Board Generator Application

// Numbers on the board
// boardNums = [2,12,3,3,11,11,4,4,10,10,5,5,9,9,6,6,8,8]

// Terrains on the board in the form of numbers
// 0 - Desert, 1 - Wood, 2 - Sheep, 3 - Wheat, 4 - Clay, 5 - Rocks
// terrains = [0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,5,5,5]

// Ports on the board in the form of numbers
// 1 - 3:1, 2 - Wood, 3 - Sheep, 4 - Wheat, 5 - Clay, 6 - Rocks
// ports = [1,1,1,1,2,3,4,5,6]

// Generates the each number by using the numGen() function then places them
// together to form the catan board. Checks numbers at the end to ensure rules
// of generation.

var firstLoad = true;
var fails = 0;

function boardGen() {
    var boardNums = [0,2,12,3,3,11,11,4,4,10,10,5,5,9,9,6,6,8,8];
    var terrNums = [1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,5,5,5]; // Does not include 0 for desert. Dynamically added later
    var nums = false;
    var terrs = false;
    var zeroIndex = 0;
    // ports = [1,1,1,1,2,3,4,5,6]
    // console.log(nums, terrs);

    if (!firstLoad) {
        $('.tile-text').empty(); // Temp Fix - Find a better way
        $('.hidden').removeClass('hidden');
    }

    while (!nums) {
        boardNums = randomizer(boardNums);

        if (arrayCheck(boardNums)) {
            nums = true;
        } else {
            fails = fails + 1;
        }
    }

    zeroIndex = boardNums.indexOf(0);

    while (!terrs) {
        terrNums = randomizer(terrNums);
        terrNums.splice(zeroIndex, 0, 0);

        if (arrayCheck(terrNums)) {
            terrs = true;
        } else {
            terrNums.splice(zeroIndex, 1);
            fails = fails + 1;
        }
    }

    if (nums && terrs) {
        terrains = terrainArray(terrNums);
        
        for (var i=0; i<boardNums.length; i++) {
            if (boardNums[i] == 0) {
                $('#tileText'+i).prev('.tileNum').addClass('hidden');
                // $(`#tile`+i).attr('xlink:href', 'desert.jpg');
                $(`#poly`+i).attr('fill', 'burlywood');
            } else {
                $('#tileText'+i).html(boardNums[i]);

                if (sixOrEight(boardNums[i])) {
                    $('#tileText'+i).addClass('redNumber');
                } else {
                    $('#tileText'+i).removeClass('redNumber');
                }

                switch (terrains[i]) {
                    case 'wood':
                        // $(`#tile`+i).attr('xlink:href', 'wood.jpg');
                        $(`#poly`+i).attr('fill', 'darkgreen');
                        break;
    
                    case 'wheat':
                        // $(`#tile`+i).attr('xlink:href', 'wheat.jpg');
                        $(`#poly`+i).attr('fill', 'gold');
                        break;
    
                    case 'sheep':
                        // $(`#tile`+i).attr('xlink:href', 'sheep.jpg');
                        $(`#poly`+i).attr('fill', 'lightgreen');
                        break;
    
                    case 'rock':
                        // $(`#tile`+i).attr('xlink:href', 'rock.jpg');
                        $(`#poly`+i).attr('fill', 'gray');
                        break;
    
                    case 'clay':
                        // $(`#tile`+i).attr('xlink:href', 'clay.jpg');
                        $(`#poly`+i).attr('fill', 'brown');
                        break;
                }
            }
        }
    } else {
        boardGen();
    }

    if (firstLoad) {
        $('#newBoardBtn').off('click').on('click', () => {
            boardGen();
        });

        firstLoad = false;
    }
}

// Array randomizer function
function randomizer(array) {
    for(let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i)
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
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

function terrainArray(array) {
    var terrains = [];

    for (i = 0; i < array.length; i++) {
        switch(array[i]) {
            case 0:
                terrains.push('desert');
                break;
            case 1:
                terrains.push('wood');
                break;
            case 2:
                terrains.push('sheep');
                break;
            case 3:
                terrains.push('wheat');
                break;
            case 4:
                terrains.push('clay');
                break;
            case 5:
                terrains.push('rock');
                break;
        }
    };

    return terrains;
}

function sixOrEight(number) {
    if (number == 6 || number == 8) {
        return true;
    } else {
        return false
    }
}

// **old concept?
// Randomly selects number based off places next to eachother 
// function numGen(one, two, three, four, five, six) {
// }