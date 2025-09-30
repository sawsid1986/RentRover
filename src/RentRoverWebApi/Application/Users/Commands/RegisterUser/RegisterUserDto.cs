using AutoMapper;

namespace Application.Users.Commands.RegisterUser
{
    public class RegisterUserDto
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        private class Mapping : Profile
        {
            public Mapping()
            {
                CreateMap<RegisterUserDto, Domain.Entities.LoginUser>();
            }
        }
    }
}
