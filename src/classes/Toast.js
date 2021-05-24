import { ToastProgrammatic as toast } from 'buefy'

export default class Toast {

    static error(message) {
        toast.open({
            message: message,
            duration: 6000,
            position: 'is-bottom',
            type: 'is-danger'
        })
        // throw new Error(message)
    }

    static success(message) {
        toast.open({
            message: message,
            duration: 6000,
            position: 'is-bottom',
            type: 'is-success'
        })
    }
}