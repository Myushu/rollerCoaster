#! /usr/bin/env bash

testPathAndResult="
1.simple.test;7
2.1000_groups.test;3935
3.few_groups.test;15
5.high_earnings.test;4999975000
6.large_dataset.test;89744892565569
roller_coaster.hard;8974489271113753
roller_coaster.harder;89744892714152289
"

for line in ${testPathAndResult}
do
   filePath=`echo $line | awk -F';' '{print $1}'`
   expectedValue=`echo $line | awk -F';' '{print $2}'`
   configtestResult="$(node ./dist/main.js < test/$filePath)"

  if [ "$configtestResult" == $expectedValue ]; then
      echo "Test Passed: $filePath"
  else
      echo "Test Failed: $filePath"
      exit
  fi
done