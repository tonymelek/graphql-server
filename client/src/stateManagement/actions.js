export const actions = (state, action) => {
    switch (action.type) {
        case 'toggleModalState':
            return { ...state, modalState: !state.modalState };
        case 'setModalData':
            return { ...state, modalData: { ...action.details } };
        default:
            throw new Error();
    }
}