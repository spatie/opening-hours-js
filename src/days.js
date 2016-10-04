export const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

export const isValidDay = name => days.filter(day => day === name).length;

export default days;
