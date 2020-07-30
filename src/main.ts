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
 * Loads groups on the roller coaster.
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
  }
  return [data.nbSeat - seatAvailable, currentPosition]
}

/**
 * Sums the earnings of each run
 * @param  {[number} Passed runs
 * @return {number} The total earnings for the given runs
 */
function getEarnings(runs: [number, number][]): number {
  return runs.reduce((acc, value) => acc + value[1], 0);
}

/**
 * Sums the earging based on the partial runs.
 * This function is called when queue is twice on the same position.
 * /!\ The earnings calculation seems to be broken. /!\
 * @param {InputData} The input data
 * @param {number} The number of passed runs
 * @param {[number} Passed runs
 */
function findEarningsFromPartialRuns(data: InputData,
  nbRun: number,
  runs: [number, number][]
  ): void {
  var earnings = 0;

  earnings = getEarnings(runs) * (Math.floor(data.nbRun / nbRun));
  earnings += getEarnings(runs.slice(0, data.nbRun % nbRun))
  console.log(earnings)
}

function main() {
  const data = getData();
  var currentPosition: number = 0;
  var passedRuns: [number, number][] = [];
  const seatPrice = 1;

  for (var run = 1; run <= data.nbRun; run++) {
    var takenSeat = 0;
    [takenSeat, currentPosition] = getPeopleOnTrain(data, currentPosition);
    passedRuns.push([currentPosition, takenSeat * seatPrice]);

    // The queue order is in the same state as before
    if (currentPosition in passedRuns.map(a => a[0])) {
      findEarningsFromPartialRuns(data, run, passedRuns);
      process.exit();
    }
  }
  console.log(getEarnings(passedRuns));
}

main();