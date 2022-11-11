using System.ComponentModel.DataAnnotations;

namespace myAPI.Models
{
    public class Procedimento
    {
		[Key]
        public int ProcedimentoId { get; set; }
		public string? Medico { get; set; }
		public string? MedicoCBO { get; set; }
		public string? Codigo_Procedimento { get; set; }
		public string? DescProcedimento { get; set; }
		public int QtdProcedimento { get; set; }
		
    }
}