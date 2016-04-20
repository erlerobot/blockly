import rospy
from mavros_msgs.srv import SetMode
rospy.wait_for_service('/mavros/set_mode')
try:
 change_mode = rospy.ServiceProxy('/mavros/set_mode', SetMode)
 mode=dropdown_mode
 resp1 = change_mode(0,mode)
except rospy.ServiceException as e:
code+=' print ("Service call failed: %s" %e\n )'

