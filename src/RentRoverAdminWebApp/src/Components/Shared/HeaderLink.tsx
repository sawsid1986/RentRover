import { Link, LinkProps } from "react-router-dom";

interface ButtonLinkProps extends LinkProps {
  children: React.ReactNode; // The content inside the button (e.g., text, icon)
  className?: string; // Optional CSS classes for styling
}

const ButtonLink: React.FC<ButtonLinkProps> = ({
  children,
  className,
  to,
  ...rest
}) => {
  return (
    <Link to={to} className="nav-link" {...rest}>
      <button type="button" className={className}>
        {children}
      </button>
    </Link>
  );
};

export default ButtonLink;
