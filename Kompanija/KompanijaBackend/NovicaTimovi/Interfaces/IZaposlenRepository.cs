using NovicaTimovi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NovicaTimovi.Interfaces
{
    public interface IZaposlenRepository
    {
        IEnumerable<Zaposlen> GetAll();
        Zaposlen GetById(int id);
        void Add(Zaposlen zaposlen);
        void Update(Zaposlen zaposlen);
        void Delete(Zaposlen zaposlen);
    }
}
