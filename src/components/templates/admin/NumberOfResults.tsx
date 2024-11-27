// Tools
import { styled } from "@mui/material"
// Types
import type { UseMakeAPIRequestResult } from "@/hooks/useMakeAPIRequest"

const NumberOfResultsBase = styled("span")(({ theme }) => ({
    background: "#26A69A",
    color: "#fff",
    padding: "12px 16px",
    display: "flex",
    gap: "4px",
    borderRadius: "3px",
}))

interface NumberOfResultsProps {
    response: UseMakeAPIRequestResult.Result<number>
}

const NumberOfResults: React.FunctionComponent<NumberOfResultsProps> = (props) => {
    return (
        <NumberOfResultsBase>
            {(() => {
                switch (props.response.status) {
                    case "loading":
                        return <span>Ładowanie</span>
                    case "success":
                        return (
                            <>
                                <span style={{ flexGrow: 1 }}>Wyniki: </span>
                                <strong>{props.response.data}</strong>
                            </>
                        )
                    case "error":
                        return <span>Wystąpił błąd</span>
                }
            })()}
        </NumberOfResultsBase>
    )
}

export default NumberOfResults
