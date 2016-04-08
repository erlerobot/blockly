import rospy

import numpy as np
import math
import mavros

from sensor_msgs.msg import LaserScan
from mavros_msgs.msg import OverrideRCIn
from mavros_msgs.srv import SetMode

pub = rospy.Publisher('/mavros/rc/override', OverrideRCIn, queue_size=10)


################
## AVOID OBS. ##
################

while not rospy.is_shutdown():

    rospy.wait_for_service('/mavros/set_mode')
    change_mode = rospy.ServiceProxy('/mavros/set_mode', SetMode)
    resp1 = change_mode(custom_mode='manual')

    print(resp1)
    if 'True' in str(resp1):

        data = rospy.wait_for_message('/scan', LaserScan, timeout=3)

        angle = data.angle_max
        Vx = 250
        Vy = 250
        for r in data.ranges:
            if r == float ('Inf'):
                r = data.range_max
            x = math.trunc( (r * 10)*math.cos(angle + (-90*3.1416/180)) )
            y = math.trunc( (r * 10)*math.sin(angle + (-90*3.1416/180)) )
            Vx+=x
            Vy+=y
            angle= angle - data.angle_increment

        ang = -(math.atan2(Vx,Vy)-3.1416)*180/3.1416
        if ang > 180:
            ang -= 360

        yaw = 1500 + ang * 40 / 6
        throttle = 1900

        print("trying to walk")
        msg = OverrideRCIn()
        msg.channels[0] = yaw
        msg.channels[1] = 0
        msg.channels[2] = throttle
        msg.channels[3] = 0
        msg.channels[4] = 0
        msg.channels[5] = 0
        msg.channels[6] = 0
        msg.channels[7] = 0
        pub.publish(msg)
