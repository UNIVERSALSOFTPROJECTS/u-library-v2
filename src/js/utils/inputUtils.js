const inputUtils = (() => {
    const justTextValidator = (e) =>{ e.target.value = e.target.value.replace(/[^\p{L}\s]/gu, "") };
    const justNumbersValidator = (e) =>{ e.target.value = e.target.value.replace(/[^\d]/g, "") };
    const validateAccountBank = (e) =>{ e.target.value = e.target.value.replace(/[^\d-]/g, "") };
    const notWhiteSpace = (e) =>{ e.target.value = e.target.value.replace(/[^\S+$]/g, "") }
    return {
        justTextValidator,justNumbersValidator,validateAccountBank,notWhiteSpace
    }
})()

export default inputUtils