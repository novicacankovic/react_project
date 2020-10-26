using NovicaTimovi.Interfaces;
using NovicaTimovi.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Web;

namespace NovicaTimovi.Repository
{
    public class ZaposlenRepository : IDisposable, IZaposlenRepository
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

        public IEnumerable<Zaposlen> GetAll()
        {
            return db.Zaposlen.Include(a => a.Tim);
        }

        public Zaposlen GetById(int id)
        {
            return db.Zaposlen.FirstOrDefault(z => z.Id == id);
        }

        public void Add(Zaposlen zaposlen)
        {
            db.Zaposlen.Add(zaposlen);
            db.SaveChanges();
        }

        public void Update(Zaposlen zaposlen)
        {
            db.Entry(zaposlen).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }
        }

        public void Delete(Zaposlen zaposlen)
        {
            db.Zaposlen.Remove(zaposlen);
            db.SaveChanges();
        }
    }
}