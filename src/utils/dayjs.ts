import dayjs from 'dayjs';

export const formatDate = (date: Date) => {
    return dayjs(date).format('YYYY-MM-DD');
};

export const convertStringToDate = (date: string) => {
    return dayjs(date).toDate();
};

export const getTimePassed = (date: Date) => {
    const difference = dayjs().diff(date, 'minute');

    if (difference <= 0) {
        // less than one minute
        return 'just now';
    }
    if (difference < 60) {
        // less than one hour
        return `${difference} minutes ago`;
    }
    if (difference < 1440) {
        // less than one day
        return `${(difference / 60).toFixed(0)} hours ago`;
    }
    if (difference < 10080) {
        // less than one week
        return `${(difference / 1440).toFixed(0)} days ago`;
    }
    if (difference < 43800) {
        // less than one month
        return `${(difference / 10080).toFixed(0)} weeks ago`;
    }
    if (difference < 525600) {
        // less than one year
        return `${(difference / 43800).toFixed(0)} months ago`;
    }
    return `${(difference / 525600).toFixed(0)} years ago`;
};
