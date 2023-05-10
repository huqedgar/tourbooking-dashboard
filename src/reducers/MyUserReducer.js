import Cookies from 'js-cookie';

const MyUserReducer = (state, action) => {
    switch (action.type) {
        case 'login':
            return JSON.parse(action.payload);
        case 'logout':
            Cookies.remove('access-token');
            Cookies.remove('current-user');
            return null;
        default:
            return state;
    }
};

export default MyUserReducer;
