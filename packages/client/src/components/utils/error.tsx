type Props = {
  message?: string;
  details?: string;
};

export default function DataError({ message, details }: Props) {
  return (
    <>
      <p className="text-lg text-center text-red-500">
        {message || 'Error loading the data'}
      </p>
      {details ? (
        <p className="text-base text-center text-red-800">{details}</p>
      ) : null}
    </>
  );
}
