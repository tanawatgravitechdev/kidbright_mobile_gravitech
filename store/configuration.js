const initial = {
    broker: 'aaa',
    port: 0,
}

const mqttSetting = (state = initial, action) => {
    switch(action.type){
        case 'set_broker':
            return {
                ...state,
                broker: action.payload
            }
        case 'set_port':
            return {
                ...state,
                port: action.payload
            }
        default:
            return state;
    }
};

export default mqttSetting