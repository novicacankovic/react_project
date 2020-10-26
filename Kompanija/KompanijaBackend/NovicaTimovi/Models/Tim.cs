using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace NovicaTimovi.Models
{
    public class Tim
    {
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string Ime { get; set; }

        [Range(2001,2019)]
        public int GodinaOsnivanja { get; set; }

        [Required]
        [Range(0,49)]
        public int BrojKompletiranihProjekata { get; set; }
    }
}