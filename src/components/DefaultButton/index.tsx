import { Button } from "@mui/material";

interface IDefaultButtonProps {
  text: string;
  type?: "button" | "reset" | "submit";
  variantButton?: "success" | "error" | "primary";
  handleClick?: () => void;
}

export function DefaultButton({
  handleClick,
  text,
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
        {text}
      </Button>
    </div>
  );
}
