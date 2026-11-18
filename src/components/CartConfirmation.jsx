export default function CartConfirmation({ message }) {
  return (
    <div className="toast" role="status">
      <span className="toast-check" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none">
          <path d="m5 12 4.5 4.5L19 7" />
        </svg>
      </span>
      <span>{message}</span>
    </div>
  );
}
