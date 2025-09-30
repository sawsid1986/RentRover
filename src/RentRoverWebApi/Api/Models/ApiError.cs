
using System.Text.Json.Serialization;

namespace Api.Models
{
    public class ApiError
    {
        public ApiErrorStatus ApiErrorStatus { get; set; }

        public ApiError(string message, Severeity severeity = Severeity.Error)
        {
            ApiErrorStatus = new ApiErrorStatus
            {
                Severeity = severeity,
                Message = message
            };
        }
    }

    public class ApiErrorStatus
    {
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public Severeity Severeity { get; set; }
        public string Message { get; set; } = string.Empty;
    }


    public enum Severeity
    {
        Info,
        Warning,
        Error,
        Critical
    }
}
