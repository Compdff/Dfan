#!/bin/bash
cd /home/ec2-user/app-api
echo `date` >> afterInstallHook.out
echo 'AeforeInstallHook..' >> afterInstallHook.out
npm install
npm run build
echo "Installation done" >> afterInstallHook.log