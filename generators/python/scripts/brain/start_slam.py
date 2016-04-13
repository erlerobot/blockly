import sys
import rospy
import subprocess
import rosnode
import numpy as np
import time
import os
import rospkg
import cv2
import glob
# Ros Messages	 
from sensor_msgs.msg import CompressedImage

ros_nodes = rosnode.get_node_names()
if not '/urg_node' in ros_nodes:
    os.system('ifconfig eth0 192.168.0.2')
    ip_add = '192.168.0.10'
    command='rosrun urg_node urg_node _ip_address:=' + ip_add
    process = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE)

if not '/hector_mapping' in ros_nodes:
    command='roslaunch hector_mapping mapping_default.launch'
    process = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE)

if not '/hector_geotiff_node' in ros_nodes:
    command='roslaunch hector_geotiff geotiff_mapper.launch'
    process = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE)

time.sleep(3)
rospack = rospkg.RosPack()
tiff_path = rospack.get_path('robot_blockly') + '/frontend/pages/maps/'

while '/hector_mapping' in ros_nodes:
    #os.system('rostopic pub -r 0.2  syscommand std_msgs/String "savegeotiff"')
    os.system('rostopic pub -1 syscommand std_msgs/String "savegeotiff"')

    time.sleep(3)
    for img in glob.glob(tiff_path+"*.tif"):
        im_name = img.replace('tif', 'png')
        cv_img = cv2.imread(img)
        cv2.imwrite(im_name, cv_img)
    os.system("ls -t "+tiff_path+"*tfw | tail -n +2 | xargs rm --")#remove all tfw but latest
    os.system("ls -t "+tiff_path+"*tif | tail -n +2 | xargs rm --")#remove all tif but latest
    os.system("ls -t "+tiff_path+"*png | tail -n +2 | xargs rm --")#remove all png but latest

    ros_nodes = rosnode.get_node_names()
