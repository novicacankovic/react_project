using NovicaTimovi.Interfaces;
using NovicaTimovi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NovicaTimovi.Repository
{
    public class TimRepository : IDisposable, ITimRepository
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        protected void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (db != null)
                {
                    db.Dispose();
                    db = null;
                }
            }
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        public IEnumerable<Tim> GetAll()
        {
            return db.Tim;
        }

        public Tim GetById(int id)
        {
            return db.Tim.FirstOrDefault(d => d.Id == id);
        }


        public IEnumerable<TimDTO> GetStatistics()
        {
            var timovi = (from tim in db.Tim
                          join zaposleni in db.Zaposlen on tim.Id equals zaposleni.TimId
                          group new { tim, zaposleni } by new { tim.Id, tim.Ime } into g
                          select new TimDTO
                          {
                              IdTima = g.Key.Id,
                              NazivTima = g.Key.Ime,
                              BrojZaposlenih = g.Sum(x => x.tim.Id)
                          }).ToList();

              List<TimDTO> listaTimova = new List<TimDTO>();
              listaTimova.Add(timovi.OrderBy(x => x.BrojZaposlenih).LastOrDefault());
              listaTimova.Add(timovi.OrderBy(x => x.BrojZaposlenih).FirstOrDefault());

              return listaTimova;
        }

        
    }
}