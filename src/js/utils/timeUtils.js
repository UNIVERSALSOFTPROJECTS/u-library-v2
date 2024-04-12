export const currentDate = () =>{
    return new Date().toISOString().split('T')[0];
}
