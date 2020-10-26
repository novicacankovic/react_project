using NovicaTimovi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NovicaTimovi.Interfaces
{
    public interface ITimRepository
    {
        IEnumerable<Tim> GetAll();
        Tim GetById(int id);
        IEnumerable<TimDTO> GetStatistics();
    }
}
