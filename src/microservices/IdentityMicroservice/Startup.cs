using HealthChecks.UI.Client;
using IdentityMicroservice.Repository;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Rewrite;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using Microsoft.Extensions.Hosting;
using Middleware;
using MongoDB.Driver;
using System;

namespace IdentityMicroservice;

public class Startup(IConfiguration configuration)
{
    private IConfiguration Configuration { get; } = configuration;

    public void ConfigureServices(IServiceCollection services)
    {
        services.AddControllers();
        services.AddMongoDb(Configuration);
        services.AddJwt(Configuration);
        services.AddTransient<IEncryptor, Encryptor>();
        services.AddSingleton<IUserRepository>(sp =>
          new UserRepository(sp.GetService<IMongoDatabase>() ?? throw new Exception("IMongoDatabase not found"))
        );
        services.AddHealthChecks()
            .AddMongoDb(
                mongodbConnectionString: (
                    Configuration.GetSection("mongo").Get<MongoOptions>()
                    ?? throw new Exception("mongo configuration section not found")
                ).ConnectionString,
                name: "mongo",
                failureStatus: HealthStatus.Unhealthy
            );
        services.AddHealthChecksUI().AddInMemoryStorage();
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }

        var option = new RewriteOptions();
        app.UseRewriter(option);

        app.UseHealthChecks("/healthz", new HealthCheckOptions
        {
            Predicate = _ => true,
            ResponseWriter = UIResponseWriter.WriteHealthCheckUIResponse
        });

        app.UseHealthChecksUI();

        app.UseHttpsRedirection();

        app.UseRouting();

        app.UseAuthorization();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
        });
    }
}