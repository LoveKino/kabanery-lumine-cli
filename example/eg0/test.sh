#!/bin/bash

cd `dirname $0`

../../bin/lumine-skelton -h

rm -rf ./__test
../../bin/lumine-skelton -d ./__test
