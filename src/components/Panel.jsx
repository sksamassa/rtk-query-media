import classNames from "classnames";

export default function Panel({ children, className, ...rest }) {
  const finalClassName = classNames("p-4 cursor-pointer w-full", className);
  return (
    <div {...rest} className={finalClassName}>
      {children}
    </div>
  );
}