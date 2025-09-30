using FluentValidation;

namespace Application.Vehicle.Commands.ReserveVehicle
{
    public class ReserveVehicleCommandValidator : AbstractValidator<ReserveVehicleCommand>
    {
        public ReserveVehicleCommandValidator()
        {
            RuleFor(p => p.ReserveVehicle).NotNull()
                .Must(r => r.StartDate < r.EndDate)
                .WithMessage("Start Date must be less that End Date");
            RuleFor(p => p.VehicleId).NotNull();
            RuleFor(p => p.ReserveVehicle.CustomerId).NotNull();
            RuleFor(p => p.ReserveVehicle.StartDate).NotNull()
                .Must(date => date.Value > DateTime.Today)
                .WithMessage("Start Date must be grater than today");
            RuleFor(p => p.ReserveVehicle.EndDate).NotNull().Must(date => date.Value > DateTime.Today)
                .WithMessage("State Date must be grater than today"); ;
        }

    }
}
