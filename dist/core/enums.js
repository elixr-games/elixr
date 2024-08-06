export var JOYSTICK_STATES;
(function (JOYSTICK_STATES) {
    JOYSTICK_STATES[JOYSTICK_STATES["DISENGAGED"] = 0] = "DISENGAGED";
    JOYSTICK_STATES[JOYSTICK_STATES["LEFT"] = 1] = "LEFT";
    JOYSTICK_STATES[JOYSTICK_STATES["RIGHT"] = 2] = "RIGHT";
    JOYSTICK_STATES[JOYSTICK_STATES["FORWARD"] = 3] = "FORWARD";
    JOYSTICK_STATES[JOYSTICK_STATES["BACK"] = 4] = "BACK";
})(JOYSTICK_STATES || (JOYSTICK_STATES = {}));
export var HANDEDNESS;
(function (HANDEDNESS) {
    HANDEDNESS["LEFT"] = "left";
    HANDEDNESS["RIGHT"] = "right";
})(HANDEDNESS || (HANDEDNESS = {}));
export var SESSION_MODE;
(function (SESSION_MODE) {
    SESSION_MODE["INLINE"] = "inline";
    SESSION_MODE["IMMERSIVE_VR"] = "immersive-vr";
    SESSION_MODE["IMMERSIVE_AR"] = "immersive-ar";
})(SESSION_MODE || (SESSION_MODE = {}));
export var PRIMITIVE_TYPE;
(function (PRIMITIVE_TYPE) {
    PRIMITIVE_TYPE["Sphere"] = "sphere";
    PRIMITIVE_TYPE["Capsule"] = "capsule";
    PRIMITIVE_TYPE["Cylinder"] = "cylinder";
    PRIMITIVE_TYPE["Cube"] = "cube";
    PRIMITIVE_TYPE["Plane"] = "plane";
    PRIMITIVE_TYPE["Quad"] = "quad";
})(PRIMITIVE_TYPE || (PRIMITIVE_TYPE = {}));
//# sourceMappingURL=enums.js.map