export const currentDate = () =>{
    return new Date().toISOString().split('T')[0];
}
export const firstDayOfMonth = () =>{
    const currentDate = new Date(); 
    currentDate.setDate(1); 
    return currentDate.toISOString().split('T')[0]; 
}
export const formatNumber = (number) => {
    return number.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
export const stringToNumber = (string) => {
    return parseInt(string.replace(/[^0-9.-]/g, ""));
}