using myAPI.Models;
using Microsoft.EntityFrameworkCore;


namespace myAPI.Data
{
    public class BaseHospital : DbContext
	{
		public BaseHospital(DbContextOptions options) : base(options)
		{
		}
		
		public DbSet<Paciente> Pacientes { get; set; } = null!;
		public DbSet<Procedimento> Procedimentos { get; set; } = null!;
		public DbSet<Internamento> Internamentos { get; set; } = null!;

		
	}
	
}
