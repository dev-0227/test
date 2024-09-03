
var _browserState = false

module.exports = async function getBrowserState() {
    return _browserState
}

module.exports = async function setBrowserState(state) {
    _browserState = state
}
