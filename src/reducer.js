export function reducer(state, action) {
    switch (action.type) {
        case 'ADD_DATA_CAR':
            return {...state, cars: action.payload};
        case 'ADD_DATA_CARSHOWROOM':
            return {...state, carShowRoom: action.payload};
        case 'ADD_DATA_ONE_SHOWROOM':
            return {...state, oneShowRoom: action.payload};
        case 'ADD_DATA_TO_CREATE_PAGE':
            return {...state, createPage: action.payload};
        default:
            return state;
    }
}