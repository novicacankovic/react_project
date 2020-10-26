namespace NovicaTimovi.Migrations
{
    using NovicaTimovi.Models;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<NovicaTimovi.Models.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(NovicaTimovi.Models.ApplicationDbContext context)
        {
            context.Tim.AddOrUpdate(x => x.Id,
                    new Tim() { Id = 1, Ime = "Razvoj", GodinaOsnivanja = 2005, BrojKompletiranihProjekata = 33 },
                    new Tim() { Id = 2, Ime = "Testiranje", GodinaOsnivanja = 2006, BrojKompletiranihProjekata = 24 },
                    new Tim() { Id = 3, Ime = "Upravljanje", GodinaOsnivanja = 2004, BrojKompletiranihProjekata = 35 }

                     );

            context.Zaposlen.AddOrUpdate(x => x.Id,
                new Zaposlen() { Id = 1, ImeIPrezime = "Pera Peric", Rola = "Tester", GodinaRodjenja = 1980, GodinaZaposlenja = 2008, Plata = 1500, TimId = 2 },
                new Zaposlen() { Id = 2, ImeIPrezime = "Mika Mikic", Rola = "Developer", GodinaRodjenja = 1985, GodinaZaposlenja = 2005, Plata = 2000, TimId = 1 },
                new Zaposlen() { Id = 3, ImeIPrezime = "Iva Ivic", Rola = "Menadzer", GodinaRodjenja = 1981, GodinaZaposlenja = 2016, Plata = 2500, TimId = 3 },
                new Zaposlen() { Id = 4, ImeIPrezime = "Zika Zikic", Rola = "Developer", GodinaRodjenja = 1990, GodinaZaposlenja = 2005, Plata = 1600, TimId = 1 }

            );
        }
    }
}
