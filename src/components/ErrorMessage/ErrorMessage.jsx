import css from "./ErrorMessage.module.css";

export default function ErrorMessage() {
  return (
    <div className={css.container}>
      <div className={css.message}>Something went wrong, try again!</div>
    </div>
  );
}
