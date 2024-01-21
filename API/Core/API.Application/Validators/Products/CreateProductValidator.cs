using API.Application.DTOs.Products;
using FluentValidation;

namespace API.Application.Validators.Products
{
    public class CreateProductValidator : AbstractValidator<CreateProductDTO>
    {
        public CreateProductValidator()
        {
            RuleFor(p => p.Name)
                .NotEmpty()
                .NotNull()
                    .WithMessage("Product name can't be empty")
                .MaximumLength(150)
                .MinimumLength(2)
                    .WithMessage("Product name's character must be between 2 and 150");

            RuleFor(p => p.Stock)
                .NotEmpty()
                .NotNull()
                    .WithMessage("Stock can't be empty")
                .Must(s => s >= 0)
                    .WithMessage("Stock can't be negative number");

            RuleFor(p => p.Price)
                .NotEmpty()
                .NotNull()
                    .WithMessage("Price can't be empty")
                .Must(s => s >= 0)
                    .WithMessage("Price can't be negative number");

        }
    }
}
