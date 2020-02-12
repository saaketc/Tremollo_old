export const thumbnailCreator = (string) => {
    return string[0].toUpperCase();
}

export const month = (month) => {
    switch (month) {
        case 0:
           return  'January';
        case 1:
            return 'February';
       
        default:
            return 'New Month';
    }
}
