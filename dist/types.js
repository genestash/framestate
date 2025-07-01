/**
 * @param Up - Emit to the parent window
 * @param Down - Emit to the all iframes on the page
 */
export var EmitDirection;
(function (EmitDirection) {
    EmitDirection[EmitDirection["Up"] = 0] = "Up";
    EmitDirection[EmitDirection["Down"] = 1] = "Down";
    EmitDirection[EmitDirection["Both"] = 2] = "Both";
})(EmitDirection || (EmitDirection = {}));
