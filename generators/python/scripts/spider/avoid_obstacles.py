import rospy

import numpy as np
import math

import sys
import time
from crab_msgs.msg import apm_imu
from crab_msgs.msg import BodyCommand
from crab_msgs.msg import BodyState
from crab_msgs.msg import GaitCommand
from crab_msgs.msg import LegIKRequest
from crab_msgs.msg import LegJointsState
from crab_msgs.msg import LegPositionState
from crab_msgs.msg import LegsJointsState

from sensor_msgs.msg import Joy
from sensor_msgs.msg import LaserScan

################
## INITIALIZE ##
################ 
pub = rospy.Publisher('/joy', Joy, queue_size=10)
msg = Joy()
msg.header.stamp = rospy.Time.now()
rate = rospy.Rate(10)
valueAxe = 0.0
valueButton = 0
for i in range (0, 20):
 msg.axes.append(valueAxe)
for e in range (0, 17):
 msg.buttons.append(valueButton)

################
## AVOID OBS. ##
################
while not rospy.is_shutdown():

    laser = rospy.wait_for_message('/scan', LaserScan, timeout=3)

    path_distance = 1.2
    obstacle_distance = 0.3

    path_size = 0
    path_beg = 0
    path_end = 0
    MAX_path_size = 0
    MAX_path_beg = 0
    MAX_path_end = 0

    #range_min = laser.range_min #0.05
    range_min = 0.2
    range_max = laser.range_max #25.0


    #create a list of tuples with valid values
    valid_ranges = []
    stop = 0
    for (i,r) in enumerate(laser.ranges):
        if (r >= range_min) and (r <= range_max):
            tup = [i,r]
            valid_ranges.append(tup)

    for (j,w) in enumerate(valid_ranges): #w is a tuple of [i,r]
        #print(str(j)+" "+str(w[1]))
        if w[1] > path_distance:
            if valid_ranges[j-1][1] > path_distance:
                #path_size += 1
                path_size += w[0] - valid_ranges[j-1][0]
                path_end = j
                if path_size > MAX_path_size:
                    MAX_path_size = path_size
                    MAX_path_beg = path_beg
                    MAX_path_end = path_end
            else:
                path_beg = j
                path_size = 0
        elif w[1] <= obstacle_distance:
            stop = 1
            print("STOP - "+str(j)+" "+str(w[1]))
            


    path_center = (MAX_path_end+MAX_path_beg)/2
    path_center_degrees = path_center*0.005817*57.2958
    print("NEW ITERATION")
    print("MAX_path_size="+str(MAX_path_size))
    print("MAX_path_beg="+str(MAX_path_beg))
    print("MAX_path_end="+str(MAX_path_end))
    print("Path center="+str(path_center))
    print("DEGREES path_center="+str(path_center_degrees))
    print("\n")

    ##QUITAR VALORES ERRORENOS DE 'RANGE' ANTES DE TRATAR
    #RANGE sin tratar -> 810-811 valores
    #angulo total 270 grados, 2.3557*2*57.2958

    if stop == 0:
        if path_center_degrees < 135: #left
            msg.axes[1] = 1 #forward
            msg.axes[2] = 1 #turn left
        else: #right
            msg.axes[1] = 1 #forward
            msg.axes[2] = -1 #turn right
    else: #stop == 1
        msg.axes[1] = 0
        msg.axes[2] = 0
    pub.publish(msg)
    rate.sleep()
