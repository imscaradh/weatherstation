#!/bin/bash

LIB_PATH=$(python -c 'from distutils.sysconfig import get_python_lib; print(get_python_lib())')
echo $LIB_PATH

cp ./patches/chartit.patch $LIB_PATH/chartit
cd $LIB_PATH/chartit

patch -p6 < chartit.patch

rm ./chartit.patch
