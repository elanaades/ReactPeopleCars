using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactPeopleCars.Data;

namespace ReactPeopleCars.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {

        private string _connectionString;

        public PeopleController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpGet]
        [Route("getpeople")]
        public List<Person> GetPeople()
        {
            var repo = new PeopleCarRepository(_connectionString);
            return repo.GetPeople();
        }

        [HttpPost]
        [Route("addperson")]
        public void AddPerson(Person person)
        {
            var repo = new PeopleCarRepository(_connectionString);
            repo.AddPerson(person);
        }

        [HttpPost]
        [Route("deletecars/{id}")]
        public void DeleteCars(int id)
        {
            var repo = new PeopleCarRepository(_connectionString);
            repo.DeleteCars(id);
        }

        [HttpPost]
        [Route("addcar")]
        public void AddCar(Car car)
        {
            var repo = new PeopleCarRepository(_connectionString);
            repo.AddCar(car);
        }

        [HttpGet]
        [Route("getcarsbyid/{id}")]
        public List<Car> GetCars(int id)
        {
            var repo = new PeopleCarRepository(_connectionString);
            return repo.GetCars(id);
        }

        [HttpGet]
        [Route("getpersonbyid/{id}")]
        public Person GetPerson(int id)
        {
            var repo = new PeopleCarRepository(_connectionString);
            return repo.GetPerson(id);
        }
    }
}
