export const getLocalDateFromUtcMilliseconds = (millis: number) => {
    const date = new Date(0);
    date.setUTCMilliseconds(millis);

    return date.toLocaleString();
};