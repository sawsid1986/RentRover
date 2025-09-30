namespace Domain.Exceptions
{
    public class DuplicateRequestException : Exception
    {
        public DuplicateRequestException(string message, Exception ex) : base($"Duplicate request: {message}", ex)
        {

        }
    }
}
