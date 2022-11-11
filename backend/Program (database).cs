//criar projeto:
//	dotnet new webabi -minimal -o NomeDoProjeto
//entrar na pasta:
//	cd NomeDoProjeto
//adicionar entity framework no console:
//	dotnet add package Microsoft.EntityFrameworkCore.InMemory --version 6.0
//	dotnet add package Microsoft.EntityFrameworkCore.Sqlite --version 6.0
//	dotnet add package Microsoft.EntityFrameworkCore.Design --version 6.0
//incluir namespace do entity framework:
//	using Microsoft.EntityFrameworkCore;
//antes de rodar o dotnet run pela primeira vez, rodar os seguintes comandos para iniciar a base de dados:
//	dotnet ef migrations add InitialCreate
//	dotnet ef database update

using myAPI.Models;
using myAPI.Data;
using Microsoft.EntityFrameworkCore;

namespace Trabalho
{
    partial class Program
	{
		static void Main(string[] args)
		{
			var builder = WebApplication.CreateBuilder(args);
			
			var connectionString = builder.Configuration.GetConnectionString("Hospital") ?? "Data Source=Hospital.db";
			builder.Services.AddSqlite<BaseHospital>(connectionString);

			// Add services to the container.
			// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
			builder.Services.AddEndpointsApiExplorer();
			builder.Services.AddSwaggerGen();

			var app = builder.Build();

			// Configure the HTTP request pipeline.
			if (app.Environment.IsDevelopment())
			{
				app.UseSwagger();
				app.UseSwaggerUI();
			}

			//cadastrar Internamento
			app.MapPost("/cadastrar/paciente", (BaseHospital baseHospital, Paciente Pacientes) =>
			{
				baseHospital.Pacientes.Add(Pacientes);
				baseHospital.SaveChanges();
				return "Paciente adicionado";
			});
			app.MapPost("/cadastrar/internamento", (BaseHospital baseHospital,Internamento Internamentos) =>
			{
				baseHospital.Internamentos.Add(Internamentos);
				baseHospital.SaveChanges();
				return "Internamento adicionado";
			});

			app.MapPost("/cadastrar/procedimento", (BaseHospital baseHospital, Procedimento Procedimentos) =>
			{
				baseHospital.Procedimentos.Add(Procedimentos);
				baseHospital.SaveChanges();
				return "Procedimento adicionado";
			});

			//listar todos os pacientes
			app.MapGet("/pacientes", (BaseHospital baseHospital) => {
				return (baseHospital.Pacientes
				.ToList());
			});
		
			app.MapGet("/internamentos", (BaseHospital baseHospital) => {	
				var innerJoinQuery =
					from i in baseHospital.Internamentos
					join p in baseHospital.Pacientes
					on i.PacienteId equals p.PacienteId
					join d in baseHospital.Procedimentos
					on i.ProcedimentoId equals d.ProcedimentoId
					select new{Internamentos = i, Pacientes = p, Procedimentos = d};
					return innerJoinQuery.ToList();
			});

			//listar todos os Procedimentos
			app.MapGet("/procedimentos", (BaseHospital baseHospital) => {
				return (baseHospital.Procedimentos.ToList());
			});

			//listar todos os procedimentos de um internamento específico
			// app.MapGet("/procedimentos/internamento/{id}", (BaseHospital baseHospital, int id) => {
			// 	 return baseHospital.Procedimentos
			// 	 .Where(x => x.InternamentoId == id).ToList();
			// });

			//listar todos os internamentos de um paciente específico
			// app.MapGet("/internamentos/paciente/{id}", (BaseHospital baseHospital, int id) => {
			// 	 return baseHospital.Internamentos
			// 	 .Include(Internamento => Internamento.Pacientes)
			// 	 .Include(Internamento => Internamento.Procedimentos)
			// 	 .Where(x => x.PacienteId == id).ToList();
			// });

			// //listar todos os internamentos por mês
			// app.MapGet("/internamentos/{competencia}", (BaseHospital baseHospital, String comp) => {
			// 	 return baseHospital.Internamentos
			// 	 .Where(x => x.Competencia == comp).ToList();
			// });

			//listar todos os procedimentos de um médico especifico
			app.MapGet("/procedimentos/medico/{nome}", (BaseHospital baseHospital, String nome) => {
				 return baseHospital.Procedimentos
				 .Where(x => x.Medico == nome).ToList();
			});
			
			//atualizar Paciente
			app.MapPost("/atualizar/paciente/{id}", (BaseHospital baseHospital, Paciente PacienteAtualizado, int id) =>
			{
				var Paciente = baseHospital.Pacientes.Find(id);
				Paciente.Nome = PacienteAtualizado.Nome;
				Paciente.DataNasc = PacienteAtualizado.DataNasc;
				Paciente.Sexo = PacienteAtualizado.Sexo;
				Paciente.Telefone = PacienteAtualizado.Telefone;
				Paciente.Cep = PacienteAtualizado.Cep;
				Paciente.Logradouro = PacienteAtualizado.Logradouro;
				Paciente.Numero = PacienteAtualizado.Numero;
				Paciente.Complemento = PacienteAtualizado.Complemento;
				baseHospital.SaveChanges();
				return "Paciente atualizado";
			});

			//atualizar Procedimento
			app.MapPost("/atualizar/procedimento/{id}", (BaseHospital baseHospital, Procedimento ProcedimentoAtualizado, int id) =>
			{
				var Procedimento = baseHospital.Procedimentos.Find(id);
				Procedimento.Medico = ProcedimentoAtualizado.Medico;
				Procedimento.MedicoCBO = ProcedimentoAtualizado.MedicoCBO;
				Procedimento.Codigo_Procedimento = ProcedimentoAtualizado.Codigo_Procedimento;
				Procedimento.DescProcedimento = ProcedimentoAtualizado.DescProcedimento;
				Procedimento.QtdProcedimento = ProcedimentoAtualizado.QtdProcedimento;
				baseHospital.SaveChanges();
				return "Procedimento atualizado";
			});

			//atualizar Internamento
			app.MapPost("/atualizarInternamento/{id}", (BaseHospital baseHospital, Internamento InternamentoAtualizado, int id) =>
			{
				var Internamento = baseHospital.Internamentos.Find(id);
				Internamento.DataInt = InternamentoAtualizado.DataInt;
				Internamento.DataAlta = InternamentoAtualizado.DataAlta;
				Internamento.Leito = InternamentoAtualizado.Leito;
				Internamento.CID = InternamentoAtualizado.CID;				
				Internamento.Carater_Atendimento = InternamentoAtualizado.Carater_Atendimento;
				Internamento.Motivo_Encerramento = InternamentoAtualizado.Motivo_Encerramento;
				baseHospital.SaveChanges();
				return "Internamento atualizado";
			});

			//deletar Procedimento
			app.MapPost("/deletarProcedimento/{id}", (BaseHospital baseHospital, int id) =>
			{
				var Procedimento = baseHospital.Procedimentos.Find(id);
				baseHospital.Remove(Procedimento);
				baseHospital.SaveChanges();
				return "Procedimento deletado";
			});

			//deletar Internamento
			app.MapPost("/deletarInternamento/{id}", (BaseHospital baseHospital, int id) =>
			{
				var Internamento = baseHospital.Internamentos.Find(id);
				baseHospital.Remove(Internamento);
				baseHospital.SaveChanges();
				var Paciente = baseHospital.Pacientes.Find(id);
				baseHospital.Remove(Paciente);
				baseHospital.SaveChanges();
				var Procedimento = baseHospital.Procedimentos.Find(id);
				baseHospital.Remove(Procedimento);
				baseHospital.SaveChanges();
				return "Internamento deletado";
			});

			app.Run();
		}
	}
}