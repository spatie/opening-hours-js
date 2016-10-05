export const days = () => {
    return ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
};

export const isValid = (name) => {
    return days().filter(day => day === name).length > 0;
};

export default {
    days,
    isValid,
};
