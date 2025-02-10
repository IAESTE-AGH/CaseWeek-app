import { SxProps, Theme } from "@mui/material";
import { BaseLink } from "./Base";

interface LinkProps {
    children: React.ReactNode;
    to: string;
    sx?: SxProps<Theme>;

}

export function Link({ children, to, sx }: LinkProps) {
    return (
        <BaseLink sx={sx} to={to}>{children}</BaseLink>
    )
}