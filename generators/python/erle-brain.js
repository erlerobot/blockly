/**
 * @license
 *
 * Copyright 2015 Erle Robotics
 * http://erlerobotics.com
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Blocks for Erle-Spider.
 * @author victor@erlerobot.com (Víctor Mayoral Vilches)
 * @author ahcorde@erlerobot.com (Alejandro Hernández Cordero)
 */
'use strict';

goog.provide('Blockly.Python.brain');
goog.require('Blockly.Python');

Blockly.Python['get_laser'] = function(block) {

    var varName = Blockly.Python.valueToCode(block, 'laser', Blockly.Python.ORDER_ATOMIC);
    var code = "";
    code+="import rospy\n"
    code+="import subprocess\n"
    code+="import rosnode\n"
    code+="from sensor_msgs.msg import Range\n"
    code+="ros_nodes = rosnode.get_node_names()\n"
    code+="if not '/lrm30_node' in ros_nodes:\n"
    code+="  command='/home/erle/spider_ws/install_isolated/lib/lrm30_ros/lrm30'\n"
    code+="  process = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE)\n"
    code+="msg_laser = rospy.wait_for_message('/lrm30_data', Range, timeout=1)\n"
    return code + varName + " = msg_laser.range\n"
};

Blockly.Python['take_a_picture'] = function(block) {

    var code = "";
    code+="import rospy\n"
    code+="import subprocess\n"
    code+="import rosnode\n"
    code+="ros_nodes = rosnode.get_node_names()\n"
    code+="if '/raspicam_node' in ros_nodes:\n"
    code+="  command='rosservice call /camera/start_capture'\n"
    code+="  process = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE)\n"
    code+="command='python2 /home/erle/take_a_picture.py'\n"
    code+="process = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE)\n"
    return code;
};

Blockly.Python['turn_on_blue_led'] = function(block) {
	var blue_led = block.getFieldValue('BLUE_LED');
	var code = "";
	code+="#!/usr/bin/python\n"
	code+="import rospy\n"
	code+="import time\n"
	code+="import rosnode\n"
	code+="import subprocess\n"
	code+="from std_msgs.msg import String\n"
	code+="\n"
	code+="def talker():\n"
	code+="  pub = rospy.Publisher('/statusleds', String, queue_size=10)\n"
	code+="  rate = rospy.Rate(10)\n"
	code+="  start = time.time()\n"
	code+="  flag=True #time flag\n"
	code+="  led='"+blue_led.toString()+"'\n"
	code+="  if (led == 'TRUE'):\n"
	code+="    msg = 'blue'\n"
	code+="  else:\n"
	code+="    msg = 'blue_off'\n"
	code+="  while not rospy.is_shutdown() and flag:\n"
	code+="    sample_time=time.time()\n"
	code+="    if ((sample_time - start) > 1):\n"
	code+="      flag=False\n"
	code+="    pub.publish(msg)\n"
	code+="    rate.sleep()\n"
	code+="if __name__ == '__main__':\n"
	code+="  ros_nodes = rosnode.get_node_names()\n"
	code+="  if not '/erle_statusleds' in ros_nodes:\n"
	code+="    command='python /home/erle/spider_ws/src/ros_erle_statusled/scripts/statusleds.py'\n"
	code+="    process = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE)\n"
	code+="  talker()\n"	
	return code;

};

Blockly.Python['turn_on_orange_led'] = function(block) {
    var orange_led = block.getFieldValue('ORANGE_LED');
    var code = "";
    code+="#!/usr/bin/python\n"
    code+="import rospy\n"
    code+="import time\n"
    code+="from std_msgs.msg import String\n"
    code+="\n"
    code+="def talker():\n"
    code+="  pub = rospy.Publisher('/statusleds', String, queue_size=10)\n"
    code+="  rate = rospy.Rate(10)\n"
    code+="  start = time.time()\n"
    code+="  flag=True #time flag\n"
    code+="  led='"+orange_led.toString()+"'\n"
    code+="  if (led == 'TRUE'):\n"
    code+="    msg = 'orange'\n"
    code+="  else:\n"
    code+="    msg = 'orange_off'\n"
    code+="  while not rospy.is_shutdown() and flag:\n"
    code+="    sample_time=time.time()\n"
    code+="    if ((sample_time - start) > 1):\n"
    code+="      flag=False\n"
    code+="    pub.publish(msg)\n"
    code+="    rate.sleep()\n"
    code+="if __name__ == '__main__':\n"
    code+="  talker()\n"
    return code;

};

