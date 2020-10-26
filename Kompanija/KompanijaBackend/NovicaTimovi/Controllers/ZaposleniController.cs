using NovicaTimovi.Interfaces;
using NovicaTimovi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace NovicaTimovi.Controllers
{
    public class ZaposleniController : ApiController
    {
        IZaposlenRepository _repository { get; set; }

        public ZaposleniController(IZaposlenRepository repository)
        {
            _repository = repository;
        }

        public IEnumerable<Zaposlen> Get()
        {
            return _repository.GetAll().OrderByDescending(z => z.Plata);
        }

        public IHttpActionResult Get(int id)
        {
            var zaposlen = _repository.GetById(id);
            if (zaposlen == null)
            {
                return NotFound();
            }
            return Ok(zaposlen);
        }

        [HttpGet]
        public IEnumerable<Zaposlen> Pretraga(int pridruzeni)
        {
            return _repository.GetAll().Where(z => z.GodinaZaposlenja > pridruzeni).OrderBy(a => a.GodinaZaposlenja);
        }

        public IHttpActionResult Post(Zaposlen zaposlen)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _repository.Add(zaposlen);
            zaposlen = _repository.GetById(zaposlen.Id);
            return CreatedAtRoute("DefaultApi", new { id = zaposlen.Id }, zaposlen);
        }


        public IHttpActionResult Put(int id, Zaposlen zaposlen)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != zaposlen.Id)
            {
                return BadRequest();
            }

            try
            {
                _repository.Update(zaposlen);
                zaposlen = _repository.GetById(zaposlen.Id);
            }
            catch
            {
                throw;
            }

            return Ok(zaposlen);
        }


        public IHttpActionResult Delete(int id)
        {
            var zaposlen = _repository.GetById(id);
            if (zaposlen == null)
            {
                return NotFound();
            }
            _repository.Delete(zaposlen);
            return Ok();
        }

        [HttpPost]
        [Route("api/pretraga")]
        public IEnumerable<Zaposlen> PretragaZaposlenog([FromBody] PretragaZaposlenih pretragaZaposlenih)
        {
            return _repository.GetAll().Where(z => z.GodinaRodjenja > pretragaZaposlenih.Mini && z.GodinaRodjenja < pretragaZaposlenih.Maxi).OrderBy(a => a.GodinaRodjenja);
        }


    }
}
