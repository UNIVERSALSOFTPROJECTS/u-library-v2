//just test
const modalUtils = (() => {
    let expireSessionModalOpen = false;
    let chatLiveModalOpen = false;
    let subModalOpened;


    const onOpenExpireSession = () => { expireSessionModalOpen = true; subModalOpened = "expireSession"; chatLiveModalOpen = false; }
    return {
        onOpenExpireSession,expireSessionModalOpen,subModalOpened
    }
})()

export default modalUtils
