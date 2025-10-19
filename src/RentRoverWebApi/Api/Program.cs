using Api.Filters;
using Infrastructure.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.IdentityModel.Tokens;
using System.Security.Cryptography;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.AddApplicationServices();
builder.AddInfrastructureServices();


var rsaParameters = new RSAParameters
{
    Modulus = Base64UrlEncoder.DecodeBytes("z5hWYHGtcizokdOasChKEMD_Pad6Zgk2Q9itGPjpEEqSmahU3tSUIj2wtKlk57IEgDRgag5_73QNLvvkveJCwXr9cgPIJdeeIS33JjxgOs8mZo3O2VimwtsJnqxsavOvcIRpqP5dZ-pIWynBY384wIlr-nCJHVetDF2BKo795fS6x3bROtT8EpHh1fBlJrHeQdHg2TjbZHBrwCXvqpfOO7zpFa6Dj_c_pp5T3E7IiCxjrhm2IeaUhJ1wVJOcfeqh3V3a51rKir_H_awULSMO0gXPRBON6RM70yGoc-BdvAYR3K4DvdrFlj12D89YyKPZqwMB3I8TNrchdXIk8wNLeQ"),
    Exponent = Base64UrlEncoder.DecodeBytes("AQAB")
};

var rsa = RSA.Create();
rsa.ImportParameters(rsaParameters);

var rsaSecurityKey = new RsaSecurityKey(rsa);


builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer("Bearer", options =>
    {
        options.Authority = "https://localhost:5001"; // This should point to your identity provider        
        //options.RequireHttpsMetadata = false;
        //options.MetadataAddress = "https://localhost:5001/.well-known/openid-configuration/jwks";


        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateAudience = true,
            IssuerSigningKey = rsaSecurityKey,
            ValidAudience = "myApi",
            ValidateIssuer = true,
            ValidIssuer = "https://localhost:5001",
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true
        };
    });


builder.Services.AddControllers(
    options => { 
        options.Filters.Add<ApiExceptionFilterAttribute>();
    });

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder =>
        {
            builder.WithOrigins("http://localhost:4200") // Replace with your client's origin
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});

var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    using var scope = app.Services.CreateScope();

    var initialiser = scope.ServiceProvider.GetRequiredService<ApplicationDbContextInitialiser>();

    await initialiser.InitialiseAsync();
    await initialiser.SeedAsync();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowSpecificOrigin"); // Apply the named policy
app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
