const initial = {
  series: new Array(6).fill(0),
  temp: 0,
  light: 0,
  value_series: 0,
};

const sensorDataSerie = (state = initial, action) => {
  switch (action.type) {
    case 'set_data_series':
      return {
        ...state,
        series: action.payload,
      };
    case 'set_value_series':
        return {
            ...state,
            value_series: action.payload
        };
    case 'set_temp':
        return {
            ...state,
            temp: action.payload
        }
    case 'set_light':
        return {
            ...state,
            light: action.payload
        }
    default:
      return state;
  }
};

export default sensorDataSerie;
