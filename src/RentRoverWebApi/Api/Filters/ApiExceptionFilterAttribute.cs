using Api.Models;
using Domain.Exceptions;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Api.Filters
{
    public class ApiExceptionFilterAttribute : ExceptionFilterAttribute
    {
        private readonly ILogger<ApiExceptionFilterAttribute> _logger;
        private readonly IDictionary<Type, Action<ExceptionContext>> _exceptionHandlers;

        public ApiExceptionFilterAttribute(ILogger<ApiExceptionFilterAttribute> logger)
        {
            
            _logger = logger;
            // Register known exception types and handlers.
            _exceptionHandlers = new Dictionary<Type, Action<ExceptionContext>>
            {
                { typeof(ValidationException), HandleValidationException },
                { typeof(DuplicateRequestException), HandleDuplicateRequestException },
                // Add more exception types and handlers as needed.
            };
        }

        private void HandleDuplicateRequestException(ExceptionContext context)
        {
            var duplicateRequestException = context.Exception as DuplicateRequestException;

            var error = new ApiError(duplicateRequestException.Message);
            context.Result = new BadRequestObjectResult(error)
            {
                StatusCode = 400
            };
        }

        private void HandleValidationException(ExceptionContext context)
        {
            var validationException = context.Exception as ValidationException;

            var error = new ApiError(validationException.Message);
            context.Result = new BadRequestObjectResult(error)
            {
                StatusCode = 400
            };
        }

        public override void OnException(ExceptionContext context)
        {
            HandleException(context);
            base.OnException(context);
        }

        private void HandleException(ExceptionContext context)
        {
            var type = context.Exception.GetType();

            if(_exceptionHandlers.ContainsKey(type))
            {
                _exceptionHandlers[type].Invoke(context);
                return;
            }

            var error= new ApiError("An unexpected error occurred.");
            context.Result = new ObjectResult(error)
            {
                StatusCode = 500
            };
        }
    }
}
