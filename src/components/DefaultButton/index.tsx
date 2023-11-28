import { Button } from "@mui/material";
import { ReactNode } from "react";

interface IDefaultButtonProps {
  children: ReactNode;
  type?: "button" | "reset" | "submit";
  variantButton?: "success" | "error" | "primary";
  handleClick?: () => void;
}

export function DefaultButton({
  handleClick,
  children,
  type = "button",
  variantButton = "primary",
}: IDefaultButtonProps) {
  return (
    <div>
      <Button
        sx={{
          textTransform: "capitalize",
        }}
        variant="contained"
        color={variantButton}
        onClick={handleClick}
        type={type}
      >
        {children}
      </Button>
    </div>
  );
}
