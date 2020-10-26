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
    public class TimoviController : ApiController
    {
        ITimRepository _repository { get; set; }

        public TimoviController(ITimRepository repository)
        {
            _repository = repository;
        }

        public IEnumerable<Tim> Get()
        {
            return _repository.GetAll();
        }

        public IHttpActionResult Get(int id)
        {
            var tim = _repository.GetById(id);
            if (tim == null)
            {
                return NotFound();
            }

            return Ok(tim);
        }
        [HttpGet]
        [Route("api/statistika")]
        public IEnumerable<TimDTO> GetStatistics()
        {
            var timovi = _repository.GetStatistics();
            return timovi;
        }

        [HttpGet]
        [Route("api/efikasnost")]
        public IEnumerable<Tim> Efikasnost()
        {
            var tim = new List<Tim>();
            tim.Add(_repository.GetAll().OrderByDescending(t => t.BrojKompletiranihProjekata).FirstOrDefault());
            tim.Add(_repository.GetAll().OrderByDescending(t => t.BrojKompletiranihProjekata).FirstOrDefault());

            return tim;
        }



    }
}

        


