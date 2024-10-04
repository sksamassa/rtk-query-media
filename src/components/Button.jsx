import classNames from "classnames";
import { GoSync } from "react-icons/go";

export default function Button({
  
  children,
  primary,
  secondary,
  success,
  warning,
  danger,
  rounded,
  outline,
  loading,
  ...rest
}) {
  const classes = classNames(
    rest.className,
    "px-3 py-1.5 border flex items-center gap-x-2 h-8",
    {
      "opacity-80": loading,
      "border-blue-500 bg-blue-500 text-white": primary,
      "border-gray-900 bg-gray-900 text-white": secondary,
      "border-green-500 bg-green-500 text-white": success,
      "border-yellow-400 bg-yellow-400 text-white": warning,
      "border-red-500 bg-red-500 text-white": danger,
      "rounded-full": rounded,
      "border-2 bg-white": outline,
      "border-blue-500 text-blue-500": primary && outline,
      "border-gray-900 text-gray-900": secondary && outline,
      "border-green-500 text-green-500": success && outline,
      "border-yellow-400": warning && outline,
      "border-red-500 text-red-600": outline && danger,
    }
  );

  console.log(rest);
  return (
    <button disabled={loading} {...rest} className={classes}>
      {loading ? <GoSync className="animate-spin" /> : children}
    </button>
  );
}

Button.propTypes = {
  checkValidationValue: ({ primary, secondary, success, warning, danger }) => {
    const count =
      Number(!!primary) +
      Number(!!secondary) +
      Number(!!success) +
      Number(!!warning) +
      Number(!!danger);

    if (count > 1) {
      return new Error(
        "Only one of the primary, secondary, success, danger can be true"
      );
    }
  },
};