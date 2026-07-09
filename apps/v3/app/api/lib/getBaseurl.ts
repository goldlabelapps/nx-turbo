// grab the baseURL from the config
export const getBaseurl = () => {
    if (process.env.NODE_ENV === 'development') {
        return 'http://localhost:1889/api';
    }
    return 'https://goldlabel.pro/api';
};
