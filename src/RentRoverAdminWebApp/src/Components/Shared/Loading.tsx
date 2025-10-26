export const Loading = ({
  loading,
  message,
}: {
  loading: boolean;
  message: string;
}) => {
  return (
    <div>
      {loading && (
        <div className="text-center my-4">
          <div
            className="spinner-border"
            role="status"
            aria-hidden="true"
          ></div>
          <div className="mt-2">{message}</div>
        </div>
      )}
    </div>
  );
};
