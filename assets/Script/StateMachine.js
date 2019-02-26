//类的继承
function createExtend(child, parent) {
    child.prototype = parent.prototype;
}

function StateMachine() {
    this.stateMap = {};
    this.state = null;
}

function BaseState() {
    // this._stateMachine = null;
}

BaseState.prototype.setStateMachine = function( machine ) {
    this._stateMachine = machine;
}

var ChildMap = {};

StateMachine.prototype.setupState = function( object ) {
    for (let i = 0; i < object.states.length; ++i) {
        StateMachine.prototype['on' + object.states[i]] = () => {
            this.state.prototype[object.states[i]]();
        }
        BaseState.prototype[object.states[i]] = function(){};
    }
    for (let i = 0; i < object.events.length; ++i) {
        this.stateMap[object.events[i].name] = {}
        function F(){}
        F.prototype = this.stateMap[object.events[i].name];
        console.log(this.stateMap[object.events[i].name]);
        createExtend(this.stateMap[object.events[i].name], BaseState);
        this.stateMap[object.events[i].name].prototype['on' + object.events[i].to] = object.callbacks['on' + object.events[i].to];
        if (object.events[i].from instanceof Array) {
            for (let k = 0; k < object.events[i].from.length; ++k) {
                this.stateMap[object.events[i].name].prototype['on' + object.events[i].from[k]] = () => {
                    console.log(this._stateMachine);
                    this._stateMachine.setHeroState(this.stateMap[object.events[i].name]);
                    this._stateMachine.getHeroState()['on' + object.events[i].from[k]]();
                }
            }
        }
        else {

        }
    }
}

StateMachine.prototype.setHeroState = function( state ) {
    this.state = state;
    this.state.prototype.setStateMachine(new StateMachine());
}

StateMachine.prototype.getHeroState = function() {
    return this.state;
}

StateMachine.prototype.doEvent = function( event ) {
    this.setHeroState(this.stateMap[event], event);
    return this.stateMap[event].prototype;
}

module.exports = StateMachine;
