using FluentValidation;

namespace Application.Vehicle.Commands.AddVehicle
{
    public class AddVehicleCommandValidator : AbstractValidator<AddVehicleCommand>
    {
        public AddVehicleCommandValidator()
        {
            RuleFor(p => p.AddVehicleDto).NotNull();
            RuleFor(p => p.AddVehicleDto.Name).NotEmpty().MinimumLength(3);
            RuleFor(p => p.AddVehicleDto.Brand).NotEmpty().MinimumLength(3);
            RuleFor(p => p.AddVehicleDto.Model).NotEmpty().MinimumLength(3);
            RuleFor(p => p.AddVehicleDto.Year).NotNull();
            RuleFor(p => p.AddVehicleDto.Price).NotNull();
        }

    }
}
