using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace NovicaTimovi.Models
{
    public class Zaposlen
    {
        public int Id { get; set; }

        [Required]
        [StringLength(60)]
        public string ImeIPrezime { get; set; }

        [Required]
        [StringLength(29)]
        public string Rola { get; set; }

        [Range(1960,1994)]
        public int GodinaRodjenja { get; set; }

        [Range(2001,2019)]
        public int GodinaZaposlenja { get; set; }

        [Required]
        [Range(300.01,9999.99)]
        public decimal Plata { get; set; }


        public int TimId { get; set; }
        public virtual Tim Tim { get; set; }
    }
}