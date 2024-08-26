import { eachDayOfInterval, format, isBefore } from 'date-fns';

const initialState = {
    markedDates: {},
    selectionStart: null,
    selectionEnd: null,
};

const dateReducer = (state, action) => {
    switch (action.type) {
        case 'START_SELECTION':
            return {
                ...state,
                selectionStart: action.payload,
                selectionEnd: null,
                markedDates: {
                    [action.payload]: { selected: true, startingDay: true, endingDay: true, color: '#5100FF' }
                },
            };
        case 'END_SELECTION':
            const { start, end } = action.payload;
            const interval = eachDayOfInterval({
                start: new Date(start),
                end: new Date(end),
            });

            const newMarkedDates = {};
            interval.forEach((date, index) => {
                const formattedDate = format(date, 'yyyy-MM-dd');
                newMarkedDates[formattedDate] = {
                    selected: true,
                    startingDay: index === 0,
                    endingDay: index === interval.length - 1,
                    color: 'blue',
                };
            });

            return {
                ...state,
                selectionEnd: end,
                markedDates: newMarkedDates,
            };
        default:
            return state;
    }
};

export { initialState, dateReducer };
