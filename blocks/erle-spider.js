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
 */
'use strict';

goog.provide('Blockly.Blocks.spider');
goog.require('Blockly.Blocks');


/**
 * Common HSV hue for all blocks in this category.
 */
Blockly.Blocks.spider.HUE = 260;


Blockly.Blocks['spider_standup_down'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Stand up/down");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(260);
    this.setTooltip('');
    this.setHelpUrl('http://www.erlerobotics.com/');
  }
};

// Blockly.Blocks['spider_sitdown'] = {
//   init: function() {
//     this.appendDummyInput()
//         .appendField("Sit down");
//     this.setPreviousStatement(true);
//     this.setNextStatement(true);
//     this.setColour(260);
//     this.setTooltip('');
//     this.setHelpUrl('http://www.erlerobotics.com/');
//   }
// };

Blockly.Blocks['spider_forward'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Go forward")
        .appendField(new Blockly.FieldTextInput("2"), "FORWARD_SECS")
        .appendField("seconds");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(260);
    this.setTooltip('');
    this.setHelpUrl('http://www.erlerobotics.com/');
  }
};

Blockly.Blocks['spider_backwards'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Go backwards")
        .appendField(new Blockly.FieldTextInput("3"), "BACKWARDS_SECS")
        .appendField("seconds");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(260);
    this.setTooltip('');
    this.setHelpUrl('http://www.erlerobotics.com/');
  }
};

Blockly.Blocks['spider_right'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Go right")
        .appendField(new Blockly.FieldTextInput("5"), "RIGHT_SECS")
        .appendField("seconds");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(260);
    this.setTooltip('');
    this.setHelpUrl('http://www.erlerobotics.com/');
  }
};

Blockly.Blocks['spider_left'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Go left")
        .appendField(new Blockly.FieldTextInput("1"), "LEFT_SECS")
        .appendField("seconds");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(260);
    this.setTooltip('');
    this.setHelpUrl('http://www.erlerobotics.com/');
  }
};

Blockly.Blocks['spider_turn_left'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Turn left")
        .appendField(new Blockly.FieldTextInput("1"), "TURN_LEFT_SECS")
        .appendField("seconds");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(260);
    this.setTooltip('');
    this.setHelpUrl('http://www.erlerobotics.com/');
  }
};

Blockly.Blocks['spider_turn_right'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Turn right")
        .appendField(new Blockly.FieldTextInput("1"), "TURN_RIGHT_SECS")
        .appendField("seconds");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(260);
    this.setTooltip('');
    this.setHelpUrl('http://www.erlerobotics.com/');
  }
};

Blockly.Blocks['spider_turn_right_degrees'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Turn right")
        .appendField(new Blockly.FieldTextInput("90"), "DEGREES")
        .appendField("degrees");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(260);
    this.setTooltip('');
    this.setHelpUrl('http://www.erlerobotics.com/');
  }
};

Blockly.Blocks['spider_turn_left_degrees'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Turn left")
        .appendField(new Blockly.FieldTextInput("90"), "DEGREES")
        .appendField("degrees");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(260);
    this.setTooltip('');
    this.setHelpUrl('http://www.erlerobotics.com/');
  }
};