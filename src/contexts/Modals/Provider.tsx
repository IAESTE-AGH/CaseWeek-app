import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import { useContext, useState } from "react"
import { ShowDialogHandler, DialogOptions, PromiseInfo } from "./types"
import { DialogContext } from "./context"
import { Button } from "@/components/templates/admin"

export const DialogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [options, setOptions] = useState<DialogOptions>({
        title: "",
    })
    const [promiseInfo, setPromiseInfo] = useState<PromiseInfo>()

    const showDialog: ShowDialogHandler = (options) => {
        // When the dialog is shown, keep the promise info so we can resolve later
        return new Promise<boolean>((resolve, reject) => {
            setPromiseInfo({ resolve, reject })
            setOptions(options)
            setIsOpen(true)
        })
    }

    const handleConfirm = () => {
        // if the Confirm button gets clicked, resolve with `true`
        setIsOpen(false)
        promiseInfo?.resolve(true)
        setPromiseInfo(undefined)
    }

    const handleCancel = () => {
        // if the dialog gets canceled, resolve with `false`
        setIsOpen(false)
        promiseInfo?.resolve(false)
        setPromiseInfo(undefined)
    }
    return (
        <>
            <Dialog open={isOpen} onClose={handleCancel}>
                <DialogTitle>{options.title}</DialogTitle>
                <DialogContent sx={{ minWidth: "400px" }}>{options.message && <DialogContentText>{options.message}</DialogContentText>}</DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} variant={options.okText ? "transparent" : "primary"}>
                        {options.cancelText ?? "Zamknij"}
                    </Button>
                    {options.okText ? (
                        <Button variant="primary" onClick={handleConfirm}>
                            {options.okText}
                        </Button>
                    ) : null}
                </DialogActions>
            </Dialog>
            <DialogContext.Provider value={showDialog}>{children}</DialogContext.Provider>
        </>
    )
}

// By calling `useDialog()` in a component we will be able to use the `showDialog()` function
export const useDialog = () => {
    return useContext(DialogContext)
}
