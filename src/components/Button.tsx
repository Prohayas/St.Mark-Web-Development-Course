type ButtonProps = {
  type: "submit" | "reset" | "button" | undefined;
  title: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
};

const Button = (props: ButtonProps) => {
  return <button {...props}>{props.title}</button>;
};

export default Button;
