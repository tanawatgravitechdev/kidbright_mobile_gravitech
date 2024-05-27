const initial = {
    broker: 'none',
    port: 0,
    clientConnect: null,
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
        case 'set_client_connect':
            return {
                ...state,
                clientConnect: action.payload
            }
        default:
            return state;
    }
};

export default mqttSetting