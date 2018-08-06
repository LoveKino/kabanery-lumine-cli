#!/bin/bash

cd `dirname $0`

../../bin/lumine-skeleton -h

rm -rf ./__test
../../bin/lumine-skeleton -d ./__test
