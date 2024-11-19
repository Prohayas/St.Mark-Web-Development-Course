

type ButtonProps = {

    type: "submit" | "reset" | "button" | undefined,
    title: string,
    onClick?: () => void,
    className?: string
}

const Button = ({ type, title, onClick, className }: ButtonProps) => {
  return (
    <button onClick={onClick} className={className} type={type}>{title}</button>
  )
}

export default Button