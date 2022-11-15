using System.ComponentModel.DataAnnotations;

namespace myAPI.Models
{
    public class Paciente
    {
		[Key]
        public int PacienteId { get; set; }
		public string? Cpf {get; set;}
		public string? Nome { get; set; }
    	public string? DataNasc { get; set; }
		public string? Sexo { get; set; }
		public string? Telefone { get; set; }
		public string? Cep { get; set; }
		public string? Logradouro { get; set; }
		public string? Numero { get; set; }
		public string? Complemento { get; set; }

    }
}