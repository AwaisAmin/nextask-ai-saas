import { ChevronLeftIcon } from "@/icons";

export const AuthBackLink = ({
  href = "/login",
  label = "Back to sign in",
}) => (
  <a className="back-link" href={href}>
    <ChevronLeftIcon />
    {label}
  </a>
);
