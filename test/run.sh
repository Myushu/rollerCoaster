#! /usr/bin/env bash

testPathAndResult="
1.simple.test;7
2.1000_groups.test;3935
3.few_groups.test;15
4.once_a_day.test;15000
5.high_earnings.test;4999975000
6.large_dataset.test;89744892565569
roller_coaster.hard;1
roller_coaster.harder;1
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