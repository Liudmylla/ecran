import notify from "devextreme/ui/notify"

export const notifySuccess = (successMsg) => {
    notify({ message: successMsg, width: 320 }, 'success', 1000)
}

export const notifyError = (errorMsg) => {
    notify({ message: errorMsg, width: 320 }, 'error', 3000)
}