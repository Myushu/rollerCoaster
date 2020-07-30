var fs = require('fs');

interface InputData {
  nbSeat: number;
  nbRun: number;
  nbGroup: number;
  groups: number[];
}

/**
 * Parses stdin and returns data on InputData object.
 * @return {InputData} Data from stdin
 */
function getData(): InputData {
  var data: string[] = fs.readFileSync(0, 'utf-8').split('\n')
  const firstLine = data.shift().split(' ');
  return {
    nbSeat: parseInt(firstLine[0]),
    nbRun: parseInt(firstLine[1]),
    nbGroup: parseInt(firstLine[2]),
    groups: data.map(e => parseInt(e))
  };
}

/**
 * Loads groups on the rolley coaster.
 * @param {InputData} The input data
 * @param {number} The current queue position
 * @return {InputData} The number of taken seats on on rolley coaster
 * @return {InputData}The new queue position
 */
function getPeopleOnTrain(data: InputData, currentPosition: number): [number, number] {
  var seatAvailable = data.nbSeat;
  while (seatAvailable != 0) {
    if (data.groups[currentPosition] <= seatAvailable) {
        seatAvailable -= data.groups[currentPosition];
        ++currentPosition;
    }
    else {
      break;
    }
    if (currentPosition == data.nbGroup)
      currentPosition = 0;
    // optimimisation ? multiplier le earnings par le nombre de fois que l'on va reset currentPosition
  }
  return [data.nbSeat - seatAvailable, currentPosition]
}

function main() {
  const data = getData();
  var earnings: number = 0;
  var currentPosition: number = 0;
  const seatPrice = 1;

  for (var run = 1; run <= data.nbRun; run++) {
    var takenSeat = 0;
    [takenSeat, currentPosition] = getPeopleOnTrain(data, currentPosition);
    earnings += takenSeat * seatPrice;
  }

  console.log(earnings);
}

main();