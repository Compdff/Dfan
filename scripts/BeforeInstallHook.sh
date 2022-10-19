#!/bin/bash
cd /home/ec2-user
cd /home/ec2-user/app-api
echo `date` > stop.out
echo 'BeforeInstallHook..' > beforeInstallHook.out
sudo npm install --only=prod

echo "BeforeInstallHook" > beforeInstallHook.log