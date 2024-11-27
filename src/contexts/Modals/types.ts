export interface DialogOptions {
    title: string
    message?: string
    okText?: string
    cancelText?: string
}

export interface PromiseInfo {
    resolve: (value: boolean | PromiseLike<boolean>) => void
    reject: (reason?: any) => void
}

export type ShowDialogHandler = (options: DialogOptions) => Promise<boolean>
